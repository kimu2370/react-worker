import React, { useState, useEffect } from 'react';

function App() {
  const [countTomato, setCountTomato] = useState(0);
  const [countApple, setCountApple] = useState(0);
  const appleWorker = new Worker('./workers/apple.js');
  console.log(appleWorker);
  useEffect(() => {
    // 워커가 전달한 메시지
    appleWorker.onmessage = (event) => {
      // console.log('appleworker', event);
      if (event && event.data) {
        setCountApple(event.data);
      }
    };
  }, [appleWorker]);

  function incApple() {
    // 워커에게 작업 부여
    appleWorker.postMessage({ msg: 'incApple', countApple: countApple });
  }

  return (
    <div>
      <div className="ion-padding">
        <label>
          Tomato: {countTomato} | Apple: {countApple}
        </label>

        <div className="ion-padding-top">
          <button
            onClick={() => setCountTomato(countTomato + 1)}
            color="primary"
          >
            Tomato
          </button>

          <button onClick={() => incApple()} color="secondary">
            Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
