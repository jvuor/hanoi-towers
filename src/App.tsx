import React from 'react';
import 'normalize.css';
import './App.css';
import { SolutionDisplay } from './components/SolutionDisplay';
import { SolutionBuilder } from './components/SolutionBuilder';
import { Solution } from './util/towers.interface';
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
      <div className="center">
        <div>
          <div className="container container-header"> 
          ―― Tower of Hanoi ――
          </div>
          <div className="container container-app">
            <SolutionBuilder setSolution={this.setSolution} />
            <SolutionDisplay discs={this.state.discs} solution={this.state.solution} solutionId={this.state.solutionId} />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
