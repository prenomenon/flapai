class Obstacle {

    constructor(speed, level) {
      this.x = width;

      this.width = 80;
      this.height = height;

      this.holeHeight = _.random(200, 280);

      this.holeY = this.randomHoleY();
      this.speed = speed;
      this.level = level;
    }

    randomHoleY() {
      let paddingTop = 10;
      let paddingBottom = 100;

      let upperLimit = paddingTop + 1;
      let lowerLimit = this.height - this.holeHeight - paddingBottom - 1;

      return _.random(upperLimit, lowerLimit);
    }

    update() {
      this.x -= this.speed;
      this.draw()
    }

    draw() {
      // upper part
      fill(color(95, 244, 66, 255 - (this.level - 1) * 30));
      stroke(26, 81, 43);
      rect(this.x, 0, this.width, this.holeY);

      fill(244, 146, 66);
      stroke(0, 0, 0);
      rect(this.x - 2, this.holeY - 20, this.width + 4, 20);

      // lower part
      fill(color(95, 244, 66, 255 - (this.level - 1) * 30));
      stroke(26, 81, 43);
      rect(
        this.x,
        this.holeY + this.holeHeight,
        this.width,
        this.height - this.holeY - this.holeHeight
      );

      fill(244, 146, 66);
      stroke(0, 0, 0);
      rect(this.x - 2, this.holeY + this.holeHeight, this.width + 4, 20);
    }

    isVisible() {
      return this.x + this.width >= 0;
    }

    intersects(player) {
      let upperIntersection = this.rectIntersect(
        player.x, player.y, player.size, player.size,
        this.x, 0, this.width, this.holeY
      );
  
      let lowerIntersection = this.rectIntersect(
        player.x, player.y, player.size, player.size,
        this.x, this.holeY + this.holeHeight, this.width, this.height - this.holeHeight
      );
  
      return upperIntersection || lowerIntersection;
    }

    rectIntersect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
      if (
        r1x + r1w >= r2x &&    // r1 right edge past r2 left
        r1x <= r2x + r2w &&    // r1 left edge past r2 right
        r1y + r1h >= r2y &&    // r1 top edge past r2 bottom
        r1y <= r2y + r2h       // r1 bottom edge past r2 top
      ) {
          return true;
      }
    
      return false;
    }

  }
