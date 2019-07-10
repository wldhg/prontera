PtRegister(
  "secret-comment",
  (w, c, end) => {

    w.checkBox = document.getElementById("isSecret");
    w.label = document.querySelector(".wc-personal label");

    w.toggle = w.checkBox ? function (cb) {
      if (cb.checked) {
        w.label.classList.add("locked");
      } else {
        w.label.classList.remove("locked");
      }
    } : function () { };

    w.toggle(w.checkBox);

    end();

  },
);
