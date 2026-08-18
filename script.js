const flashlight = document.getElementById("flashlight");
const brightness = document.getElementById("brightness");
const glow = document.getElementById("glow");
const bell = document.getElementById("bell");
const cameraCard = document.getElementById("cameraCard");
const toast = document.getElementById("toast");
const quality = document.getElementById("quality");
const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

function showToast(text){
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(()=>toast.classList.remove("show"), 2200);
}

function setLight(on){
  document.body.classList.toggle("lamp-on", on);
  flashlight.classList.toggle("on", on);
  flashlight.setAttribute("aria-pressed", String(on));
  glow.style.opacity = on ? (0.45 + Number(brightness.value)/180) : 0.45;
}
flashlight.addEventListener("click",()=>setLight(!document.body.classList.contains("lamp-on")));
brightness.addEventListener("input",()=>{
  const v = Number(brightness.value);
  glow.style.transform = `scale(${0.8 + v/100})`;
  if(v > 8) setLight(true);
});

function revealCamera(){
  cameraCard.classList.add("show");
  setTimeout(()=>cameraCard.classList.remove("show"), 5200);
}
bell.addEventListener("click", revealCamera);

// Drag the bell downward to reveal the camera.
let dragging=false,startY=0;
bell.addEventListener("pointerdown",e=>{dragging=true;startY=e.clientY;bell.setPointerCapture(e.pointerId)});
bell.addEventListener("pointermove",e=>{
  if(!dragging) return;
  const dy=e.clientY-startY;
  bell.style.transform=`translateY(${Math.max(-20,Math.min(170,dy))}px)`;
  if(dy>70) revealCamera();
});
bell.addEventListener("pointerup",()=>{dragging=false;bell.style.transform=""});

function getCanvasSize(){
  const h = Number(quality.value);
  return {w: Math.round(h*16/9), h};
}

async function makeVideo(){
  if(!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream){
    showToast("Your browser does not support WebM recording.");
    return;
  }
  const {w,h}=getCanvasSize();
  const maxPixels = 3840*2160;
  const scale = Math.min(1, Math.sqrt(maxPixels/(w*h)));
  const cw=Math.max(640,Math.floor(w*scale)), ch=Math.max(360,Math.floor(h*scale));
  const canvas=document.createElement("canvas");
  canvas.width=cw; canvas.height=ch;
  const ctx=canvas.getContext("2d");
  const img=new Image();
  img.src="assets/sony-camera.jpg";
  await new Promise((res,rej)=>{img.onload=res;img.onerror=rej});
  const stream=canvas.captureStream(30);
  const chunks=[];
  const recorder=new MediaRecorder(stream,{mimeType:"video/webm;codecs=vp9"});
  recorder.ondataavailable=e=>e.data.size&&chunks.push(e.data);
  const done=new Promise(resolve=>recorder.onstop=resolve);
  recorder.start();

  const start=performance.now(), duration=7000;
  function frame(now){
    const t=Math.min(1,(now-start)/duration);
    const p=t*duration;
    ctx.fillStyle="#050608";ctx.fillRect(0,0,cw,ch);

    const imgRatio=img.width/img.height, outRatio=cw/ch;
    let dw=cw,dh=ch,dx=0,dy=0;
    if(imgRatio>outRatio){dh=ch;dw=dh*imgRatio;dx=(cw-dw)/2}
    else{dw=cw;dh=dw/imgRatio;dy=(ch-dh)/2}
    ctx.globalAlpha=.92;ctx.drawImage(img,dx,dy,dw,dh);ctx.globalAlpha=1;

    const g=ctx.createRadialGradient(cw*.5,ch*.48,0,cw*.5,ch*.48,cw*.45);
    g.addColorStop(0,"rgba(255,224,135,.28)");g.addColorStop(.35,"rgba(255,224,135,.08)");g.addColorStop(1,"rgba(0,0,0,.72)");
    ctx.fillStyle=g;ctx.fillRect(0,0,cw,ch);

    ctx.textAlign="center";
    const titleSize=Math.max(38,cw*.055);
    ctx.font=`700 ${titleSize}px Arial`;
    ctx.fillStyle=`rgba(255,255,255,${Math.min(1,t*2)})`;
    ctx.fillText("Happy 😊 World 🌍",cw/2,ch*.25 + Math.sin(t*Math.PI)*18);
    ctx.font=`300 ${Math.max(22,cw*.028)}px Arial`;
    ctx.fillStyle="rgba(255,255,255,.82)";
    ctx.fillText("Photographer's Day",cw/2,ch*.34);
    ctx.font=`500 ${Math.max(18,cw*.018)}px Arial`;
    ctx.fillStyle="rgba(255,255,255,.55)";
    ctx.fillText("August 19  😍",cw/2,ch*.39);

    // Watercolor/rain droplets.
    for(let i=0;i<120;i++){
      const x=(i*83 + p*.03*(i%5+1))%cw;
      const y=(i*47 + p*(.08+(i%4)*.025))%ch;
      const r=2+(i%7);
      ctx.fillStyle=i%2?"rgba(255,255,255,.06)":"rgba(0,0,0,.07)";
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
    }
    const wipe=Math.sin(t*Math.PI);
    ctx.fillStyle=`rgba(255,255,255,${.18*wipe})`;ctx.fillRect(0,0,cw,ch);
    if(t<1) requestAnimationFrame(frame); else recorder.stop();
  }
  requestAnimationFrame(frame);
  await done;
  const blob=new Blob(chunks,{type:"video/webm"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=`photographers-day-${quality.value}p.webm`;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  showToast(`Downloaded ${quality.value}p WebM`);
}
downloadBtn.addEventListener("click",makeVideo);

shareBtn.addEventListener("click",async()=>{
  const data={title:"Happy World Photographer's Day",text:"Happy World Photographer's Day — August 19",url:location.href};
  try{
    if(navigator.share){await navigator.share(data)}
    else{await navigator.clipboard.writeText(location.href);showToast("Page link copied")}
  }catch(e){}
});

setLight(false);
