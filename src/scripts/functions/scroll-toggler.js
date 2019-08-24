PtRegister(
  "scroll-toggler",
  (w, c, end) => {

    w.scrollDeltaThreshold = 20;
    w.scrollDeltaStandard = 0;
    w.scrollUpThreshold = 800;

    w.pageOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    w.header = document.querySelector("header.global");
    w.topScroller = document.querySelector("a#goto-top");

    let showTimeout;
    w.toggleGotoTopButton = (show) => {
      window.clearTimeout(showTimeout);
      if (show) {
        w.topScroller.classList.add("enabled");
        showTimeout = window.setTimeout(() => {
          w.topScroller.classList.add("visible");
        }, 20);
      } else {
        w.topScroller.classList.remove("visible");
        showTimeout = window.setTimeout(() => {
          w.topScroller.classList.remove("enabled");
        }, 320);
      }
    };

    w.onScroll = [];
    let wasVisible = !(w.pageOffset > w.scrollUpThreshold);
    window.onscroll = () => {
      w.pageOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      // Controlling navigation bar
      if (w.pageOffset - w.scrollDeltaStandard > w.scrollDeltaThreshold && w.pageOffset > 72) {
        w.scrollDeltaStandard = w.pageOffset;
        w.header.classList.add("hidden");
      } else if (w.scrollDeltaStandard - w.pageOffset > w.scrollDeltaThreshold) {
        w.scrollDeltaStandard = w.pageOffset;
        w.header.classList.remove("hidden");
      }

      // Controlling top-scroller
      if (w.pageOffset > w.scrollUpThreshold) {
        if (wasVisible === false) {
          w.toggleGotoTopButton(true);
        }
        wasVisible = true;
      } else {
        if (wasVisible === true) {
          w.toggleGotoTopButton(false);
        }
        wasVisible = false;
      }

      // Process other scroll events
      w.onScroll.forEach(fn => {
        if (typeof fn === 'function') {
          fn(w.pageOffset);
        }
      });
    };

    // Hash-related scripts are in "article-postprocessor".
    end();

  },
);
