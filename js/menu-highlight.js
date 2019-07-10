PtRegister(
  "menu-highlight",
  (w, c, end) => {

    const currentMenu = document.querySelector("#menu a[href=\"" + location.pathname + "\"]");
    if (currentMenu) {
      currentMenu.classList.add("current");
    }

    end();

  },
);
