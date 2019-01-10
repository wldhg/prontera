var Prontera = Prontera || {};
(function (fn, wn) {
    if (window.onload && window.onload.launched) {
        window.Pt[wn] = {}; try { fn(window.Pt[wn]); } catch (e) { console.debug(e); }
    } else Prontera[wn] = fn;
})(function (w) {

    w.scrollThreshold = 20;
    w.scrollStandard = 0;

    w.header = document.querySelector("header.global");
    w.topScroller = document.querySelector("a.goto-top");

    w.pageOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    window.onscroll = function() {
        w.pageOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Controlling navigation bar
        if (w.pageOffset > 70 && w.pageOffset - w.scrollStandard > w.scrollThreshold) {
            w.scrollStandard = w.pageOffset;
            w.header.classList.add("scroll");
        } else if (w.scrollStandard - w.pageOffset > w.scrollThreshold) {
            w.scrollStandard = w.pageOffset;
            w.header.classList.remove("scroll");
        }

        // Controlling top-scroller
        if (w.pageOffset > 800) w.topScroller.classList.add("visible");
        else w.topScroller.classList.remove("visible");
    };

    if (window.location.hash) {
        window.scrollTo(0, w.pageOffset + document.querySelector(window.location.hash).getBoundingClientRect().top - 100);
    }

}, "scroll");
