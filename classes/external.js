import { Helper } from "./helper";

export class External {
  constructor() {
    this.name = 'external'
    this.type = 'external'
    this.helper = new Helper()
  }

  async getMoveFromExternalAI(aiLevel = 1, state) {
    await this.helper.sleep(1000);
    let response = await (await fetch('/solve/connect4?level=' + aiLevel + '&position=' + state)).json();

    let movesSortedByHowGood = response.sort((a, b) => a.score > b.score ? -1 : 1);

    return movesSortedByHowGood[0].move - 1;
  }
}