import React from 'react'
import solve from '../solver/recursive';
import { Solution } from '../solver/towers.interface';

export interface SolutionBuilderProps {
  setSolution: (solution: Solution) => void;
}

export class SolutionBuilder extends React.Component<SolutionBuilderProps> {
  constructor(props: SolutionBuilderProps) {
    super(props);
  }

  componentDidMount() {
    const solution: Solution = solve(5);
    setTimeout(() => this.props.setSolution(solution), 1000);
  }

  render() {
    return(
      <p>
        SolutionBuilder
      </p>
    )
  }
}
