let s; // canvas size (calc'd in setup)
const n=20; // num scribble points
const drawtime=3; // time spent drawing
let wiggle; // amount of variation (calc'd)
const wiggleFreq=3;
let cameraDist;
const cameraPeriod=60;
let t;
let t_start=-1;
let nx;
let points=[[],[],[]]; 
let pointsr=[[],[],[]];

function setup() {
    s=min(windowWidth,windowHeight)*0.9;
    wiggle=0.015*s;
    cameraDist=1.3*s;
  var canvas=createCanvas(s, s,WEBGL);
  canvas.parent('scribble');
  for (let i=0;i<n;i++) {
    points[0][i]=random(-s/2+2*wiggle,s/2-wiggle*2);
    points[1][i]=random(-s/2+2*wiggle,s/2-wiggle*2);
    points[2][i]=random(-s/2+2*wiggle,s/2-wiggle*2);
    pointsr[0][i]=points[0][i]+(random()-0.5)*wiggle;
    pointsr[1][i]=points[1][i]+(random()-0.5)*wiggle;
    pointsr[2][i]=points[1][i]+(random()-0.5)*wiggle;
  }
  noFill();
  stroke(m6c);
  strokeWeight(2);
  noLoop();
}

function draw() {
    if (t_start==-1){t_start=0}
    else if (t_start==0){t_start=millis()/1000}
    // console.log(t_start)

  clear()
  // background(255);
  t=millis()/1000-drawtime-t_start;
  camera(cameraDist*sin(t*2*PI/cameraPeriod),
         0,
         cameraDist*cos(t*2*PI/cameraPeriod));
  
  nx=constrain(floor((t+drawtime)*n/drawtime),0,n)
  beginShape();
  for (let i=0;i<nx;i++) {
    if (abs(t*wiggleFreq*2)%2>1){ 
      curveVertex(points[0][i],points[1][i],points[2][i]);
    }
    else {
      curveVertex(pointsr[0][i],pointsr[1][i],points[2][i]);
    }
  }
  endShape();
  
}
function windowResized() {
    s=min(windowWidth,windowHeight)*0.9;
    resizeCanvas(s,s);
}
