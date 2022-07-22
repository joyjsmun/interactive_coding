const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true
};

const animate = () => {
  console.log('joy')
  requestAnimationFrame(animate);
}

// animate()


const randomRange = (min,max) => {
  return Math.random() * (max-min) + min;
}

const sketch = ({ width, height }) => {
  const agents = [];


  for(let i=0; i<40; i++){
    const x = randomRange(0,width);
    const y = randomRange(0,height);

    agents.push(new Agent(x,y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i< agents.length; i++){
      const agent = agents[i];

      for(let j=i+1; j< agents.length; j++){
        const other = agents[j]; 

        const dist = agent.pos.getDistance(other.pos);

        context.lineWidth = math.mapRange(dist,0,200,1);

        //more distance 200 => then no more iteration
        if(dist > 200) continue;

        context.beginPath();
        context.moveTo(agent.pos.x,agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.strokeStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        context.stroke();
      }
    }

    


    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      //agent.bounce(width,height);
      agent.wrap(width,height);
    })
  }
}


canvasSketch(sketch, settings);

class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
    
  }

  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx*dx+dy*dy);
  }


}



class Agent {
  constructor(x,y){
    this.pos = new Vector(x,y);
    this.vel = new Vector(randomRange(-1,1),randomRange(-1,1))
    this.radius = randomRange(10,40);
  }

  bounce(width,height){
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height){
    if(this.pos.x > width) this.pos.x = 0;
    if(this.pos.x < 0) this.pos.x = width;
    if(this.pos.y > height) this.pos.y = 0;
    if(this.pos.y < 0) this.pos.y = height;
    }



  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context){
    
    context.save();
    context.translate(this.pos.x,this.pos.y);

    context.lineWidth = 4;
    context.fillStyle='hsl(' + 360 * Math.random() + ', 50%, 50%)';

    context.beginPath();
    context.arc(0,0,this.radius,0,Math.PI*2);
    context.fill();
    context.stroke();
   
    // context.font = "30px Arial";
    // context.strokeText("web3",10,50);

    context.restore();
  }
}
