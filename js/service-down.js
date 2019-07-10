PtRegister(
  "service-down",
  (w, c, end) => {

    if (true) {
      alert('블로그 점검 중입니다. 7월 11일 중 완료 예정.');
    }

    end();

  },
);
