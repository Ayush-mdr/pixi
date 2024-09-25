import { Application, Assets, Sprite } from "pixi.js";
import { addButton } from "./button";
import { addCoinCount } from "./coinCount";
import { addBackground } from "./addBackground";

const app = new Application();

async function setup() {
  await app.init({
    background: "#1099bb",
    width: 500,
    height: window.innerHeight,
  });

  app.canvas.style.position = "absolute";
  app.canvas.style.left = "50%";
  app.canvas.style.top = "0";
  app.canvas.style.transform = "translateX(-50%)";

  document.body.appendChild(app.canvas);
}

async function preload() {
  // an array of asset data to load.
  const assets = [
    { alias: "button", src: "./assets/button.svg" },
    { alias: "coin", src: "./assets/coin.svg" },
    { alias: "background", src: "./assets/bg.png" },
  ];

  // Load the assets defined above.
  await Assets.load(assets);
}

(async () => {
  await setup();
  await preload();

  addBackground(app);
  addButton(app);
  addCoinCount(app);
})();
