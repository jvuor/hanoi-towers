import React from 'react'
import solve from '../solver/recursive';
import { Solution } from '../solver/towers.interface';

export interface SolutionBuilderProps {
  setSolution: (discs: number, solution: Solution) => void;
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
    const solution: Solution = solve(this.state.discAmount);
    this.props.setSolution(this.state.discAmount, solution);
  }
 
  render() {
    return(
      <div>
        <label htmlFor="discs">Set the number of discs</label>
        <input
          name="discs"
          type="range"
          min="3"
          max="20"
          value={this.state.discAmount}
          onChange={this.setDiscs}
        />
        {this.state.discAmount}
        <button onClick={this.solve}>Solve</button>
      </div>
    )
  }
}
