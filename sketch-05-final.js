//code to upload an image://


const canvasSketch = require('canvas-sketch');
const random = require ('canvas-sketch-util/random');
const color = require ('canvas-sketch-util/color');

const settings = {
  dimensions: [ 1080, 1080 ],
  //animate: true
};

//declaring manager outside of the function to be used universal
let manager, image;

/*moved text variable outside the function of const sketch,
which will allow changes*/
let text ='A';
let fontSize = 1200;
let fontFamily = '-apple-system, BlinkMacSystemFont,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

//random color
   const randomColor = () => {
      let letters = '01ABCDEF';
      let color = '#';

      for(let i = 0; i < 6 ; i++){
        color += letters[Math.floor(Math.random() * 8)];
      }

      return color;
    };


//make context, width, height data available for grid properties of typeCanvas to read
const sketch = ({context, width, height}) => {

  const cell = 10;

  const cols = Math.floor (width / cell);
  const rows = Math.floor (height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({context, width, height }) => {
    // color bg 
    typeContext.fillStyle = '#dac4c7';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols *1.2;


    //critical to display image on screen
    typeContext.drawImage(image, 0, 0, cols, rows);

    //typeContext.font = fontSize + 'px' + fontFamily;
    typeContext.font = `$(fontSize)px $(fontFamily)`;
    typeContext.textBaseline = 'middle';
    typeContext.textAlign = 'center';

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx,ty);

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    
		context.fillStyle = 'black'
		context.fillRect(0, 0, width, height);

		context.textBaseline = 'middle';
		context.textAlign = 'center';

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor (i / cols);


      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

			context.font = `${cell * 1}px ${fontFamily}`;
			if (Math.random() < 0.1) context.font = `${cell * 1.3}px ${fontFamily}`;
      //context.fillStyle='hsl(' + 360 * Math.random() + ', 50%, 70%)';
      context.fillStyle = "white";

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      context.fillText(glyph, 0, 0);


      context.restore();
    }
  };

};


const getGlyph = (v) => {
	if (v < 50) return '';
	if (v < 100) return '.';
	if (v < 150) return '-';
	if (v < 200) return '+';

	const glyphs = 'web3'.split('');

	return random.pick(glyphs);
};

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;

  });
};

const start = async () => {
  const url = 'images/joy.jpg';
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);

};

start();
