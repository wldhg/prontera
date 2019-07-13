PtRegister(
  "code-copy-helper",
  (w, c, end) => {

    window.PtStore['code-highlighter'].hljsPromise.then(() => {
      w.helper = document.getElementById('copy-helper');
      w.timeoutID = null;
      w.timeoutTarget;
      w.makeCopiable = (e) => {
        return new Promise((resolve) => {
          e.onclick = function (event) {
            // Check is link span
            if (event.target.onclick && event.target.onclick.isLinkOpener === true) {
              return;
            }

            // Process copy
            w.helper.value = e.innerText;
            w.helper.select();

            const result = document.execCommand("copy");

            // Process notifier
            if (w.timeoutID !== null) {
              window.clearTimeout(w.timeoutID);
              if (w.timeoutTarget) {
                w.timeoutTarget.classList.remove('copied');
                if (w.timeoutTarget.classList.contains('failed')) {
                  const timeoutTarget = w.timeoutTarget;
                  window.setTimeout(() => {
                    timeoutTarget.classList.remove('failed', 'visible');
                  }, 320);
                }
              }
            }
            if (result === false) {
              e.classList.add('copied', 'failed', 'visible');
            } else {
              e.classList.add('copied', 'visible');
            }
            w.timeoutTarget = e;
            w.timeoutID = window.setTimeout(() => {
              e.classList.remove('copied');
              window.setTimeout(() => {
                e.classList.remove('failed', 'visible');
              }, 320);
            }, 2000);
          };
          e.classList.add('copiable');
          e.dataset.oldTitle = e.title;
          e.title = '눌러서 코드 복사하기';
          resolve();
        });
      };

      const codePromises = [];
      const codeElements = document.querySelectorAll('.ct-body code');
      Array.from(codeElements).forEach((e) => {
        codePromises.push(w.makeCopiable(e));
      });

      const blockPromises = [];
      const codeBlocks = document.querySelectorAll('pre');
      Promise.all(codePromises).then(() => {
        Array.from(codeBlocks).forEach((e) => {
          const codes = e.querySelectorAll('code');
          blockPromises.push(new Promise((resolve) => {
            const removePromises = [];
            Array.from(codes).forEach((code) => {
              removePromises.push(new Promise((resolve) => {
                code.onclick = null;
                code.classList.remove('copiable', 'copied');
                if (code.dataset.oldTitle) {
                  code.title = code.dataset.oldTitle;
                  delete code.dataset.oldTitle;
                } else {
                  delete code.title;
                }
                resolve();
              }));
            });
            Promise.all(removePromises).then(() => {
              return w.makeCopiable(e);
            }).then(resolve);
          }));
        });
        return Promise.all(blockPromises);
      }).then(() => {
        end(codeElements, codeBlocks);
      });
    });

  },
  true,
);
