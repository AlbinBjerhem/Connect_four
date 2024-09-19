export class Ai {
  constructor(type, board) {
    this.name = "AI"; // Namnet på AI-spelaren
    this.type = type; // AI-nivå: 'dumb' (enkel) eller 'smart' (svår)
    this.board = board; // Hänvisning till spelets bräda
    this.color = 'yellow'; // Standardfärg för AI:s brickor
    this.opponent = 'red'; // Motståndarens färg
  }

  // Simulerar AI-draget med en kort fördröjning för att efterlikna tänketid
  async makeBotMove() {
    await sleep(500); // Fördröjning på 500ms
    let column;

    // Om AI:n är enkel ("dumb"), välj ett slumpmässigt drag
    if (this.type === 'dumb') {
      column = this.makeDumbBotMove();
    }

    // Om AI:n är svår ("smart"), välj ett strategiskt drag
    if (this.type === 'smart') {
      column = this.makeSmartBotMove();
    }

    return column;
  }

  // Slumpmässigt val av drag för den enkla AI:n
  makeDumbBotMove() {
    return shuffleArray(this.legalMoves)[0]; // Välj ett slumpmässigt drag från giltiga drag
  }

  // Strategiskt val för den smarta AI:n
  makeSmartBotMove() {
    // orgState - the current state on the board
    let orgState = this.state();
    // store scores for each possible move in scores
    let scores = [];
    // loop through/try each legal/possible move
    for (let [row, column] of this.legalMoves) {
      let cell = this.board.matrix[row][column];
      cell.color = this.color; // make temporary move
      let futureState = this.state(); // the state if we made this move
      cell.color = ' '; // undo temporary move
      // remember the score for this possible move
      scores.push({ row, column, score: this.score(orgState, futureState) });
    }
    scores = shuffleArray(scores).sort((a, b) => a.score > b.score ? -1 : 1);
    let { row, column } = scores[0];
    return [row, column];
  }

  score(orgState, futureState) {
    // priorities - what is considered the best outcome in each winCombo
    let priorities = [
      { me: 3 }, { opp: 2 }, { opp: 1 }, { me: 2 }, { me: 1 }
    ];
    // score variable - which we will use to calculate a score
    let score = 0;
    // loop through each part of the states, corresponding to a winCombo
    for (let i = 0; i < orgState.length; i++) {
      // short aliases for each orgState and futureState part
      // b - before/orgState, a - after/futureState
      let b = orgState[i], a = futureState[i];
      // no change in winCombo - not interesting
      if (b.me === a.me && b.opp === a.opp) { continue; }
      // winCombo can't be won be either player (both already have pieces in place)
      if (b.me > 0 && b.opp > 0) { continue; }
      // there has been change in this winCombo, so I must have added a piece
      let partScore = '';
      // partScore is how good are move is for ONE winCombo
      // partScore will become number of different priorities x 2 long
      // initially it is a string, but we will convert to a number before
      // adding to the total score
      for (let j = 0; j < priorities.length; j++) {
        let key = Object.keys(priorities[j])[0];
        let value = priorities[j][key];
        if (a[key] === value) { partScore += '01'; }
        else { partScore += '00'; }
      }
      score += +partScore;
    }

    // (the scoreing works well in Tic-Tac-Toe
    // but in Connect 4 it misses that what it considers the best move (highest score)
    // will sometimes give the opponent an opportunity to win by playing the same column
    // (ie. directly "above") the chosen move
    // you can avoid this by trying to play an opponent move in the same column
    // and if that gives a win set score to negative - 1)

    return score;
  }

  get legalMoves() {
    // which cells are free to choose?
    // (in Connect-4 this would be a check of which columns that are not full instead)
    let moves = [];
    for (let row = 0; row < this.board.grid.length; row++) {
      for (let column = 0; column < this.board.grid[0].length; column++) {
        if (this.board.grid[row][column].color === ' ') {
          moves.push([row, column]);
        }
      }
    }
    return moves;
  }

  state() {
    let state = [];
    for (let winCombo of this.board.winChecker.winCombos) {
      state.push({
        me: winCombo.numberOfCells(this.color),
        opp: winCombo.numberOfCells(this.opponent)
      });
    }
    return state;
  }
}

// Hjälpfunktion för att fördröja AI:s drag
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Funktion för att blanda om en array (används för att välja slumpmässiga drag för dumb AI)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}