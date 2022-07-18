function promisify(fn, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        if (err) {
          reject(err);
        } else {
          // If manyArgs is true, then results is an array of results.
          resolve(manyArgs ? results : results[0]);
        }
      }
      // push the callback to the end of the args
      args.push(callback);
      fn.apply(this, args);
    });
  };
}

function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.body.append(script);
}

// 用法：
// loadScript('path/script.js', (err, script) => {...})

const f = promisify(loadScript, true);
f("./test.js")
  .then((script) => {
    console.log(script);
  })
  .catch((err) => {
    console.log(err);
  });
