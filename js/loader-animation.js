PtRegister(
  "loader-animation",
  function (w) {

    w.identity = document.querySelector("header.global a.identity img");

    if (w.identity) {
        w.identity.style.setProperty("animation", "none");

        window.addEventListener("beforeunload", function () {
            w.identity.style.setProperty("animation", "opa-wave 2s infinite");
        });
    }

  },
);
