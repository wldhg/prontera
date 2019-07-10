PtRegister(
  "contents-builder",
  (w, c, end) => {

    // Originally Korean is not proper for DOM ID (by HTML spec)
    // But for Korean URL readability, I permitted them.
    // Also, only alphabets can be located in ID as first character,
    // But for readability, I permitted them.

    w.whitespaceRegEx = /[\s]/gi;
    w.nonIDCharRegEx = /[^A-Za-z0-9\-\_\:\.가-힣]/gi;
    //w.firstNonAlphabetRegEx = /^[^A-Za-z]+/gi;

    w.postBody = document.querySelector(".post-content.content-body");

    try {
      if (w.postBody) {

        var idPool = [];
        w.location = location.hash ? location.href.replace(location.hash, "") : location.href;

        w.postBody.querySelectorAll("h1, h2").forEach(function (h) {

          // Add ID links
          var id = h.textContent.replace(w.whitespaceRegEx, "-").replace(w.nonIDCharRegEx, "_");//.replace(w.firstNonAlphabetRegEx, "");

          while (idPool.includes(id)) id += "_";
          idPool.push(id);

          var anchor = document.createElement("a");
          anchor.innerText = "#";
          anchor.className = "content-anchor";
          anchor.href = w.location + "#" + id;

          h.id = id;
          h.insertBefore(anchor, h.firstChild);

          // Add TOC

        });

      }
    } catch (e) { console.error(e); } finally {
      var style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML = ".content-anchor { opacity: 1 !important; }"
      document.body.appendChild(style);

      if (window.location.hash) {
        var pageOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        var selectedDOM = document.querySelector(decodeURIComponent(window.location.hash));

        if (selectedDOM) {
          window.scrollTo(0, pageOffset + selectedDOM.getBoundingClientRect().top - 100);
        }
      }

      end();
    }

  },
);
