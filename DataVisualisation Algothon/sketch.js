const W = 800, H = 800; // dimensions of canvas
const time = 400; // number of x tick values
const step = W/time; // time step

let data = []; // to store data
let count = 0; // steps counter
let pos, fy, c, price, colors, l, f;

// function preload(){
// 	price = loadTable('price.csv');
// }



function setup() {
  createCanvas(W, H);
  fill(255, 30, 70, 90);
  
  // array containing the x positions of the line graph, scaled to fit the canvas
  posx = Float32Array.from({ length: time }, (_, i) => map(i, 0, time, 0, W));
  
  // function to map the price to a specific height (here the height of the canvas)
  fy = _ => map(_, 3, 0, H, 10);
  
  // colors based on height stored in an array list.
  // colors = d3.range(H).map(i => d3.interpolateWarm(norm(i, 0, H)))
  
}

function draw() {
  background('#fff');
  
  // length of data list -1 (to access last item of data list)
  l = data.length -1 ;

  // frameCount
  f = frameCount;
  
  // price = (exp(-c*c/2.0) / sqrt(TWO_PI) / 0.2)  + map(noise(f*0.02), 0, 1, -1, 1);
  price = 0.5*sin(0.1*f)+2
  
  //price data input
  // price = 
  
  // store that number at each step (the x-axis tick values)
  if (f&step) {
    data.push(price);
    count += 1;
  }
  
    
  // iterate over data list to rebuild curve at each frame
  for (let i = 0; i < l; i++) {
    
    y1 = fy(data[i]);
    y2 = fy(data[i+1]);
    x1 = posx[i];
    x2 = posx[i+1];
    
    // vertical lines (x-values)
    strokeWeight(0.2);
    line(x1, H, x1, y1 + 2);
    
    // polyline
    strokeWeight(2);
    // stroke(colors[Math.floor(map(y1, H, 10, H, 0))] );
    stroke(50);
    line(x1, y1, x2, y2);
    
  }
  
  // draw ellispe at last data point
  if (count > 1) {
    ellipse(posx[l], fy(data[l]), 4, 4);
  }
  
  // reset data and count
  if (count%time===0) {
    data = [];
    count = 0;
  }

}