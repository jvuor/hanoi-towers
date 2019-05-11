import React from 'react'
import CircularProgressbar from 'react-circular-progressbar';
import { distanceInWordsStrict, addMilliseconds } from 'date-fns'
import { Solution } from '../solver/towers.interface';
import SolutionCanvas from './SolutionCanvas';

export interface SolutionDisplayProps {
  discs: number;
  solution: Solution;
  solutionId: number;
}

interface SolutionDisplayState {
  currentId: number;
  currentIndex: number;
  timer: NodeJS.Timeout;
  discLocations: number[];
}

export class SolutionDisplay extends React.Component<SolutionDisplayProps> {
  state: SolutionDisplayState

  constructor(props: SolutionDisplayProps) {
    super(props);
    this.state = {
      currentId: null,
      currentIndex: null,
      timer: null,
      discLocations: [0, 0, 0, 0, 0],
    };
  }

  componentDidUpdate = (oldProps: SolutionDisplayProps) => {
    if (oldProps.solutionId !== this.props.solutionId) {
      console.log('new solution received');
      const discLocations = [];
      for (let i = 0; i < this.props.discs; i++) {
        discLocations.push(0);
      }
      this.setState({
        currentIndex: -1,
        discLocations
      });
      if(this.state.timer) {
        clearInterval(this.state.timer);
      }
      const timer = setInterval(this.cycleSolution, this.getAnimationSpeed(this.props.discs));
      this.setState({timer});
    }
  }

  cycleSolution = () => {
    const newIndex = this.state.currentIndex + 1;
    if (newIndex >= this.props.solution.length) {
      clearInterval(this.state.timer)
      this.setState({
        timer: null
      })
    } else {
      const from = this.props.solution[newIndex][0];
      const to = this.props.solution[newIndex][1];
      const newLocations = [...this.state.discLocations];
      newLocations[newLocations.lastIndexOf(from)] = to;
      this.setState({ discLocations: newLocations, currentIndex: newIndex });
    }
  }

  getAnimationSpeed = (discs: number): number => {
    if (discs < 6) {
      return 750;
    } else if (discs < 11) {
      return 500;
    } else if (discs < 16) {
      return 200;
    } else {
      return 50;
    }
  }

  getOptimalMoveCount = (): number => (2 ** this.props.discs) - 1

  getProgressPercentage = () : number => {
    const progressPercentage = (this.state.currentIndex / this.props.solution.length) * 100;
    return progressPercentage;
  }

  displayTimeRemaining = () => {
    if (!this.state.timer) {
      return null;
    }
    const movesLeft = this.props.solution.length - this.state.currentIndex;
    const timeLeft_ms = movesLeft * this.getAnimationSpeed(this.props.discs);

    const now = new Date();
    const description = distanceInWordsStrict(now, addMilliseconds(now, timeLeft_ms));
    return description + ' remaining';
  }

  getProgressBar = (): any => {
    if (!this.state.timer) {
      return null;
    }
    return(
      <div 
        style={{width:'50px', margin:'auto', paddingTop:'10px'}}
      >
        <CircularProgressbar 
          percentage={this.getProgressPercentage()}
          strokeWidth={25}
          styles={{
            path: { strokeLinecap: "butt", stroke: '#6F8471' },
            text: { fill: "#000" }
          }}
        />
      </div>
    )
  }

  render() {
    return(
      <div>
        <SolutionCanvas discs={this.props.discs} discLocations={this.state.discLocations}/><br />
        {`${this.state.currentIndex + 1} / ${this.getOptimalMoveCount()}`}
        {this.getProgressBar()}
        {this.displayTimeRemaining()}
      </div>
    )
  }
}
