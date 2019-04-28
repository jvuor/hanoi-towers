import React from 'react';

export interface SolutionCanvasProps {
  discs: number;
  discLocations: number[]
}

interface SolutionCanvasState {
  width: number,
  height: number
}

const palette: string[] = [
  '#030603',
  '#060C06',
  '#091209',
  '#0B170C',
  '#0E1D0F',
  '#112312',
  '#142915',
  '#162E18',
  '#19341B',
  '#1C3A1E',
  '#1E3F20',
  '#325034',
  '#466148',
  '#5B735C',
  '#6F8471',
  '#849685',
  '#98A799',
  '#ADB9AD',
  '#C1CAC2',
  '#D6DCD6',
  '#EAEDEA'
]

export default class SolutionCanvas extends React.Component<SolutionCanvasProps> {
  state: SolutionCanvasState;

  rods: number[];
  rodsNr: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(props: SolutionCanvasProps) {
    super(props);
    this.rodsNr = 3;
    this.state = {width: 100, height: 100};
  }

  componentDidMount() {
    this.canvas = this.refs.canvas as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.drawBase();
  }

  componentDidUpdate() {
    this.drawBase();
  }

  getHeigth = () => (this.props.discs * 20) + 60;
  getWidthOfTheLargestDisc = () => 40 + (20 * this.props.discs)
  getWidth = () => this.getWidthOfTheLargestDisc() * this.rodsNr + (20 * this.rodsNr);

  drawBase() {
    const widthOfTheLargestDisc = this.getWidthOfTheLargestDisc();
    const width = this.getWidth();
    const height = this.getHeigth();
    const rodHeight = height - 40;

    let rodSpot = 20 + widthOfTheLargestDisc / 2;
    let rodInterval = widthOfTheLargestDisc + 10;
    this.rods = new Array(this.rodsNr).fill(null);
    this.rods = this.rods.map(rod => {
      const spot = rodSpot;
      rodSpot += rodInterval;
      return spot
    });

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.beginPath();
    this.ctx.lineWidth = 4;
    this.ctx.moveTo(0, height - 10);
    this.ctx.lineTo(width, height - 10);
    this.rods.forEach(rod => {
      this.ctx.moveTo(rod, height - 10);
      this.ctx.lineTo(rod, (height - 10) - rodHeight);
    })

    this.ctx.stroke();

    this.drawDiscs();
  }

  drawDiscs() {
    const discsAtRod = Array(this.rodsNr).fill(0);
    let discWidth = 40 + (20 * this.props.discs)
    this.props.discLocations.forEach((disc, i) => {
      const discInitY = this.getHeigth() - 10 - (discsAtRod[disc] * 20) - 20;
      const discInitX = this.rods[disc] - (discWidth / 2);

      this.ctx.fillStyle = palette[i];
      this.ctx.fillRect(discInitX, discInitY, discWidth, 20);
      discWidth -= 20;
      discsAtRod[disc] += 1;
    })
  }

  render() {
    return (
      <canvas ref="canvas" width={this.getWidth()} height={this.getHeigth()}/>
    )
  }
}
