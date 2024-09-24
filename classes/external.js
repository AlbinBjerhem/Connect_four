import { Helper } from "./helper";

export class External {
  constructor() {
    this.name = 'external'
    this.helper = new Helper()
  }

  async getMoveFromExternalAI(aiLevel = 1, state) {
    await this.helper.sleep(1000);
    let response = await (await fetch('/solve/connect4?level=' + aiLevel + '&position=' + state)).json();
    console.log("ai level: " + aiLevel + " state: " + state)

    let movesSortedByHowGood = response.sort((a, b) => a.score > b.score ? -1 : 1);

    return movesSortedByHowGood[0].move - 1;
  }
}