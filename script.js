const flashToggle = document.getElementById("flashToggle");
const cameraBox = document.getElementById("cameraBox");

let isOn = false;

flashToggle.addEventListener("click", () => {
    isOn = !isOn;

    if (isOn) {
        document.body.classList.add("flash-on");
        cameraBox.classList.add("visible");
        flashToggle.textContent = "🔦 خاموش کردن چراغ‌قوه";
    } else {
        document.body.classList.remove("flash-on");
        cameraBox.classList.remove("visible");
        flashToggle.textContent = "🔦 روشن کردن چراغ‌قوه";
    }
});
