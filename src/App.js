import React from 'react';
import TextDisplay from './components/TextDisplay';
import './css/App.css';
import { calculateSpeed } from "./controllers/speed"
import { startTimer, stopTimer } from "./controllers/timer"

const NumberOfWords = 5

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedText: "",
      speed: 0,
    }
    this.timerStarted = false
  }

  handleInput = (e) => {
    if (!this.timerStarted) {
      startTimer()
    }
    this.timerStarted = true
    this.setState({typedText: e.target.value})
  }

  resetInput = () => {
    this.setState({
      typedText: "",
      speed: calculateSpeed(NumberOfWords, stopTimer()),
    })
    this.timerStarted = false

  }

  render() {
    return (
      <div className="App">
        <h2 className="speed">{this.state.speed} wpm</h2>
        <TextDisplay 
          typedText={this.state.typedText} 
          resetCallback={this.resetInput}
          numberOfWords={NumberOfWords} 
        />
        <input value={this.state.typedText} 
          id="text-input" 
          className="text-input" 
          onChange={this.handleInput} 
        />
      </div>
    );
  }
}

export default App;