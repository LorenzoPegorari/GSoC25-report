// JS script created by LorenzoPegorari


var body = document.body;

function setStyles() {
    const mode = localStorage.getItem("mode");
    if (mode === "light") {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
    } else if (mode === "dark") {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
    }
}

function changeMode() {
    const mode = localStorage.getItem("mode");
    if (mode === "light") localStorage.setItem("mode", "dark");
    else if (mode === "dark") localStorage.setItem("mode", "light");
    setStyles();
}

if (localStorage.getItem("mode") === null) {
    localStorage.setItem("mode", "light");
    setStyles();
} else {
    setStyles();
}