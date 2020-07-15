/* eslint-disable no-restricted-globals */
self.onmessage = async (event) => {
  // console.log('appWorker event', event);
  if (event && event.data && event.data.msg === 'incremnet apple of count') {
    const newCounter = incApple(event.data.countApple);
    // 메인 스레드에게 값 전달
    self.postMessage(newCounter);
  }
};

function incApple(countApple) {
  const start = Date.now();
  while (Date.now() < start + 3000) {}
  return countApple + 1;
}
