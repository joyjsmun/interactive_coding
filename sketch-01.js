const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    let gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop("0", "black");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "white");

    context.strokeStyle = gradient;
    context.lineWidth = 5;

    const w = width *0.1;
    const h = height *0.1;
    const gap = width *0.01;
    const ix = width * 0.17;
    const iy = height * 0.17;

    let off = width *0.1;

    for (let i =0; i< 5; i++){
      for (let j=0; j<5; j++){

          let gap = 20;
          let x = ix + (w + gap) * i;
          let y = iy + (h+gap) * j;
        
          context.beginPath();
          context.rect(x,y,w,h);
          context.stroke();

         

          // if(i>0 && i <3){
          //         context.beginPath();
          //         context.rect(x+10,y+10,w-20,h-20);
          //         context.stroke();
          // }

          if(Math.random() > 0.5){
            context.beginPath();
            context.arc(x+off/2,y+off/2,w/2.2,0,Math.PI*2);
            context.stroke();
          }

      }
  }

  };
};


            
canvasSketch(sketch, settings);
