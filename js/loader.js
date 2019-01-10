var Prontera = Prontera || {};
(function (fn, wn) {
    if (window.onload && window.onload.launched) {
        window.Pt[wn] = {}; try { fn(window.Pt[wn]); } catch (e) { console.debug(e); }
    } else Prontera[wn] = fn;
})(function (w) {

    w.identity = document.querySelector("header.global a.identity img");

    if (w.identity) {
        w.identity.style.setProperty("animation", "none");
        
        window.addEventListener("beforeunload", function () {
            w.identity.style.setProperty("animation", "opa-wave 2s infinite");
        });
    }

}, "loader");
