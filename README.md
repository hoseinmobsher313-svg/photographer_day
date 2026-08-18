# Happy World Photographer's Day — Live Server Ready

## اجرای پروژه در VS Code

1. ZIP را Extract کن.
2. پوشه `photographer_day_pro_LiveServer_READY` را با `File > Open Folder` در VS Code باز کن.
3. از بخش Extensions افزونه **Live Server — Ritwick Dey** را نصب کن.
4. فایل `index.html` را باز کن.
5. پایین سمت راست روی **Go Live** بزن، یا روی `index.html` راست‌کلیک و **Open with Live Server** را انتخاب کن.
6. مرورگر باز می‌شود و معمولاً آدرس `http://127.0.0.1:5500/index.html` خواهد بود.

### نکته مهم
Live Server «کد داخل HTML» نیست؛ یک افزونه VS Code است که یک سرور محلی اجرا می‌کند. در این پروژه پوشه `.vscode` اضافه شده تا افزونه به‌عنوان افزونه پیشنهادی پروژه مشخص باشد.

## ساختار
```text
photographer_day_pro_LiveServer_READY/
├── .vscode/
│   ├── extensions.json
│   ├── settings.json
│   └── README.txt
├── index.html
├── styles.css
├── app.js
├── camera.png
├── manifest.webmanifest
└── sw.js
```
