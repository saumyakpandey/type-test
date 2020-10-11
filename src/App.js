import React from 'react';
import GitHubButton from "react-github-btn"
import TextDisplay from './components/TextDisplay'
import './css/App.css'
import { calculateScore } from "./lib/score"
import { startTimer, stopTimer } from "./lib/timer"
import { breakText, evaluateTypedWords, getRandomWords, wordStates } from './lib/wordOperations';
import ScoreDisplay from './components/ScoreDisplay';

const numberOfWords = 5

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.freshState()
    this.timerStarted = false
  }

  handleInput = (e) => {
    if (!this.timerStarted) {
      startTimer()
    }
    this.timerStarted = true

    let inputWords = breakText(e.target.value)
    let wordObjs = evaluateTypedWords(this.state.randomWords, inputWords)

    // check if the round is complete
    if (this.isComplete(wordObjs, inputWords)) {
      this.reset(wordObjs)
      return
    }

    // if not, update the state
    this.setState({
      typedText: e.target.value,
      wordObjs: wordObjs,
    })
  }

  reset = (wordObjs) => {
    let state = this.freshState()
    state.score = calculateScore(wordObjs, stopTimer())
    this.setState(state)
    this.timerStarted = false
  }

  resetScore = () =>{
    this.setState({
      score: this.freshState().score,
    })
  }

  isComplete = (wordsToDisplay, inputWords) => inputWords.length > this.state.randomWords.length || 
    wordsToDisplay[wordsToDisplay.length-1].state === wordStates.CORRECT

  freshState = () => {
    let randomWords = getRandomWords(numberOfWords)
    return {
      typedText: "",
      score: {speed: 0, accuracy: 0},
      randomWords: randomWords,
      wordObjs: evaluateTypedWords(randomWords, []),
    }
  }

  render() {
    return (
    <>
      <div className="gitBtn">
        <GitHubButton href="https://github.com/arjunmahishi/type-test" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star arjunmahishi/type-test on GitHub">Star</GitHubButton>
      </div>
      <h1 className="appName">type-test</h1>
      <div className="App">
        <ScoreDisplay score={this.state.score} resetCallback={this.resetScore}/>
        <TextDisplay words={this.state.wordObjs} />
        <input value={this.state.typedText}
          id="text-input"
          className="text-input"
          onChange={this.handleInput}
        />
      </div>
    </>
    );
  }
}

export default App;
