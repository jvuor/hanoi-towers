import React from 'react';
import 'normalize.css';
import './App.css';
import { SolutionDisplay } from './components/SolutionDisplay';
import { SolutionBuilder } from './components/SolutionBuilder';
import { Solution } from './util/towers.interface';
import Footer from './components/Footer';
import { isSafari } from './util/browserDetection';

interface AppState {
  discs: number,
  solution: Solution,
  solutionId: number,
  solutionTime: number;
}

class App extends React.Component {
  state: AppState;

  constructor(props) {
    super(props);
    this.state = {
      discs: 5,
      solution: null,
      solutionId: 0,
      solutionTime: 0
    }
  }

  setSolution = (discs: number, solution: Solution, solutionTime: number) => {
    this.setState({discs, solution, solutionId: this.state.solutionId + 1, solutionTime});
  }

  render() {
    return (
      <div className="center">
        <div>
          <div className="container container-header">
            <div className={isSafari() ? "" : "header-effect"}>
              Tower of Hanoi
            </div>
          </div>
          <div className="container container-app">
            <SolutionBuilder setSolution={this.setSolution} />
            <SolutionDisplay 
              discs={this.state.discs}
              solution={this.state.solution}
              solutionId={this.state.solutionId} 
              solutionTime={this.state.solutionTime} 
            />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
