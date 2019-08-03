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
      w.themeColor.content = "#201f1e";
      w.mdbLabel.classList.add('dark');
    }

    w.setCookie = function (isDark) {
      const date = new Date();
      if (
        (isDark && window.matchMedia("(prefers-color-scheme: dark)").matches)
        || (!isDark && window.matchMedia("(prefers-color-scheme: light)").matches)
      ) {
        date.setTime(0);
      } else {
        date.setTime(date.getTime() + 315360000000);
      }
      document.cookie = `modarkbul=${isDark ? 'dark' : 'light'};expires=${date.toUTCString()};path=/${c.modarkbulDomain ? `;domain=${c.modarkbulDomain}` : ''}`;
    };

    w.toggleRunners = [];
    w.toggle = function () {
      w.isDark = !w.isDark;

      if (w.isDark) {
        document.documentElement.style.setProperty("background-color", "#000000");
        document.documentElement.classList.add("dark");
        w.themeColor.content = "#201f1e";
        w.mdbLabel.classList.add('dark');
      } else {
        document.documentElement.style.setProperty("background-color", "#faf9f8");
        document.documentElement.classList.remove("dark");
        w.themeColor.content = "#ffffff";
        w.mdbLabel.classList.remove('dark');
      }

      w.setCookie(w.isDark);
      w.checkBox.checked = w.isDark;
      w.toggleRunners.forEach((fn) => {
        try {
          fn(w.isDark);
        } catch (e) {
          console.debug(e);
        }
      });

      document.activeElement.blur();
    };
    w.darkCont.onclick = w.toggle;

    end(w.isDark);

  },
);
