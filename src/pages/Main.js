import React, { useState } from 'react';
import axios from 'axios';
import produce from 'immer';
import { connect } from 'react-redux';
import { UploadActions } from '../redux/actionCreators';

const Main = (props) => {
  console.log(props);
  const [file, setFile] = useState([]);
  const handleClick = () => {
    props.history.push('/upload');
  };

  // upload-server 를 이용한 파일 업로드
  const handleInput = (e) => {
    for (let item of e.target.files) {
      let form = new FormData();
      form.append('file', item.name);
      form.append('data', item);

      axios({
        method: 'post',
        url: 'http://10.130.221.168:8090',
        data: form,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(() => {
          // immer produce 적용
          setFile(
            produce((draft) => {
              const isOverlap = draft.find((el) => item.name === el.name);
              isOverlap
                ? draft.splice(
                    draft.findIndex((el) => item.name === el.name),
                    1
                  )
                : draft.push(item);
              isOverlap && draft.push(item);
            })
          );
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
      {file.map((item, i) => (
        <div style={{ margin: '5px auto', color: 'red' }} key={i}>
          {`${i + 1}. ${item.name}`}
        </div>
      ))}
      <button onClick={handleClick}>뒤로가기</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.upload);
  return state;
};

export default connect(mapStateToProps, UploadActions)(Main);
