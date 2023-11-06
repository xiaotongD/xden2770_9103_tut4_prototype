let fft;
let Background;
let backgroundSound;
let color1, color2, color3;

function preload() {
  Background = loadSound('audios/Background.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  fft = new p5.FFT();
  Background.connect(fft);
  Background.setVolume(0.5); 
  backgroundSound = Background 
  backgroundSound.loop();

  color1 = color(32, 55, 69); 
  color2 = color(102, 43, 59); 
  color3 = color(50,30,40);
}

function draw() {
  background(30);
  rotateX(85);
  let wave = fft.waveform();

  translate(0, 0, -40);
  for (var i = 0; i < 300; i++) {
    beginShape();
    let index = floor(map(i, 0, 360, 0, wave.length))
    for (var j = 0; j < 360; j += 10) {
      var rad  = map(wave[index], 0, 0.1, 250, 500)
      var x = rad * cos(j);
      var y = rad * sin(j);
      var z = sin(frameCount + i * 10) *10
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= 250) {
        interpColor = lerpColor(color(196, 99, 85), color(189,120,51), map(d, 0, 250, 0, 1));
      } else {
        interpColor = lerpColor(color(209,134,61), color(88,142,189), map(d, 250.1, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2)
      vertex(x, y, z);
      noFill();
    }
    endShape(CLOSE);
  }

  translate(0, 0, 100);
  rotateX(7);
  for (var i = 0; i < 100; i++) {
    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * 5;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= 200) {
        interpColor = lerpColor(color(196, 99, 85), color(220, 147, 47), map(d, 0, 200, 0, 1));
      } else {
        interpColor = lerpColor(color(220, 147, 47), color(69,106,162), map(d, 200.1, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2)
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }

  drawTower();

}

function drawTower() {
  fill(120, 75, 50);
  push();
  translate(-60, 200, -22);
  scale(0.3);

  beginShape();
  for (let y = -130; y <= 75; y += 10) {
    let lerpedColor;
    if (y < -30) {
      lerpedColor = lerpColor(color1, color2, map(y, -130, -30, 0, 1));
    } else {
      lerpedColor = lerpColor(color2, color3, map(y, -30, 75, 0, 1));
    }
    fill(lerpedColor);
    vertex(-260, 75, -130);
    vertex(-10, 75, -130);
    vertex(-15, 75, -100);
    vertex(-30, 75, -80);
    vertex(-60, 75, -80);
    vertex(-70, 75, -65);
    vertex(-85, 75, -50);
    vertex(-100, 75, -50);
    vertex(-105, 75, -10);
    vertex(-130, 75, 0);
    vertex(-140, 75, -10);
    vertex(-140, 75, 50);
    vertex(-150, 75, 70);
    vertex(-165, 75, 50);
    vertex(-170, 75, -10);
    vertex(-200, 75, -50);
    vertex(-250, 75, -80);
    noStroke();
  }
  endShape(CLOSE);
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


