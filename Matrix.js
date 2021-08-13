var symbol;
var symbolSize = 40;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  textSize(symbolSize);

  var streamX = 0;

  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(streamX, random(-1000, 0));
    streams.push(stream);
    streamX += symbolSize;
  }
}

function draw() {
  background(0, 90);

  streams.forEach(function (stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2, 30));
  this.first = first;

  this.setToRandomSymbol = function () {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(0x30a0 + round(random(0, 40)));
    }
  };

  this.render = function () {
    fill(0, 255, 70);
    text(this.value, this.x, this.y);
    this.rainDown();
    this.setToRandomSymbol();
  };

  this.rainDown = function () {
    if (this.y >= height) {
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  };
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(1, 10);

  this.generateSymbols = function (x, y) {
    var first = round(random(0, 3)) == 1;

    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);

      y -= symbolSize + 5;
      first = false;
    }
  };

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(0, 255, 255);
      } else {
        fill(round(random(1, 255)), 0, 255);
      }

      text(symbol.value, symbol.x, symbol.y);
      symbol.rainDown();
      symbol.setToRandomSymbol();
    });
  };
}
