PtRegister(
  "article-postprocessor",
  (w, c, end) => {

    // Time formatting
    const timeTargets = document.querySelectorAll('[data-rfc-time]');
    const now = new Date();
    const nowMS = now.getTime();
    timeTargets.forEach((target) => {

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
        const minutes = Math.floor((nowMS - dateMS - 3600000 * hours) / 600000);

        if (hours > 0) {
          timeString += `${hours}시간 `;
        }
        timeString += `${minutes}분 전`;
      }

      target.textContent = timeString;

    });

    // Comment counting
    const commentTargets = document.querySelectorAll('.comments-count[data-count]');
    commentTargets.forEach((target) => {

      const count = Number.parseInt(target.dataset.count);
      if (!Number.isNaN(count) && count === 0) {
        target.querySelector('.count-text').textContent = '댓글 없음';
      }

    })

    end(timeTargets, commentTargets);

  },
)
