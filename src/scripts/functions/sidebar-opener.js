PtRegister(
  "sidebar-opener",
  (w, c, end) => {

    w.toggleState = false;

    // Prepare opening function
    const opener = document.getElementById('open-sidebar');
    const aside = document.getElementById('side-bar');
    const header = document.querySelector('header.global');
    const content = document.getElementById('content');
    const main = document.querySelector('main');

    const open = () => {
      if (w.toggleState === false) {
        opener.classList.add('opened');
        aside.classList.add('visible');
        header.classList.add('force-visible');
        opener.title = '눌러서 사이드바 닫기';
        content.onclick = open;
      } else {
        opener.classList.remove('opened');
        aside.classList.remove('visible');
        header.classList.remove('force-visible');
        opener.title = '눌러서 사이드바 열기';
        content.onclick = null;
      }
      w.toggleState = !w.toggleState;

      document.activeElement.blur();

      return false;
    };

    // Bind click event on open button
    opener.onclick = open;

    // Bind swipe event on document
    const moveSpeedThreshold = 10;
    const startPointThreshold = 15;
    let moveLengthThreshold;
    let swipeStartPoint;
    let latestSwipePoint;
    let wasSatisfiedStartCondition;
    let wasOveredThreshold;
    main.addEventListener('touchstart', (event) => {
      moveLengthThreshold = document.body.offsetWidth * 0.12;

      swipeStartPoint = event.touches[0].clientX;
      latestSwipePoint = event.touches[0].clientX;

      if ((document.body.offsetWidth - swipeStartPoint) < startPointThreshold) {
        wasSatisfiedStartCondition = true;
      } else {
        wasSatisfiedStartCondition = false;
      }

      wasOveredThreshold = false;
    });

    main.addEventListener('touchmove', (event) => {
      if (Math.abs(event.touches[0].clientX - latestSwipePoint) >= moveSpeedThreshold) {
        wasOveredThreshold = true;
      }

      latestSwipePoint = event.touches[0].clientX;
    });

    main.addEventListener('touchend', () => {
      const diff = swipeStartPoint - latestSwipePoint;
      if (
        wasOveredThreshold
        && Math.abs(diff) >= moveLengthThreshold
      ) {
        if (w.toggleState && diff < 0) {
          open();
        } else if (wasSatisfiedStartCondition && !w.toggleState && diff > 0) {
          open();
        }
      }
    });

    // Prepared
    opener.style.setProperty('opacity', 1);
    opener.title = '눌러서 사이드바 열기';

    end(opener);

  },
  true,
);
