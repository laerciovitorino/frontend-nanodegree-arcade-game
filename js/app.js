// General parameters used to control the enemy positions on screen
var enemyYPos = [60, 150, 230];

// Two options of speeds to be set up on the enemys
var enemySpeeds = [5, 10];

// Screen threshold to help the update function behavior properly
var SCREEN_THR = 800;

// Player initial position parameters
var PLAYER_IN_X_POS = 200;
var PLAYER_IN_Y_POS = 400;

// How much the player should move in both X and Y axis
var X_STEP = 101;
var Y_STEP = 90;

// Thresholds for TOP, RIGHT, BOTTOM and LEFT edges of the game screen
var TOP_THR = 40;
var BOTTOM_RIGHT_THR = 400;
var LEFT_THR = 0;

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  setEnemyParams(this);
};

var setEnemyParams = function(enemy) {
  // Enemy initial position
  enemy.x = Math.random() * (-PLAYER_IN_X_POS);
  enemy.y = enemyYPos[Math.floor(Math.random() * Math.floor(3))];

  // Enemy speed
  enemy.speed = enemySpeeds[Math.floor(Math.random() * Math.floor(2))];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < SCREEN_THR) {
    this.x += this.speed;
  } else {
    setEnemyParams(this);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = PLAYER_IN_X_POS;
  this.y = PLAYER_IN_Y_POS;
  this.sprite = 'images/char-boy.png';
};

// Update the player's position
Player.prototype.update = function(dt) {
    // this.x * dt;
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Get the input provided by the user and handle it accordingly
// It also guarantee that some rules will not be broken when the
// game is run
Player.prototype.handleInput = function(allowedKeys) {
  switch (allowedKeys) {
    case 'up':
      if (this.y <= TOP_THR) {
        this.x = PLAYER_IN_X_POS;
        this.y = PLAYER_IN_Y_POS;
      } else {
        this.y -= Y_STEP;
      }
      break;
    case 'down':
      if (this.y < BOTTOM_RIGHT_THR) {
        this.y += Y_STEP;
      }
      break;
    case 'left':
      if (this.x > LEFT_THR) {
        this.x -= X_STEP;
      }
      break;
    case 'right':
      if (this.x < BOTTOM_RIGHT_THR) {
        this.x += X_STEP;
      }
      break;
    default:
  }
  this.render();
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
window.requestAnimationFrame(Enemy.prototype.update);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
