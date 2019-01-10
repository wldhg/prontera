var Prontera = Prontera || {};
(function (fn, wn) {
    if (window.onload && window.onload.launched) {
        window.Pt[wn] = {}; try { fn(window.Pt[wn]); } catch (e) { console.debug(e); }
    } else Prontera[wn] = fn;
})(function (w) {

    w.isDark = document.cookie.replace(/(?:(?:^|.*;\s*)ptDark\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "true";
    w.darkCont = document.getElementById("dark-controller");
    w.checkBox = document.getElementById("isDark");
    w.checkBox.style.setProperty("pointer-events", "none");

    if (w.isDark) {
        w.checkBox.checked = w.isDark;
    }

    w.setCookie = function (value) {
        var date = new Date();
        date.setTime(date.getTime() + 315360000000);
        var expires = "expires=" + date.toUTCString();
        document.cookie = "ptDark=" + value + ";" + expires + ";path=/";
    };
    w.setCookie(w.isDark);

    w.toggle = function () {
        w.isDark = !w.isDark;

        if (w.isDark) {
            document.documentElement.style.setProperty("background-color", "#222");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.style.setProperty("background-color", "#fff");
            document.documentElement.classList.remove("dark");
        }

        w.setCookie(w.isDark);
        w.checkBox.checked = w.isDark;
    };
    w.darkCont.onclick = w.toggle;

}, "dark-mode");
