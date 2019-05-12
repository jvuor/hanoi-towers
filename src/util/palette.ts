let palette = generatePalette();

function newPalette() {
  palette = generatePalette();
}

function generatePalette() {
  const rng = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

  const palette = [];
  const targetColor = [rng(50, 220), rng(50, 220), rng(50, 220)];
  const step = targetColor.map(color => color / 22);
  let colors = [...step];

  for (let i = 0; i < 20; i++) {
    palette.push(colors);
    colors = colors.map((c, i) => c + step[i]);
  }

  const paletteRGB = palette.map(value => `rgb(${Math.floor(value[0])}, ${Math.floor(value[1])}, ${Math.floor(value[2])})`);

  // Plain color background is a fallback in case a browser has issues with the linear gradient
  document.body.style.background = paletteRGB[10];
  document.body.style.backgroundImage = `repeating-linear-gradient(
                                      -45deg,
                                      ${paletteRGB[10]},
                                      ${paletteRGB[10]} 30px,
                                      ${paletteRGB[16]} 30px,
                                      ${paletteRGB[16]} 60px
                                    )`
  
  

  return paletteRGB
}


export { palette, newPalette }
