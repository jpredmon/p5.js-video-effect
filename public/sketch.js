
let playing = false;


function setup() {
  createCanvas(400, 225);
    let body = document.querySelector('body');
  body.style.margin = '0';
  body.style.padding = '0';
  //body.style.overflow = 'hidden'; // Prevents scrollbars
  video = createVideo(['Manny hopper no audio.mp4']);
  video.size(width, height);
  //video.hide();
}
 

function draw() {
  background(255);
  let gridSize = 3;

  video.loadPixels();
  
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      
      let index = (y * video.width + x) * 4;

      // Get the red, green, and blue components of the pixel
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      // Check if the pixel is predominantly red, green, or blue
      if ((r > g && r > b) || (g > r && g > b) || (b > r && b > g)) {
        // Draw a square in the original color
        fill(r, g, b); 
        noStroke();
        rect(x, y, gridSize, gridSize);
      } else {
        // For non-red, non-green, and non-blue pixels, create a tiny black circle
        let dia = map(r, 0, 255, gridSize, 2);
        fill(0); // Fill with black
        noStroke();
        circle(x, y, dia);
      }
    }
  }
}




function mousePressed() {
  if (playing) {
    video.pause();
  } else {
    video.loop(); // Loop the video
  }
  playing = !playing; // Toggle playback state
}