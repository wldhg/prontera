window.onload = function () {
  var agent = navigator.userAgent.toLowerCase();
  if (
    (navigator.appName == "Netscape" && agent.indexOf("trident") != -1)
    || agent.indexOf("msie") != -1
  ) {
    // If IE, show not-supported alert
    alert("Internet Explorer에서는 볼 수 없습니다.");
    history.back();
  } else {
    // Make object controller
    window.PtStore = {};

    // Set flag
    window.PtLaunched = true;

    // Launch functions
    let firstQueue = [];
    for (const i in PtQueue) {
      window.PtStore[i] = {};
      firstQueue.push(
        new Promise((resolve) => {
          try {
            PtQueue[i](window.PtStore[i], window.PtConfig, resolve);
          } catch (e) {
            console.debug(e);
          }
        })
      );
    }

    // Launch lazy functions
    Promise.all(firstQueue).then(() => {
      for (const q in PtLateQueue) {
        window.PtStore[q] = {};
        try {
          PtLateQueue[q](window.PtStore[q], window.PtConfig, () => { });
        } catch (e) {
          console.debug(e);
        }
      }
    });
  }
};
