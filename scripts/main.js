const W = 16;//overlay map size
const H = W;//ditto
const bb = 7.3;//blur bound;larger the value, smaller phantom(in map space)
const advX = 0.5;//dis x per frame(in map space)
const advY = advX * 1.1;//dis y per frame(in map space)
const advFPS = 2;//det how fast it reveals(in frame)

elCanvas.width = W;
elCanvas.height = H;
const ctx = elCanvas.getContext("2d");
let T = H/2;
let B = H/2;
let L = W/2;
let R = W/2;
let x = R ;
let y = B;
let dir = 'R';

ctx.fillStyle = "white";//=bg
ctx.fillRect(0,0,W,H);
ctx.globalCompositeOperation = 'destination-out';//see https://codepen.io/ycw/pen/OojbPZ

(function f() {
  // draw
  switch (dir) {
    case 'R': ctx.fillRect(x-1, y-1, advX, 1); x += advX; break;
    case 'T': ctx.fillRect(x-1, y-1, 1, advY); y -= advY; break;
    case 'L': ctx.fillRect(x-1, y-1, advX, 1); x -= advX; break;
    case 'B': ctx.fillRect(x-1, y-1, 1, advY); y += advY; break;
  }

  // "turn" in new dir if exceed threshold
  // go R-> go T-> go L-> go B ... ccw
  if (dir == 'R' && x > R) { dir = 'T'; R = x; }
  else if (dir == 'T' && y < T) { dir = 'L'; T = y; }
  else if (dir == 'L' && x < L) { dir = 'B'; L = x; }
  else if (dir == 'B' && y > B) { dir = 'R'; B = y; }

  // stop anim if both x and y OOB
  if (x < W-bb && x > bb || y < H-bb && y > bb)
    setTimeout(f, 1000/advFPS);
}());
