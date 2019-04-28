import React from 'react';
import './App.css';
import { SolutionDisplay } from './components/SolutionDisplay';
import { SolutionBuilder } from './components/SolutionBuilder';
import { Solution } from './solver/towers.interface';
import Footer from './components/Footer';

interface AppState {
  discs: number,
  solution: Solution,
  solutionId: number;
}

class App extends React.Component {
  state: AppState;

  constructor(props) {
    super(props);
    this.state = {
      discs: 5,
      solution: null,
      solutionId: 0
    }
  }

  setSolution = (discs: number, solution: Solution) => {
    this.setState({discs, solution, solutionId: this.state.solutionId + 1});
  }

  render() {
    return (
      <div className="App">
        <SolutionBuilder setSolution={this.setSolution} />
        <SolutionDisplay discs={this.state.discs} solution={this.state.solution} solutionId={this.state.solutionId} />
        <Footer />
      </div>
    );
  }
}

export default App;
