import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { UploadActions } from '../redux/actionCreators';

const Main = (props) => {
  console.log(props);
  const { actions } = props;
  const { upload: fileList } = props;
  const handleClick = () => {
    props.history.push('/upload');
  };

  /**
   * upload-server 를 이용한 파일 업로드
   * files 라는 폴더가 루트 디렉토리에 업로드 된다.
   * @param {event} e
   */
  const handleInput = (e) => {
    // const count = e.target.files.length;
    // actions.fileCount(count);

    //입력된 파일 갯수 만큼 for-loop
    for (let item of e.target.files) {
      let form = new FormData();
      form.append('file', item.name);
      form.append('data', item);
      console.log(item.name);
      axios({
        method: 'post',
        url: 'http://10.130.221.168:8090',
        data: form,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          const isUpLoading = progressEvent.lengthComputable;
          const currentIndex = fileList.findIndex((file) => {
            console.log(file);
            return file.filename === item.name;
          });
          actions.showProgress({ currentIndex, percentCompleted });
        },
      })
        .then(() => {
          actions.addFile({
            filename: item.name,
            // progress: percentCompleted,
            // isUpLoading: isUpLoading,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div>여기는 메인 페이지야</div>
      <div style={{ margin: '20px auto' }}>
        <form encType="multipart/form-data">
          <input
            multiple
            style={{ width: '400px' }}
            type="file"
            onChange={handleInput}
          />
        </form>
      </div>
      <div>파일 리스트</div>
      {fileList.map((file, i) => (
        <div style={{ margin: '5px auto', color: 'red' }} key={i}>
          {`${i + 1}. ${file.filename}`}
        </div>
      ))}
      <button onClick={handleClick}>뒤로가기</button>
      {fileList.map((file, i) => (
        <div key={i}>{file.progress}</div>
      ))}
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return state;
// };
const mapDispatchToProps = () => {
  return { actions: UploadActions };
};

export default connect((state) => state, mapDispatchToProps)(Main);
