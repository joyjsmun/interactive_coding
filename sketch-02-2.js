const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};


const randomRange = (min,max) => {
  return Math.random() * (max-min) + min;
}

const degToRad = (degree) => {
  return degree /180 * Math.PI;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    let gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop("0", "blue");
    gradient.addColorStop("0.25", "red");
    gradient.addColorStop("0.5", "green");
    gradient.addColorStop("0.75", "yellow");
    gradient.addColorStop("1.0", "pink");

    context.strokeStyle = gradient;

    context.fillStyle = "black";

    const cx = width *0.5;
    const cy = height *0.5;
    const w = width *0.01;
    const h = height *0.1;

    let x,y;

    const num = 12;
    const radius = width*0.3;

    for (let i=0; i<num ; i++){
      const slice = degToRad(360/num);
      const angle = slice*i;

      x = radius * Math.sin(angle);
      y = radius * Math.cos(angle);
      
    
          context.save();
          context.translate(cx,cy);
          context.translate(x,y);
          context.rotate(-angle);
          context.scale(randomRange(0.1,2),1);

          context.beginPath();
          context.rect(-w*0.5,randomRange(0,-h*0.5),w,h);
          context.fill();
          context.restore();

          //add 2
          context.save();
          context.translate(cx,cy);
          context.rotate(-angle);

          context.lineWidth = randomRange(5,20);

          context.beginPath();
          context.arc(0,0,radius*randomRange(0.7,1.3),slice*randomRange(0,5),slice*randomRange(1,-8))
          context.stroke();
          context.restore();


          //add 3
          context.save();
          context.translate(cx,cy);
          context.rotate(angle);

          context.lineWidth = randomRange(5,20);

          context.beginPath();
          context.arc(0,0,radius*randomRange(0.7,1.7),slice*randomRange(0,1.5),slice*randomRange(1,-8))
          context.stroke();
          context.restore();
    }
  };
};

canvasSketch(sketch, settings);
