class Character {
  constructor(name, health) {
    this.name = name,
      this.health = health
  }
  speak(text) {
    console.log(`${this.name}: ${text}`);
  }
}

class Hero extends Character {
  constructor(name, health) {
    super(name, health);
    this.inventory = [];
  }
  addItem(item) {
    this.inventory.push(item)
  }
}

class Scene {
  constructor(id, text, choices) {
    this.id = id;
    this.text = text;
    this.choices = choices; // array of { text: "...", nextScene: "scene2" }
  }
}


class GameEngine {
  constructor(scenes) {
    this.scenes = scenes;
    this.currentScene = "scene1"
  }

  start() {
    this.sce
  }

  showScene(id) {
    const scene = this.scenes[id];
    console.log(scene.text)
    scene.choices.forEach((choice, index) => {
      console.log(`${index + 1}. ${choice.text}`);
    })
  }
  makeChoice(choiceIndex) {
    const scene = this.scenes[this.currentScene];
    this.currentScene = scene.choices[choiceIndex].nextScene;
    this.showScene(this.currentScene);
  }
}


const scenes = {
  scene1: new Scene("scene1", "You wake up in a dark forest.", [
    { text: "Walk forward", nextScene: "scene2" },
    { text: "Climb a tree", nextScene: "scene3" }
  ]),
  scene2: new Scene("scene2", "You find a cave. It's dark inside.", [
    { text: "Enter the cave", nextScene: "scene4" },
    { text: "Go back", nextScene: "scene1" }
  ]),
  scene3: new Scene("scene3", "You see a village far away.", [
    { text: "Go to the village", nextScene: "scene5" }
  ]),
};


const game = new GameEngine(scenes);
game.start(); // Starts at scene1
game.makeChoice(0);