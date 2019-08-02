PtRegister(
  "anchor-blur",
  (w, c, end) => {

    const anchors = Array.from(document.querySelectorAll('a[target="_blank"]'));
    anchors.forEach((anchor) => {
      if (!anchor.onclick) {
        anchor.onclick = () => {
          document.activeElement.blur();
        }
      }
    });

    end(anchors);

  },
  true,
);
