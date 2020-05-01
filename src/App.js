import React, { Component } from 'react';
import './App.css';
import Keybooard from './Keyboard/Keyboard.js';
import CurrentWord from './CurrentWord/CurrentWord.js';
import Count from './Count/Count.js';

class App extends Component {
  state = {
            wordCollection: ["google", "philanthrope", "musulman", "ramadanmubarak", "iftar", "excellent"],
            alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase().split(''),
            currentWord: null,
            usedLetter: [],
            party: 0, // 0: neutral | -1 lost | 1 win
            attempt: 0,
            maxAttempt: 5
          }

  componentDidMount() {
    window.addEventListener("keyup", (e) => {
      //console.log(e)
      if (e.keyCode === 13) {
        this.initPendu()
      }
    })
    //this.initPendu()
  }

  handleLetterClick = (letter) => {
    //console.log("letter clicked => " + letter)

    if (this.state.usedLetter.indexOf(letter) === -1) {

      let attempt = this.state.attempt
      let maxAttempt = this.state.maxAttempt
      const usedLetter = [ letter, ...this.state.usedLetter]

      if (this.state.currentWord.indexOf(letter) === -1) {
        attempt = this.state.attempt + 1
      }

      let party = 1
      for(let i = 0; i < this.state.currentWord.length; i++ ){
        if(usedLetter.indexOf(this.state.currentWord[i]) === -1){
          party = 0
        }
      }

      if(attempt > this.state.maxAttempt && party === 0) {
        party = -1
      }
      this.setState({ usedLetter, attempt, party })
    }

  }

  pickNewWord = () => {
      const randomIndex = Math.floor( Math.random() * this.state.wordCollection.length )
      return this.state.wordCollection[ randomIndex ]
  }

  initPendu = () => {
    this.setState({
      currentWord: this.pickNewWord(),
      usedLetter: [],
      party: 0,
      attempt: 0,
      //maxAttempt: this.state.currentWord.length
    })
    console.log(this.state.maxAttempt)
  }

  render() {
    return (
      
      <div className="pendu">
        <h1>HANGMAN GAME</h1>

        {
          (this.state.currentWord !== null) && 
              <CurrentWord 
                  currentWord={this.state.currentWord}
                  usedLetter={this.state.usedLetter}
                  win={this.state.party}
              />
        }

        {
          (this.state.currentWord !== null) &&
                <Count 
                  attempt={this.state.attempt}
                  maxAttempt={this.state.maxAttempt}
                />
        }

        {
          (this.state.party === 0 && this.state.currentWord !== null) &&        
          <Keybooard 
            alphabet={this.state.alphabet}
            usedLetter={this.state.usedLetter}
            action={this.handleLetterClick}
        />
        }

        {
          //WINNING
          this.state.party === 1 &&
              <p id="won_msg">CONGRATULATION</p>

        }

        {
          //LOOSING
          this.state.party === -1 &&
              <p id="lost_msg">LOST</p>

        }

        {
          (this.state.currentWord === null || this.state.party !== 0) &&
              <button id="newgame" onClick={() => this.initPendu()}>New Game</button>
        }

      </div>
    )
  }
}

export default App;
