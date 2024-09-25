import { Sprite } from "pixi.js";

export function addBackground(app) {
  const background = Sprite.from("background");
  background.anchor.set(0.5);

  background.scale = 0.28;
  background.x = app.screen.width / 2 - 11;
  background.y = app.screen.height / 2 - 20;

  // Add the background to the stage.
  app.stage.addChild(background);
}
