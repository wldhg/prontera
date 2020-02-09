PtRegister(
  "code-copy-helper",
  (w, c, end) => {

    window.PtStore['code-highlighter'].hljsPromise.then(() => {
      w.timeoutID = null;
      w.timeoutTarget;
      w.makeCopiable = (e) => {
        const localNotify = (result) => {
          if (result !== true) {
            e.classList.add('copied', result, 'visible');
          } else {
            e.classList.add('copied', 'visible');
          }
          w.timeoutTarget = e;
          w.timeoutID = window.setTimeout(() => {
            e.classList.remove('copied');
            window.setTimeout(() => {
              e.classList.remove('copyerr', 'visible', 'noperm', 'permerr');
            }, 320);
          }, 2000);
        };
        return new Promise((resolve) => {
          e.onclick = function (event) {
            // Check is link span
            if (event.target.onclick && event.target.onclick.isLinkOpener === true) {
              return;
            }

            // Process copy
            navigator.permissions.query({
              name: 'clipboard-write'
            }).then((result) => {
              // Process previous notifier
              if (w.timeoutID !== null) {
                window.clearTimeout(w.timeoutID);
                if (w.timeoutTarget) {
                  w.timeoutTarget.classList.remove('copied');
                  if (
                    w.timeoutTarget.classList.contains('copyerr')
                    || w.timeoutTarget.classList.contains('noperm')
                    || w.timeoutTarget.classList.contains('permerr')
                  ) {
                    const timeoutTarget = w.timeoutTarget;
                    window.setTimeout(() => {
                      timeoutTarget.classList.remove('copyerr', 'visible', 'noperm', 'permerr');
                    }, 320);
                  }
                }
              }

              // Copy
              if (result.state === 'granted' || result.state === 'prompt') {
                navigator.clipboard.writeText(e.innerText).then(() => {
                  localNotify(true);
                }).catch((e) => {
                  // Write failed
                  localNotify('copyerr');
                });
              } else {
                // Failed to get permission
                localNotify('noperm');
              }
            }).catch((e) => {
              localNotify('permerr');
            });
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
