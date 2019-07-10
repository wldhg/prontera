PtRegister(
  "code-highlight",
  function (w, c) {

    document.querySelectorAll(".content-body pre").forEach(
      function (item) {
        hljs.highlightBlock(item);
      }
    );

  },
);
