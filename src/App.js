import React, { useState } from 'react';
import styled from 'styled-components';

const defaultState = {
  count: 0,
  stop: false,
  limit: 10,
};

const App = () => {
  // ============ state =============
  const [counter, setCounter] = useState(defaultState);
  const [faster, setFaster] = useState(defaultState);

  // ============ handler =============

  const doCount = (event) => {
    event.target.name === 'counter'
      ? (() => {
          setCounter({ ...counter, count: counter.count });
          counterWorker.postMessage(counter);
        })()
      : (() => {
          setFaster({ ...faster, count: faster.count });
          fasterWorker.postMessage(faster);
        })();
  };

  const doReset = (event) => {
    event.target.name === 'counter'
      ? setCounter(defaultState)
      : setFaster(defaultState);
  };

  // ============ workers =============
  const counterWorker = new Worker('workers/counter.js');
  const fasterWorker = new Worker('workers/faster.js');

  // counterWorker의 메시지를 수신한다.
  counterWorker.onmessage = function (event) {
    const { count, stop, limit } = event.data;
    setCounter({ count, stop, limit });
  };

  // fasterWorker의 메시지를 수신한다.
  fasterWorker.onmessage = function (event) {
    const { count, stop, limit } = event.data;
    setFaster({ count, stop, limit });
  };

  return (
    <Container>
      <Tittle>Worker Test</Tittle>
      <Input>30 카운트</Input>
      <Box left>
        <button name="counter" onClick={doCount}>
          COUNTER
        </button>
        <Content border>
          {(counter.count > 0 && counter.count) || '1초 count'}
        </Content>
        {counter.stop && (
          <Content>
            <button name="counter" onClick={doReset}>
              reset
            </button>
          </Content>
        )}
      </Box>
      <Box right>
        <button name="faster" onClick={doCount}>
          FASTER
        </button>
        <Content border>
          {(faster.count > 0 && faster.count) || '0.5초 count'}
        </Content>
        {faster.stop && (
          <Content>
            <button name="faster" onClick={doReset}>
              reset
            </button>
          </Content>
        )}
      </Box>
    </Container>
  );
};

export default App;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tittle = styled.div`
  position: absolute;
  top: 100px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  position: absolute;
  top: 200px;
  ${(p) => (p.left ? 'left: 30%' : 'right: 30%')}
`;

const Input = styled.div`
  position: absolute;
  top: 130px;
`;

const Content = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 2em;
  ${(p) => p.border && 'border: 1px solid'}
`;
