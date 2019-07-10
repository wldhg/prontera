PtRegister(
  "date-formatter",
  (w, c, end) => {

    const targets = document.querySelectorAll('[data-rfc-time]');
    const now = new Date();
    const nowMS = now.getTime();
    targets.forEach((target) => {

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
        const hours = Math.floor((nowMS - momentMS) / 3600000);
        const minutes = Math.floor((nowMS - momentMS - 3600000 * hours) / 600000);

        if (hours > 0) {
          timeString += `${hours}시간 `;
        }
        timeString += `${minutes}분 전`;
      }

      target.textContent = timeString;

    });

    end();

  },
)
