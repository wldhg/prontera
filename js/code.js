var Prontera = Prontera || {};
(function (fn, wn) {
    if (window.onload && window.onload.launched) {
        window.Pt[wn] = {}; try { fn(window.Pt[wn]); } catch (e) { console.debug(e); }
    } else Prontera[wn] = fn;
})(function (w) {

    document.querySelectorAll(".content-body pre").forEach(
        function (item) {
            hljs.highlightBlock(item);
        }
    );

}, "code");
