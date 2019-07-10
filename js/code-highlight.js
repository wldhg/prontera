PtRegister(
  "code-highlight",
  (w, c, end) => {

    document.querySelectorAll(".content-body pre").forEach(
      function (item) {
        hljs.highlightBlock(item);
      }
    );

    end();

  },
);
