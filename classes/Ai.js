import { Rules } from './Rules.js';  // Se till att Rules.js är korrekt importerat

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
    const legalMoves = this.legalMoves();
    return shuffleArray(legalMoves)[0]; // Välj ett slumpmässigt drag från giltiga drag
  }

  // Strategiskt val för den smarta AI:n
  makeSmartBotMove() {
    const legalMoves = this.legalMoves();

    // 1. Försök att vinna om möjligt
    for (let col of legalMoves) {
      const tempBoard = JSON.parse(JSON.stringify(this.board.grid));  // Kopiera brädet
      const move = this.board.placePiece(col, this.color);  // Temporärt dra AI:s färg i kolumnen

      if (move && Rules.checkWin(this.board, this.color, move.row, move.col)) {
        this.board.grid = tempBoard;  // Återställ brädet
        return col;  // Om detta drag leder till vinst, välj det draget
      }

      this.board.grid = tempBoard;  // Återställ brädet om draget inte leder till vinst
    }

    // 2. Blockera motståndarens vinstmöjligheter
    for (let col of legalMoves) {
      const tempBoard = JSON.parse(JSON.stringify(this.board.grid));  // Kopiera brädet
      const move = this.board.placePiece(col, this.opponent);  // Temporärt dra motståndarens färg i kolumnen

      if (move && Rules.checkWin(this.board, this.opponent, move.row, move.col)) {
        this.board.grid = tempBoard;  // Återställ brädet
        return col;  // Om detta drag leder till att motståndaren vinner, blockera det draget
      }

      this.board.grid = tempBoard;  // Återställ brädet om draget inte leder till motståndares vinst
    }

    // 3. Om inget drag leder till vinst eller blockering, välj ett slumpmässigt drag
    return shuffleArray(legalMoves)[0];
  }

  // Returnerar alla möjliga drag (kolumner som inte är fulla)
  legalMoves() {
    let moves = [];
    for (let col = 0; col < this.board.cols; col++) {
      if (!this.board.isColumnFull(col)) {
        moves.push(col);  // Lägg till kolumnen om den inte är full
      }
    }
    return moves;
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