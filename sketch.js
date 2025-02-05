let grid = [];
let cols, rows;
let size = 10;

let handPose;
let video;
let hands = [];
let options = { flipped: true };

function preload() {
  handPose = ml5.handPose(options);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);

  cols = floor(width / size);
  rows = floor(height / size);
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}

function draw() {
  background(0);

  image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let indexFinger = hand.keypoints[8]; // Index finger tip
    addCoins(indexFinger.x, indexFinger.y);
  }

  drawCoins(); 
}

function drawCoins() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] > 0) {
        noStroke();
        fill(255, 223, 0); // Gold color
        ellipse(i * size + size / 2, j * size + size / 2, size, size);
        fill(0);
        rectMode(CENTER);
        rect(i * size + size / 2, j * size + size / 2, size / 3, size / 3);
      }
    }
  }
}

function addCoins(fingerX, fingerY) {
  let x = floor(fingerX / size);
  let y = floor(fingerY / size);
  x = constrain(x, 0, cols - 1);
  y = constrain(y, 0, rows - 1);
  grid[x][y] = 1; // Place coin at detected finger position
}

function gotHands(results) {
  hands = results;
}
