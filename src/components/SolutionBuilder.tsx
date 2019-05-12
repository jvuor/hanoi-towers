import React from 'react'
import solve from '../util/recursive';
import './solutionBuilder.css';
import { Solution } from '../util/towers.interface';
import { newPalette } from '../util/palette';

export interface SolutionBuilderProps {
  setSolution: (discs: number, solution: Solution, time: number) => void;
}

interface SolutionBuilderState {
  discAmount: number
}

export class SolutionBuilder extends React.Component<SolutionBuilderProps> {
  state: SolutionBuilderState;

  constructor(props: SolutionBuilderProps) {
    super(props);
    this.state = {
      discAmount: 5
    };
  }

  setDiscs = (event) => {
    this.setState({
      discAmount: event.target.value
    });
  }

  solve = () => {
    const start = performance.now();
    const solution: Solution = solve(this.state.discAmount);
    const timeTaken = performance.now() - start;
    this.props.setSolution(this.state.discAmount, solution, timeTaken);
    newPalette();
  }
 
  render() {
    return(
      <div className="solution">
        <label htmlFor="discs">Set the number of discs</label>
        <input
          name="discs"
          type="range"
          min="3"
          max="20"
          value={this.state.discAmount}
          onChange={this.setDiscs}
        />
        <span className="number">{this.state.discAmount}</span>
        <button onClick={this.solve}>Solve</button>
      </div>
    )
  }
}
