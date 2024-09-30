import { Helper } from "./helper";

export class External {
  constructor(level = 1) {
    this.name = 'external';
    this.type = 'external';
    this.helper = new Helper();
    this.level = level;
  }

  async getMoveFromExternalAI(state) {
    await this.helper.sleep(1000);
    let response = await (await fetch('/solve/connect4?level=' + this.level + '&position=' + state)).json();
    return response[0].move - 1;
  }
}