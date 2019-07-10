PtRegister(
  "dark-mode",
  function (w, c) {

    w.isDark = document.cookie.replace(/(?:(?:^|.*;\s*)modarkbul\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "true";
    w.darkCont = document.getElementById("modarkbul");
    w.checkBox = document.getElementById("is-dark");
    w.checkBox.style.setProperty("pointer-events", "none");

    if (w.isDark) {
      w.checkBox.checked = w.isDark;
      document.querySelector('meta[name=theme-color]').content = "#000000";
    }

    w.setCookie = function (value) {
      const date = new Date();
      date.setTime(date.getTime() + 315360000000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `modarkbul=${value};${expires};path=/${c.modarkbulDomain ? `;domain=${c.modarkbulDomain}` : ''}`;
    };
    w.setCookie(w.isDark);

    w.toggle = function () {
      w.isDark = !w.isDark;

      if (w.isDark) {
        document.documentElement.style.setProperty("background-color", "#000000");
        document.documentElement.classList.add("dark");
        document.querySelector('meta[name=theme-color]').content = "#000000";
      } else {
        document.documentElement.style.setProperty("background-color", "#eaeaea");
        document.documentElement.classList.remove("dark");
        document.querySelector('meta[name=theme-color]').content = "#eaeaea";
      }

      w.setCookie(w.isDark);
      w.checkBox.checked = w.isDark;
    };
    w.darkCont.onclick = w.toggle;

  },
);
