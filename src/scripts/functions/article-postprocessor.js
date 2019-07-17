PtRegister(
  "article-postprocessor",
  (w, c, end) => {

    // Time formatting
    const formatTime = () => {
      const timeTargets = document.querySelectorAll('[data-rfc-time]');
      const tiTimeTargets = document.querySelectorAll('[data-tistory-time]');
      const now = new Date();
      const nowMS = now.getTime();

      const timeReformatter = (target) => {

        const date = new Date(target.dataset.rfcTime);
        const dateMS = date.getTime();

        let detailedDateString = '';
        if (now.getFullYear() === date.getFullYear()) {
          detailedDateString += '올해 ';
        } else if (now.getFullYear() === (date.getFullYear() + 1)) {
          detailedDateString += '작년 ';
        } else {
          detailedDateString += `${date.getFullYear()}년 `;
        }
        detailedDateString += `${date.getMonth() + 1}월 ${date.getDate()}일`

        target.title = `${detailedDateString} ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초 (대한민국 표준시)`;

        let timeString = '';
        if (nowMS - dateMS >= 86400000) {
          timeString = detailedDateString;
        } else {
          const hours = Math.floor((nowMS - dateMS) / 3600000);
          const minutes = Math.floor((nowMS - dateMS - 3600000 * hours) / 60000);

          if (hours > 0) {
            timeString += `${hours}시간 `;
          }
          timeString += `${minutes}분 전`;
        }

        target.textContent = timeString;

      };

      timeTargets.forEach(timeReformatter);
      tiTimeTargets.forEach((tiTimeTarget) => {
        tiTimeTarget.dataset.rfcTime = tiTimeTarget.dataset.tistoryTime.replace(' ', 'T').replace(/\./g, '-');

        timeReformatter(tiTimeTarget);
      });
    };
    formatTime();
    window.setInterval(formatTime, 60000);

    // Comment counting
    const commentTargets = document.querySelectorAll('.comments-count[data-count]');
    commentTargets.forEach((target) => {

      const count = Number.parseInt(target.dataset.count);
      if (!Number.isNaN(count) && count === 0) {
        target.querySelector('.count-text').textContent = '댓글 없음';
      }

    });

    // Thumbnail expanding
    const tnTargets = document.querySelectorAll('.ct-thumbnail');
    tnTargets.forEach((target) => {
      target.onclick = () => {
        window.open(target.dataset.link, '_self')
      };
      target.style.setProperty('height', `calc(${target.parentNode.offsetHeight}px - 4rem)`);
      target.style.setProperty('cursor', 'pointer');
    });

    end(timeTargets, commentTargets);

  },
)
