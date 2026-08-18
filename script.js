* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Segoe UI", system-ui, sans-serif;
    background: #050509;
    color: #f5f5f5;
}

/* Header */
.site-header {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    background: rgba(5,5,9,0.9);
    backdrop-filter: blur(12px);
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 8px;
}

.nav {
    display: flex;
    gap: 16px;
}

.nav a {
    color: #ddd;
    text-decoration: none;
    font-size: 14px;
}

.flash-btn {
    background: #222;
    color: #ffd966;
    border: 1px solid #ffd966;
    padding: 8px 16px;
    border-radius: 999px;
    cursor: pointer;
}

.flash-btn.on {
    background: #ffd966;
    color: #222;
}

/* Hero */
.hero {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    padding: 40px 24px;
    gap: 24px;
}

.hero-bg {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
}

.camera-layer {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.8s;
}

.camera-layer.visible {
    opacity: 1;
}

.camera-frame {
    width: 80%;
    max-width: 640px;
    aspect-ratio: 16/9;
    border-radius: 24px;
    background: url("camera.png") center/cover no-repeat;
    box-shadow: 0 30px 80px rgba(0,0,0,0.9);
    position: relative;
}

.camera-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.1), rgba(0,0,0,0.8));
}

.camera-info {
    position: absolute;
    bottom: 16px;
    right: 20px;
    color: #fff;
    opacity: 0.8;
}

/* Watercolor */
.watercolor-layer {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 20% 0%, rgba(255,255,255,0.9), transparent 60%),
        radial-gradient(circle at 80% 100%, rgba(0,0,0,0.9), transparent 60%);
    opacity: 0.9;
}

/* Text */
.hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
}

.hero-title {
    font-size: 30px;
}

.photographer {
    display: block;
    margin-top: 10px;
}

.stars {
    font-size: 14px;
    opacity: 0.5;
}

.cta-btn {
    display: inline-block;
    margin-top: 12px;
    padding: 10px 20px;
    background: #ffd966;
    color: #222;
    border-radius: 999px;
    text-decoration: none;
}

/* Downloads */
.downloads-section {
    padding: 40px 24px;
}

.download-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.download-card {
    background: #101018;
    padding: 16px;
    border-radius: 18px;
}

.dl-btn {
    display: inline-block;
    margin-top: 8px;
    padding: 8px 16px;
    border-radius: 999px;
    border: 1px solid #ffd966;
    color: #ffd966;
    text-decoration: none;
}

/* Footer */
.site-footer {
    padding: 16px 24px;
    border-top: 1px solid #333;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
}

/* Responsive */
@media (max-width: 900px) {
    .hero {
        grid-template-columns: 1fr;
    }

    .download-grid {
        grid-template-columns: 1fr;
    }

    .nav {
        display: none;
    }
}
