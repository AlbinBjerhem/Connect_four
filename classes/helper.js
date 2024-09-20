
export class Helper {
  constructor() { }

  // Helper function to delay AI's move
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Shuffle an array (used for dumb AI)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
