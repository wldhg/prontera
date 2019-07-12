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

    // Define launcher
    const queueExecuter = (queue) => {
      let promiseQueue = [];
      for (const i in queue) {
        window.PtStore[i] = {};
        promiseQueue.push(
          new Promise((resolve) => {
            try {
              queue[i](
                window.PtStore[i],
                window.PtConfig,
                function () { resolve([i, arguments]); },
              );
            } catch (e) {
              console.debug(e);
            }
          })
        );
      }
      return Promise.all(promiseQueue);
    };

    // Launch functions
    let firstResult, lazyResult;
    queueExecuter(window.PtQueue).then((result) => {
      firstResult = result;
      return queueExecuter(window.PtLateQueue);
    }).then((result) => {
      lazyResult = result;

      const organizeResult = (result) => {
        const organized = {};
        result.forEach((r) => {
          if (typeof r[0] === 'string') {
            if (r.length > 0) organized[r[0]] = r[1];
            else organized[r[0]] = [];
          }
        });
        return organized;
      };

      firstResult = organizeResult(firstResult);
      lazyResult = organizeResult(lazyResult);
    }).then(() => {
      const printResults = (results) => {
        for (const r in results) {
          console.groupCollapsed(r);
          if (results[r] && results[r].length) {
            Array.from(results[r]).forEach((ri) => {
              console.log(ri);
            });
          } else {
            console.log(undefined);
          }
          console.groupEnd();
        }
      };

      console.log('Prontera onload scripts are all executed successfully.');
      console.groupCollapsed('Results — Frontier');
      printResults(firstResult);
      console.groupEnd();
      console.groupCollapsed('Results — Lazy');
      printResults(lazyResult);
      console.groupEnd();
      console.log('With wldh, you can do everything.');
    });
  }
};
