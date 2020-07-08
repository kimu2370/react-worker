import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = (props) => {
  const [file, setFile] = useState([]);
  console.log(file);
  const handleClick = () => {
    props.history.push('/upload');
  };

  const handleInput = (e) => {
    // console.log(e.target.files);
    const { name, type } = e.target.files[0];
    let form = new FormData();
    form.append('file', name);
    form.append('data', type);

    axios({
      method: 'post',
      url: 'http://10.130.221.168:8090',
      data: form,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => {
        setFile(file.concat(e.target.files[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>여기는 메인 페이지야</div>
      <div style={{ margin: '20px auto' }}>
        <input style={{ width: '400px' }} type="file" onChange={handleInput} />
      </div>
      {file.map((item, i) => (
        <div style={{ margin: '5px auto', color: 'red' }} key={i}>
          {item.name}
        </div>
      ))}
      <button onClick={handleClick}>뒤로가기</button>
    </div>
  );
};

export default Main;
