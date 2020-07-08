import React from 'react';

const Uploader = (props) => {
  const handleClick = () => {
    props.history.push('/');
  };

  return (
    <div>
      <div>여긴 업로드 페이지야</div>
      <button onClick={handleClick}>메인으로</button>
    </div>
  );
};

export default Uploader;
