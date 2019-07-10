PtRegister(
  "menu-highlight",
  function (w, c) {

    const currentMenu = document.querySelector("#menu a[href=\"" + location.pathname + "\"]");
    if (currentMenu) {
      currentMenu.classList.add("current");
    }

  },
);
