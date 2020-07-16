/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */

// add count
self.onmessage = function (event) {
  let message = {};
  let intervalID = null;
  message = event.data;

  intervalID = setInterval(() => {
    message.count = message.count + 1;
    self.postMessage(message);
    if (message.count >= 30) {
      clearInterval(intervalID);
      message.stop = true;
      self.postMessage(message);
    }
  }, 500);
};
