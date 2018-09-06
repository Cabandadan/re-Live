const LEVELS = 2048;
const LEVEL_MIN = 128;
const INTERVAL = 200;

const imgEls = Array.from(document.querySelectorAll("img.fx"));
for (const imgEl of imgEls)
  patch(imgEl);


//----

function patch(imgEl) {
  const img = new Image();
  img.addEventListener("load", (e) => {
   onImageLoad(e, imgEl);
  });
  img.src = imgEl.src;
}



function onImageLoad(e, imgEl) {
  const img = e.target;
  const {width:srcw, height:srch} = img;
  const {width:imgw, height:imgh} = imgEl.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.classList.add("fx");
  //imgEl.parentNode.replaceChild(canvas, imgEl);//replace
  imgEl.parentNode.appendChild(canvas);
  fx(img, canvas);//start playing fx
}



function fx(img, canvas) {
  let level = LEVELS;
  (function f() {
    downSample(canvas, img, level);
    level/=1.2;
    if (level > LEVEL_MIN) setTimeout(f, INTERVAL);
    else canvas.classList.add("done");
  }());
}


function downSample(canvas, img, factor) {
  canvas.width = img.width/factor;
  canvas.height = img.height/factor;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0,0,canvas.width,canvas.height);
  return canvas;
}
