/*
Week 5 — Side Quest: Reflective Camera Scroll
GBDA302

Goal:
- Camera moves automatically
- World larger than screen
- Slow pacing and emotional motion
- Hidden symbols to discover
*/

const VIEW_W = 800;
const VIEW_H = 480;

const WORLD_W = 3000;
const WORLD_H = 1200;

let cam = { x: 0, y: 0 };
let scrollSpeed = 0.4;

let symbols = [];
let fade = 0;

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  noStroke();
  textFont("sans-serif");

  // Create hidden symbols in the world
  for (let i = 0; i < 8; i++) {
    symbols.push({
      x: random(200, WORLD_W - 200),
      y: random(200, WORLD_H - 200),
      discovered: false,
    });
  }
}

function draw() {
  background(20, 24, 35);

  // --- CAMERA AUTO SCROLL ---
  cam.x += scrollSpeed;

  // Slow pacing change near middle of world
  if (cam.x > WORLD_W * 0.4 && cam.x < WORLD_W * 0.6) {
    scrollSpeed = 0.15; // slow down (meditative pause)
  } else {
    scrollSpeed = 0.4;
  }

  // Stop at end
  cam.x = min(cam.x, WORLD_W - width);

  // --- DRAW WORLD ---
  push();
  translate(-cam.x, -cam.y);

  drawBackgroundGradient();
  drawFloatingOrbs();
  drawSymbols();

  pop();

  // Subtle fade overlay
  fill(0, 40);
  rect(0, 0, width, height);

  drawHUD();
}

/* ==========================
   WORLD VISUALS
========================== */

function drawBackgroundGradient() {
  for (let y = 0; y < WORLD_H; y += 4) {
    let c = map(y, 0, WORLD_H, 40, 80);
    fill(c * 0.3, c * 0.5, c);
    rect(0, y, WORLD_W, 4);
  }
}

function drawFloatingOrbs() {
  for (let i = 0; i < 40; i++) {
    let x = (i * 170) % WORLD_W;
    let y = 200 + sin(frameCount * 0.01 + i) * 80;

    fill(120, 150, 255, 60);
    ellipse(x, y, 60);
  }
}

function drawSymbols() {
  for (let s of symbols) {
    // Check if near center of screen
    let screenX = s.x - cam.x;
    let screenY = s.y - cam.y;

    if (
      screenX > width / 2 - 40 &&
      screenX < width / 2 + 40 &&
      screenY > height / 2 - 40 &&
      screenY < height / 2 + 40
    ) {
      s.discovered = true;
    }

    if (s.discovered) {
      fill(255, 220, 120);
      ellipse(s.x, s.y, 18);
    } else {
      fill(255, 220, 120, 40);
      ellipse(s.x, s.y, 10);
    }
  }
}

/* ==========================
   HUD
========================== */

function drawHUD() {
  fill(255);
  textSize(14);
  text("Week 5 — Reflective Camera Scroll", 20, 30);

  let found = symbols.filter((s) => s.discovered).length;
  text("Symbols discovered: " + found + " / " + symbols.length, 20, 50);
}
