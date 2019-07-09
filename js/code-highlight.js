PtRegister(
  "code-highlight",
  function (w) {

    document.querySelectorAll(".content-body pre").forEach(
      function (item) {
        hljs.highlightBlock(item);
      }
    );

  },
);
