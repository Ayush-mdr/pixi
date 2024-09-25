import { Sprite, Ticker } from "pixi.js";
import { updateCoinCount } from "./coinCount";

export const addButton = (app) => {
  const button = Sprite.from("button");
  app.stage.addChild(button);

  button.anchor.set(0.5);

  // Move the sprite to the center of the screen
  button.x = app.screen.width / 2;
  button.y = app.screen.height - 100;

  button.width = 80;
  button.height = 80;

  button.interactive = true;

  button.on("pointerdown", () => {
    animateButtonPress(button);

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        spawnCoins(app, i, i);
      }, 100 * i);
    }
    updateCoinCount(10);
  });
};

const animateButtonPress = (button) => {
  const originalScale = { x: button.scale.x, y: button.scale.y };

  // Scale down the button to simulate a press
  button.scale.set(originalScale.x * 0.9, originalScale.y * 0.9);

  setTimeout(() => {
    button.scale.set(originalScale.x, originalScale.y); // Reset to original size
  }, 100);
};

const spawnCoins = (app) => {
  const coin = Sprite.from("coin");

  coin.anchor.set(0.5);
  coin.x = app.screen.width / 2;
  coin.y = app.screen.height / 1.5;

  const amplitude = 100; // Amplitude for the snake's horizontal movement (width of the snake's wave)
  let time = 0;

  app.stage.addChild(coin);

  let targetY = 75;
  const speed = 4.5; // Speed of the movement

  const halfProgress = (coin.y - targetY) / 2;

  coin.scale.set(0);
  const scaleBy = 0.001;

  // A Ticker to update the coin's position
  const ticker = new Ticker();
  ticker.add(() => {
    time += 0.05;

    coin.y -= speed;
    coin.x = app.screen.width / 2 + Math.sin(time * 0.9) * amplitude;

    if (coin.y > halfProgress) {
      coin.scale.x += scaleBy;
      coin.scale.y += scaleBy;
    } else {
      coin.scale.x -= scaleBy;
      coin.scale.y -= scaleBy;
    }

    // If the coin reaches the target position, stop the ticker and remove the sprite
    if (coin.y <= targetY) {
      ticker.stop(); // Stop the ticker
      app.stage.removeChild(coin); // Remove the coin from the stage
    }
  });

  ticker.start();
};
