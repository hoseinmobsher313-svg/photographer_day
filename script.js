const flashToggle = document.getElementById("flashToggle");
const cameraBg = document.getElementById("cameraBg");

let isOn = false;

function updateState() {
    if (isOn) {
        document.body.classList.add("flash-on");
        cameraBg.classList.add("visible");
        flashToggle.classList.add("on");
        flashToggle.textContent = "🔔 چراغ‌قوه روشن";
    } else {
        document.body.classList.remove("flash-on");
        cameraBg.classList.remove("visible");
        flashToggle.classList.remove("on");
        flashToggle.textContent = "🔔 چراغ‌قوه";
    }
}

updateState();

flashToggle.addEventListener("click", () => {
    isOn = !isOn;
    updateState();
});
