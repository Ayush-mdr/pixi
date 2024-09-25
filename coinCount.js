import { Container, Graphics, Sprite, Text, TextStyle, Ticker } from "pixi.js";

let coinCount = 0;
let coinCountText;
let incrementQueue = [];
let isAnimating;
let totalCoin = 0;

export const addCoinCount = (app) => {
  const coinContainer = new Container();

  // Create the background using a rounded rectangle
  const background = new Graphics()
    .roundRect(0, 0, 150, 40, 25)
    .fill({ color: 0x64748b, alpha: 0.4 });

  // COIN ICON
  const coinIcon = Sprite.from("coin");
  coinIcon.width = 35;
  coinIcon.height = 35;
  coinIcon.x = 5; // Position it on the left
  coinIcon.y = 2; // Center it vertically within the background
  coinIcon.scale = 0.07;

  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 18,
    align: "center",
    fill: 0xffffff,
    fontWeight: "bold",
  });

  coinCountText = new Text({ text: `${coinCount}`, style: style });
  coinCountText.x = 75;
  coinCountText.y = 9;

  coinContainer.addChild(background);
  coinContainer.addChild(coinIcon);
  coinContainer.addChild(coinCountText);

  coinContainer.x = app.screen.width / 2 - coinContainer.width / 2;
  coinContainer.y = 30;

  app.stage.addChild(coinContainer);
};

export const updateCoinCount = (amount) => {
  incrementQueue.push(amount);
  totalCoin += amount;
  if (!isAnimating) {
    setTimeout(() => animateCoinIncrement(5), 1800);
  }
};

export const animateCoinIncrement = (delay) => {
  isAnimating = true;
  const ticker = new Ticker();
  let frameCounter = 0;
  ticker.add(() => {
    frameCounter++;
    if (frameCounter % delay === 0) {
      if (coinCount < totalCoin) {
        coinCount += 1;
        coinCountText.text = coinCount; // Update text with formatted number
      } else {
        incrementQueue.shift();
        ticker.stop();
        ticker.destroy(); // Destroy ticker when animation completes
        isAnimating = false;
      }
    }
  });

  ticker.start();
};
