const canvasSketch = require('canvas-sketch');
const p5 = require('p5');

new p5()




//const colors = ['#9edbff', '#787fff', '#7452ff', '#a1c6ff']

let fibs = [1, 1]
let scale = 1
let minScale;


const settings = {

  pixelsPerInch: 300,
  // Tell canvas-sketch we're using p5.js
  p5: true,
  // Turn on a render loop (it's off by default in canvas-sketch)

  duration: 3,

  animate: true,
  // We can specify dimensions if we want a fixed size on the first render
  dimensions: [512, 512],
  // orientation: 'landscape',
  bleed: 1 / 8,
  // attributes: {
  // antialias: true
  // }
};

canvasSketch(() => {

    angleMode(DEGREES)
    initFibs()
    setMinScale()

    return ({
      playhead,
      width,
      height
    }) => {



      translate(width / 2, height / 2)

      for (let i = 0; i < fibs.length; i++) {
        const scaledFib = fibs[i] * scale


        // fill(color)

        stroke(0)

        rect(0, 0, scaledFib, scaledFib)
        strokeWeight(4)
        arc(scaledFib, 0, 2 * scaledFib, 2 * scaledFib, 90, 180)
        translate(scaledFib, scaledFib)
        rotate(-90)
      }

      if (scale <= minScale) {
        fibs = [1, 1]
        initFibs()
        scale = 1
      } else {
        scale *= 0.99
      }
    }


    function addFib() {
      const fibLen = fibs.length

      fibs.push(fibs[fibLen - 1] + fibs[fibLen - 2])
    }

    function initFibs() {
      for (let i = 0; i < 25; i++) {
        addFib()
      }
    }

    function setMinScale() {
      const fibLen = fibs.length

      minScale = fibs[fibLen - 5] / fibs[fibLen - 1]
    }

  }

  , settings);
