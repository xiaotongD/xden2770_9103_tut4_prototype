let Background;
let river;
let sky;
let backgroundSound;

function preload() {
  Background = loadSound('audios/Background.wav');
  river = loadSound('audios/River.wav'); 
  sky = loadSound('audios/Sky.wav'); 
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  Background.setVolume(0.5); 
  river.setVolume(0.5); 
  sky.setVolume(0.5); 
  backgroundSound = Background 
  backgroundSound.loop();
}

function draw() {
  background(30);
  rotateX(85);

  translate(0, 0, -40);
  for (var i = 0; i < 100; i++) {
    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * 8;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= 98) {
        interpColor = lerpColor(color(196, 99, 85), color(189,120,51), map(d, 0, 98, 0, 1));
      } else {
        interpColor = lerpColor(color(209,134,61), color(88,142,189), map(d, 98.1, 200, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2)
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }

  translate(0, 0, 100);
  rotateX(7);
  for (var i = 0; i < 100; i++) {
    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * 8;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= 66.66) {
        interpColor = lerpColor(color(196, 99, 85), color(220, 147, 47), map(d, 0, 66.66, 0, 1));
      } else {
        interpColor = lerpColor(color(220, 147, 47), color(69,106,162), map(d, 66.67, 200, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2)
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }
}
  function mousePressed(){
  if (mouseY < height / 2) {
    sky.play();
    Background.stop();
    river.stop();
  } else {
    river.play()
    Background.stop();
    sky.stop();
 }
}
//

