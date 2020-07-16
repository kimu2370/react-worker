/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */

// console.log(self);
// console.log(window);

// add count
self.onmessage = function (event) {
  let message = {};
  let intervalID = null;
  message = event.data;
  console.log(event.data);

  intervalID = setInterval(() => {
    message.count = message.count + 1;
    self.postMessage(message);
    if (message.count >= 30) {
      clearInterval(intervalID);
      message.stop = true;
      self.postMessage(message);
    }
  }, 1000);
};

// limit 값 state로 설정해야함.
