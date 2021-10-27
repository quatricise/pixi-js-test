const app = new PIXI.Application({
  width: innerWidth, height: innerHeight, resolution: window.devicePixelRatio || 1,
});
let cw = window.innerWidth
let ch = window.innerHeight
document.body.appendChild(app.view);

// Magically load the PNG asynchronously
let sprite = PIXI.Sprite.from('assets/sample.png');
sprite.interactive = true
sprite.on('pointerdown', (event) => { sprite.rotation += 0.5*Math.PI });


let frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
frame.drawRect(0, 0, 208, 208);
frame.position.set(320 - 100, 180 - 100);
frame.interactive = true;

app.stage.addChild(frame);
// Create a graphics object to define our mask
let mask = new PIXI.Graphics();
// Add the rectangular area to show
mask.beginFill(0xffffff);
mask.drawRect(0,0,200,200);
mask.endFill();

// Add container that will hold our masked content
let maskContainer = new PIXI.Container();
// Set the mask to use our graphics object from above
maskContainer.mask = mask;
// Add the mask as a child, so that the mask is positioned relative to its parent
maskContainer.addChild(mask);
// Offset by the window's frame width
maskContainer.position.set(4,4);
// And add the container to the window!
frame.addChild(maskContainer);
maskContainer.addChild(sprite);

// Create contents for the masked container
let text = new PIXI.Text(
  'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
  'You can put anything in the container and it will be masked!',
  {
    fontSize: 24,
    fill: 0xeeaa10,
    wordWrap: true,
    wordWrapWidth: 180
  }
);
text.x = 10;
maskContainer.addChild(text);

let elapsed = 0.0;
// Tell our application's ticker to run a new callback every frame, passing
// in the amount of time that has passed since the last tick
app.ticker.add((delta) => {
  // Add the time to our total elapsed time
  elapsed += delta;
  // Update the sprite's X position based on the cosine of our elapsed time.  We divide
  // by 50 to slow the animation down a bit...
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
  text.y = 10 + -100.0 + Math.cos(elapsed/50.0) * 100.0;
  frame.x = 200 + Math.cos(elapsed/50.0) * 100.0;
});