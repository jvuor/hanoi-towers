import React from 'react';

export interface SolutionCanvasProps {
  discs: number;
  discLocations: number[]
}

export default class SolutionCanvas extends React.Component<SolutionCanvasProps> {
  width:number
  height:number
  rods: number[];
  rodsNr: number;
  rodHeight: number;
  discsAtRod: number[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(props: SolutionCanvasProps) {
    super(props);

    this.rodsNr = 3;
   
    const widthOfTheLargestDisc = 40 + (20 * this.props.discs)
    this.width = widthOfTheLargestDisc * this.rodsNr + (20 * this.rodsNr) + 40;
    this.height = (this.props.discs * 20) + 60;
    this.rodHeight = this.height - 40;

    let rodSpot = 20 + widthOfTheLargestDisc / 2;
    let rodInterval = widthOfTheLargestDisc + 10;
    this.rods = new Array(this.rodsNr).fill(null);
    this.rods = this.rods.map(rod => {
      const spot = rodSpot;
      rodSpot += rodInterval;
      return spot
    });
  }

  componentDidMount() {
    this.canvas = this.refs.canvas as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.drawBase();
  }

  componentDidUpdate() {
    this.drawBase();
  }

  drawBase() {
    this.ctx.fillStyle = '#dddddd';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.beginPath();
    this.ctx.lineWidth = 4;
    this.ctx.moveTo(0, this.height - 10);
    this.ctx.lineTo(this.width, this.height - 10);
    this.rods.forEach(rod => {
      this.ctx.moveTo(rod, this.height - 10);
      this.ctx.lineTo(rod, (this.height - 10) - this.rodHeight);
    })

    this.ctx.stroke();

    this.drawDiscs();
  }

  drawDiscs() {
    this.discsAtRod = Array(this.rodsNr).fill(0);
    let discWidth = 40 + (20 * this.props.discs)
    this.props.discLocations.forEach(disc => {
      const discInitY = this.height - 10 - (this.discsAtRod[disc] * 20) - 20;
      const discInitX = this.rods[disc] - (discWidth / 2);
      this.ctx.strokeRect(discInitX, discInitY, discWidth, 20);
      discWidth -= 20;
      this.discsAtRod[disc] += 1;
    })
  }

  render() {
    return (
      <canvas ref="canvas" width={this.width} height={this.height}/>
    )
  }
}
