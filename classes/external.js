export class External {
  constructor() {
    this.name = 'external'
  }

  async getMoveFromExternalAI(aiLevel = 1, board) {
    const serializedBoard = this.serializeBoard(board);  // Convert board to string format
    try {
      let response = await fetch(`https://ludolab.net/solve/connect4?level=${aiLevel}&position=${serializedBoard}`);
      console.log(response)
      let data = await response.json();

      let movesSortedByHowGood = data.sort((a, b) => a.score > b.score ? -1 : 1);
      return movesSortedByHowGood[0].move;
    } catch (error) {
      console.error('Error fetching external AI move:', error);
      return null;  // Handle error gracefully
    }
  }

  serializeBoard(board) {
    return board.map(row => row.map(cell => {
      if (cell.color === 'red') return 'r';
      if (cell.color === 'yellow') return 'y';
      return ' ';  // Empty cell
    }).join('')).join('');
  }
}