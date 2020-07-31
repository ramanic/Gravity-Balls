import utils, { randomIntFromRange, randomColor } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var colors = [
  "#F44336",
  "#9C27B0",
  "#3F51B5",
  "#8BC34A",
  "#607D8B",
  "#2185C5",
  "#7ECEFD",
  "#FFF6E5",
  "#FF7F66",
];
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
var gravity = 1;
var friction = 0.8;

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color, move, event) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
    this.move = move;
    this.event = event;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.move == true) {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction;
      } else {
        this.dy += gravity;
      }

      if (
        this.x + this.radius + this.dx > canvas.width ||
        this.x - this.radius <= 0
      ) {
        this.dx = -this.dx * friction;
      }
    } else {
      this.x = this.event.clientX;
      this.y = this.event.clientY;
    }

    this.y += this.dy;
    this.x += this.dx;

    this.draw();
  }
}

// Implementation
var ball;
var ballArray = [];
function init() {
  // for (var i = 0; i < 200; i++) {
  // }
}
function updateSize() {
  var size = ballArray.length - 1;
  ballArray[size].radius++;
  if (!ballArray[size].move) {
    setTimeout(updateSize, 10);
  }
}

addEventListener("mousedown", (event) => {
  var color = randomColor(colors);
  var radius = 1;
  var dx = randomIntFromRange(-5, 5);
  var dy = randomIntFromRange(-9, 9);
  ballArray.push(
    new Ball(event.clientX, event.clientY, dx, dy, radius, color, false, event)
  );

  addEventListener("mousemove", (e) => {
    var size = ballArray.length - 1;
    ballArray[size].event = e;
  });
  updateSize();
});

addEventListener("mouseup", () => {
  var size = ballArray.length - 1;
  ballArray[size].move = true;
  console.log(ballArray[size]);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
}

init();
animate();
