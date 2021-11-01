let interval = undefined;
let timeLimit = undefined;
let cb = undefined;

const clear = () => {
  clearTimeout(timeLimit);
  clearInterval(interval);
  cb('');
};

const activeMessage = (message, callback, frameRate = 200, timeout = 8000) => {
  interval || timeLimit && clear();

  const dotMatrix = [
    '.',
    '..',
    '...',
    ' ...',
    '...',
    '..',
    '.',
    ''
  ];

  let frameIndex = dotMatrix.length;
  cb = callback;

  interval && clear();

  timeLimit = setTimeout(clear, timeout);

  interval = setInterval(() => {
    if (--frameIndex < 0) {
      frameIndex = dotMatrix.length - 1;
    }
    // console.log(`${message}${dotMatrix[frame]}`, `frame: ${frame}`);
    callback(message + dotMatrix[frameIndex]);
  }, frameRate);

  callback(message + dotMatrix[frameIndex--]);

  return () => { clearInterval(interval) };
};

// activeMessage('Hello', console.log);

export default activeMessage;
