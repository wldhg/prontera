// old script
PtRegister(
  "secret-comment",
  (w, c, end) => {

    w.checkBox = document.getElementById("isSecret");

    w.toggle = w.checkBox ? function (cb) {
      const label = document.querySelector(".ct-reply-author label");
      if (cb.checked) {
        label.classList.add("locked");
      } else {
        label.classList.remove("locked");
      }
    } : function () { };

    w.toggle(w.checkBox);

    end();

  },
);
