import React from 'react'
import { Solution } from '../solver/towers.interface';
import SolutionCanvas from './SolutionCanvas';

export interface SolutionDisplayProps {
  discs: number
  solution: Solution;
  solutionId: number;
}

interface SolutionDisplayState {
  currentId: number;
  currentIndex: number;
  timer: NodeJS.Timeout;
  discLocations: number[]
}

export class SolutionDisplay extends React.Component<SolutionDisplayProps> {
  state: SolutionDisplayState

  constructor(props: SolutionDisplayProps) {
    super(props);
    this.state = {
      currentId: null,
      currentIndex: null,
      timer: null,
      discLocations: []
    };
  }

  componentDidUpdate = (oldProps: SolutionDisplayProps) => {
    if (oldProps.solutionId !== this.props.solutionId) {
      this.setState({
        currentIndex: -1,
        discLocations: Array(this.props.discs).fill(0)
      });
      if(this.state.timer) {
        clearInterval(this.state.timer);
      }
      const timer = setInterval(this.cycleSolution, 1000);
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

  topMostDisc(locations: number[]) {

  }

  render() {
    return(
      <div>
        <SolutionCanvas discs={this.props.discs} discLocations={this.state.discLocations}/>
      </div>
    )
  }
}
