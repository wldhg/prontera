window.onload = function() {
    var agent = navigator.userAgent.toLowerCase();
    if (
        (navigator.appName == "Netscape" && agent.indexOf("trident") != -1) ||
        agent.indexOf("msie") != -1
    ) {
        // If IE, show not-supported alert
        alert("Internet Explorer는 볼 수 없는 페이지입니다.");
        history.back();
    } else if (typeof window.Prontera === "object") {
        // Make object controller
        window.Pt = {};

        // Set flag
        window.onload.launched = true;

        // Launch functions
        for (let i in Prontera) {
            window.Pt[i] = {};
            Prontera[i](window.Pt[i]);
        }
    }
};
