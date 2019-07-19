PtRegister(
  "twitter",
  (w, c, end) => {

    w.twitterContainer = document.querySelector('#side-bar #twitter .twitter-container')
    w.twitterAnchor = document.querySelector('#side-bar #twitter a.twitter-timeline');
    w.twitterScript;

    if (w.twitterAnchor) {
      if (PtStore['dark-mode'].isDark) {
        w.twitterAnchor.dataset.theme = 'dark';
      }

      w.twitterScript = document.createElement('script');
      w.twitterScript.src = 'https://platform.twitter.com/widgets.js';
      w.twitterScript.async = true;
      w.twitterScript.charset = 'utf-8';
      w.twitterContainer.appendChild(w.twitterScript);

      const twitterDetector = window.setInterval(() => {
        const twitterFrame = document.querySelector('#twitter iframe.twitter-timeline-rendered');
        if (twitterFrame) {
          window.clearInterval(twitterDetector);

          twitterFrame.contentWindow
            .document.documentElement.style.setProperty(
              'transition',
              'all .32s ease-in-out',
              'important'
            );

          PtStore['dark-mode'].toggleRunners.push((isDark) => {
            Array.from(twitterFrame.contentWindow.document.head.children)
              .forEach((node) => {
                if (node.tagName.toLowerCase() === 'link') {
                  node.href = node.href.replace(isDark ? 'light' : 'dark', isDark ? 'dark' : 'light');
                };
              })
          });

          const twitterSpinner = document.querySelector('#twitter .spinner-container');
          twitterSpinner.style.setProperty('opacity', '0');
          window.setTimeout(() => {
            twitterSpinner.style.setProperty('display', 'none');
            twitterFrame.classList.add('visible');
            window.setTimeout(() => {
              w.twitterContainer.style.setProperty('opacity', '1');
            }, 50);
          }, 300);
        }
      }, 250);
    }

    end(w.twitterScript);

  },
  true,
);
