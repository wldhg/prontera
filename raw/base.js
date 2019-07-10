const PtQueue = {};
const PtRegister = function (name, fn) {
  if (window.onload && window.PtLaunched) {
    window.PtStore[name] = {};
    try {
      fn(window.PtStore[name], window.PtConfig);
    } catch (e) {
      console.debug(e);
    }
  } else {
    PtQueue[name] = fn;
  }
};
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
    for (const i in PtQueue) {
      window.PtStore[i] = {};
      try {
        PtQueue[i](window.PtStore[i], window.PtConfig);
      } catch (e) {
        console.debug(e);
      }
    }
  }
};
