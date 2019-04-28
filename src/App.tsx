import React from 'react';
import './App.css';
import { SolutionDisplay } from './components/SolutionDisplay';
import { SolutionBuilder } from './components/SolutionBuilder';
import { Solution } from './solver/towers.interface';

interface AppState {
  solution: Solution,
  solutionId: number;
}

class App extends React.Component {
  state: AppState;

  constructor(props) {
    super(props);
    this.state = {
      solution: null,
      solutionId: 0
    }
  }

  setSolution = (solution: Solution) => {
    this.setState({solution, solutionId: this.state.solutionId + 1});
  }

  render() {
    return (
      <div className="App">
        <SolutionBuilder setSolution={this.setSolution} />
        <SolutionDisplay discs={5} solution={this.state.solution} solutionId={this.state.solutionId} />
      </div>
    );
  }
}

export default App;
