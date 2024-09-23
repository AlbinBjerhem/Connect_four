export class External {
  constructor() {
    this.name = 'external'
  }

  async getMoveFromExternalAI(aiLevel, state) {
    let response = await (await fetch('https://ludolab.net/solve/connect4?level=' + aiLevel + '&position=' + state)).json();
    let movesSortedByHowGood = response.sort((a, b) => a.score > b.score ? -1 : 1);
    return movesSortedByHowGood[0].move;
  }

}