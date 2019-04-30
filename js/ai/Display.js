class Display {

  constructor() {
    this.show = true;
  }

  update(geneticAlgorithm, population) {
    if (!this.show) {
      return;
    }

    this.drawBox();

    textSize(18);
    fill(255, 255, 255);
    noStroke();
    textAlign(LEFT, BASELINE);

    textStyle(BOLD);
    text('Generation: ' + geneticAlgorithm.iteration, 910, 40);

    textStyle(NORMAL);
    text('Best generation: ' + geneticAlgorithm.bestPopulation, 910, 60);
    text('Best fitness: ' + _.floor(geneticAlgorithm.bestFitness, 4), 910, 80);

    population.players.forEach((player, i) => {
      fill(player.color);
      stroke(80, 80, 80);

      if (player.alive()) {
        rect(910, 120 + i * 20 - 12, 10, 10);
      }

      fill(255, 255, 255);
      noStroke();
      text('Player ' + i.toString().padStart(2, "0") + ' fitness: ' + _.floor(player.fitness, 4), 930, 120 + i * 20);
    });

    textSize(14);
    text('Press "r" to toggle rendering', 910, 558);
    text('Press "d" to toggle this window', 910, 575);
    
    let samplePlayer = null;
    let samplePlayerIndex = null;

    for (let i = 0; i < population.players.length; i++) {
      if (samplePlayer == null && population.players[i].alive()) {
        samplePlayer = population.players[i];
        samplePlayerIndex = i;
        break;
      }
    }

    if (samplePlayer != null && samplePlayer.latestInputs != null) {
      textSize(12);
      text('Latest NN inputs for player ' + samplePlayerIndex + ':', 910, 460);

      for (let i = 0; i < samplePlayer.latestInputs.length; i++) {
        let value = _.floor(samplePlayer.latestInputs[i], 4);
        text('Input ' + i + ': ' + value, 920, 480 + i * 13);
      }
    }
  }

  drawBox() {
    fill(color(70, 70, 70, 230));
    stroke(255, 255, 255);
    rect(900, 10, 290, 580);
  }

}
