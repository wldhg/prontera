PtRegister(
  "menu-highlight",
  function (w) {

    try {
      document.querySelector("header.global .t_menu_page a[href=\"" + location.pathname + "\"]").classList.add("now");
    } catch (e) { console.debug(e); }

  },
);
