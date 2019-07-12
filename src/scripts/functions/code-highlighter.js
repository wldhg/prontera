PtRegister(
  "code-highlighter",
  (w, c, end) => {

    w.targets = document.querySelectorAll(".ct-body pre");
    w.targets.forEach(hljs.highlightBlock);

    end(w.targets);

  },
);
