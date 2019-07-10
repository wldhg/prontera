PtRegister(
  "dark-mode",
  (w, c, end) => {

    w.isDark = document.cookie.replace(/(?:(?:^|.*;\s*)modarkbul\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "true";
    w.themeColor = document.querySelector('meta[name=theme-color]');
    w.mdbLabel = document.querySelector('#modarkbul label');
    w.checkBox = document.getElementById("is-dark");
    w.checkBox.style.setProperty("pointer-events", "none");
    w.darkCont = document.getElementById("modarkbul");
    w.darkCont.classList.add('no-transparency');

    if (w.isDark) {
      w.checkBox.checked = w.isDark;
      w.themeColor.content = "#000000";
      w.mdbLabel.classList.add('dark');
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
        w.themeColor.content = "#000000";
        w.mdbLabel.classList.add('dark');
      } else {
        document.documentElement.style.setProperty("background-color", "#eaeaea");
        document.documentElement.classList.remove("dark");
        w.themeColor.content = "#eaeaea";
        w.mdbLabel.classList.remove('dark');
      }

      w.setCookie(w.isDark);
      w.checkBox.checked = w.isDark;
    };
    w.darkCont.onclick = w.toggle;

    end();

  },
);
