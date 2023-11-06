let fft;
let Background;
let backgroundSound;

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
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


