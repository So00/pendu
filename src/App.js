import React, {Component} from "react";
import KeyboardHangMan from "./Keyboard";
import HangMan from "./Hangman";


let ascii_replace = require("fold-to-ascii");
let _ = require("lodash");

/**
 * Get a random french word by calling function random()
 */
let uniqueRandom = require("unique-random-array");
let random = uniqueRandom(require("an-array-of-french-words"));

// Number of letter max by level
const difficulty = [5, 7, 9];

class App extends Component {

  basicState = {
    word: null,
    tries: 0,
    playedLetters: [],
    win: 0,
    difficulty: 0,
    loose: 0
  };

  state = _.cloneDeep(this.basicState);

  
  constructor() {
    super();
    let cpyState = _.clone(this.state);
    cpyState.word = this.newWord();
    this.state = cpyState;
    //Décommentez pour tricher ;)
    // console.log('this.state.words :', this.state.words);
  }

  //get a new word
  newWord = () => {
    let word = random();
    let min = this.state.difficulty > 0 ? difficulty[this.state.difficulty - 1]: 1;
    let max = difficulty[this.state.difficulty];

    while (word.length > max || word.length < min)
        word = random();
    return ascii_replace.foldReplacing(_.lowerCase(word)).split("");
  }

  //add the letters played to the state
  addLetterToState = (letter) => {
    let playedLetters = _.clone(this.state.playedLetters);
    let tries = this.state.tries;
    playedLetters.push(letter);
    if (this.state.word.join("").indexOf(letter) === -1)
      tries++;
    this.setState({playedLetters: playedLetters, tries: tries});
  }

  //Virtual keyboard press
  onKeyPress = (letter) => {
    //have the letters been played?
    if (this.state.playedLetters.indexOf(letter) === -1)
      this.addLetterToState(letter);
  }

  //Real keyboard press
  handleKeypress = (e) => {
    let letter = _.toLower(e.target.value);
    //check if a letter is pressed
    if (this.state.tries < 8)
    {
      if (letter.match(/[a-z]/i))
      {
        if (this.state.playedLetters.indexOf(letter) === -1)
          this.addLetterToState(letter);
      }
      //check if a number is pressed
      if (!this.state.win && letter.match(/[0-2]/i))
      {
        this.setState({difficulty: parseInt(letter)});
      }
    }
    //restart if it's win or loose anyway
    if (this.state.win || this.state.loose)
      this.reset();
    e.target.value = "";
  }

  //restart a new game
  reset = () => {
    let cpyState = _.cloneDeep(this.basicState);
    cpyState.word = this.newWord();
    cpyState.difficulty = this.state.difficulty;
    this.setState(cpyState);
  }

  componentDidUpdate(prevProps, prevState) {
    //Every times something happen, check if it's win or not
    if (!this.state.win
      && this.state.word.every(letter => this.state.playedLetters.indexOf(letter) >= 0 || !letter.match(/[a-z]/))
      && this.state.word.length !== 0
    )
    {
      setTimeout(() => {
        this.setState({win: 1});
      }, 2000);
    }
    else if (!this.state.loose && this.state.tries === 8)
    {
      setTimeout(() => {
        this.setState({loose: 1});
      }, 3000);
    }
  
    if (this.state.difficulty !== prevState.difficulty)
      this.reset();
  }

  //get focus again on the input if it looses it
  refocus = (e) => {
    e.target.focus();
  }

  //handle the difficulty click
  changeDifficulty = (e) => {
    let difficulty = parseInt(e.target.value);
    if (difficulty !== this.state.difficulty)
    {
      this.setState({difficulty: difficulty});
    }
  }

  showHangman = (e) => {

  }

  render () {
    return (
      <div className="App">
        <div className="top">
          <h1>Le jeu du pendu</h1>
          <div className="items">
            <div className="info primary">Trouvez le mot !</div>
            <div className="info secondary">Vous pouvez utiliser le clavier virtuel ou votre clavier réel</div>
            <input
              onBlur={this.refocus}
              autoFocus={true}
              onChange={this.handleKeypress}
            />
            <div className="info">
              <div className="nbTries">
                { this.state.tries } lettres essayées :
                <div className="letterPlayed">
                  { _.toUpper(this.state.playedLetters.join(" ")) }
                </div>
              </div>
            </div>
          </div>
          <div className="items">
            <h2>Difficulté</h2>
            { difficulty.map((level, id) =>
                <button key={id} value={id} onClick={this.changeDifficulty}>
                  {id}
                </button>
              )
            }
          </div>
        </div>
        <div className="word">
         { this.state.word.map(letter => this.state.playedLetters.includes(letter) || !letter.match(/[a-z]/) ? letter + " " : "_ ").join("") }
          <HangMan tries={this.state.tries} />
        </div>
        <KeyboardHangMan
          onKeyPress={letter => this.onKeyPress(letter)}
          played={this.state.playedLetters}
        />
        {this.state.win ?
          <div className="win">
            <div className="message">Bravo vous avez gagné !</div>
            <div className="message secondary">Appuyez sur n'importe quelle touche pour continuer</div>
            <button onClick={this.reset}>Relancer une partie</button>
          </div>
          : ""
        }
        {
          this.state.loose ?
          <div className="loose">
            <div className="message">Désolé, vous avez perdu :/<br/>
              Le mot était {this.state.word}
            </div>
            <div className="message secondary">Appuyez sur n'importe quelle touche pour réessayer</div>
            <button onClick={this.reset}>Relancer une partie</button>
          </div>
          : ""
        }
      </div>
    );
  };
}

export default App;
