PtRegister(
  "code-highlighter",
  (w, c, end) => {

    const hljsPromises = [];
    w.hlTargets = document.querySelectorAll(".ct-body pre code");
    w.hlTargets.forEach((target) => {
      hljsPromises.push(new Promise((resolve) => {
        try {
          hljs.highlightBlock(target);
        } finally {
          resolve();
        }
      }));
    });
    w.hljsPromise = Promise.all(hljsPromises).then(() => {
      w.linkTargets = document.querySelectorAll('.ct-body .hljs .hljs-link');
      w.linkTargets.forEach((link) => {
        link.onclick = function () {
          window.open(link.textContent, '_blank');
        };
        link.onclick.isLinkOpener = true;
        link.style.setProperty('cursor', 'alias');
        link.title = '눌러서 링크 열어보기';
      });
    });

    end(w.hlTargets);

  },
);
