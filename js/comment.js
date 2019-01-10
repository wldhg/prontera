var Prontera = Prontera || {};
(function (fn, wn) {
    if (window.onload && window.onload.launched) {
        window.Pt[wn] = {}; try { fn(window.Pt[wn]);} catch (e) { console.debug(e); }
    } else Prontera[wn] = fn;
})(function (w) {

    w.checkBox = document.getElementById("isSecret");
    w.label = document.querySelector(".wc-personal label");

    w.toggle = w.checkBox ? function (cb) {
        if (cb.checked) {
            w.label.classList.add("locked");
        } else {
            w.label.classList.remove("locked");
        }
    } : function () {};

    w.toggle(w.checkBox);

}, "comment");
