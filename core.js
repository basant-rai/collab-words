import readline from "readline";
import { text } from "stream/consumers";

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

class Scenes {
  constructor(id, text, choices) {
    this.id = id;
    this.text = text;
    this.choices = choices; // array of { text: "...", nextScene: "scene2" }
  }
}


class GameEngine {
  constructor(scenes) {
    this.scenes = scenes;
    this.currentScene = "scene1";
    this.health = 10
    this.visual = null
  }

  start() {
    console.log(`Your health is ${this.health}`)
    this.showScene(this.currentScene);
  }

  showEffect(visual) {
    this.visual = visual;
    console.log(`Effect: ${this.visual}`)
  }
  showHealth(health) {
    this.health += health;
    console.log(`Your health is ${this.health}`)
  }

  showScene(id) {
    const scene = this.scenes[id];
    console.log(scene.text);

    if (scene?.effect?.visual) {
      this.showEffect(scene.effect.visual)
    }
    if (scene?.effect?.health) {
      this.showHealth(scene.effect.health)
    }
    if (!scene.choices.length) {
      console.log("Game Over!");
      process.exit();
    }

    scene.choices.forEach((choice, i) => {
      console.log(`${i + 1}. ${choice.text}`);
    });

    rl.question("Choose an option: ", (answer) => {
      const index = Number(answer) - 1;
      if (index >= 0 && index < scene.choices.length) {
        this.currentScene = scene.choices[index].nextScene;
        this.showScene(this.currentScene);
      } else {
        console.log("Invalid choice, try again.");
        this.showScene(this.currentScene);
      }
    });
  }

}

// Scenes
const scenes = {
  scene1: {
    text: "Jungle Entrance",
    choices: [
      { text: "Enter the jungle", nextScene: "scene2" },
      { text: "Search the area for equipment", nextScene: "scene3" }
    ]
  },
  scene2: {
    text: "You walk deeper into the jungle. A snake drops from a tree",
    choices: [
      {
        text: "Fight the snake with a stick (need Stick)",
        nextScene: "scene3"
      },
      {
        text: "Run away",
        nextScene: "scene5"
      }
    ]
  },
  scene3: {
    text: "You find an old backpack with a Stick and Health Potion.",
    effect: {
      visual: `Add "Stick" to inventory, Add "Potion" to inventory.`
    },
    choices: [
      {
        text: "Enter the jungle ",
        nextScene: "scene2"
      },
    ]
  },
  scene4: {
    text: "You use the stick to fend off the snake. It slithers away.",
    choices: [
      {
        text: "Continue forward",
        nextScene: "scene6"
      },
    ]
  },
  scene5: {
    text: "You run but the snake bites you on the leg. ",
    effect: {
      health: -5
    },
    choices: [
      {
        text: "Run again",
        nextScene: "scene10"
      },
      {
        text: "Fight",
        nextScene: "scene11"
      },
    ]
  },
  // 
  scene6: {
    text: "You reach the massive gates of the Lost Temple. The doors are sealed.",
    choices: [
      {
        text: "Use your strength to push the doors",
        nextScene: "scene7"
      },
      {
        text: "Search for another way in",
        nextScene: "scene8"
      },
    ]
  },
  scene7: {
    text: "You reach the massive gates of the Lost Temple. The doors are sealed.",
    choices: [
      {
        text: "Use your strength to push the doors",
        nextScene: "scene12"
      },
      {
        text: "Search for another way in",
        nextScene: "scene8"
      },
    ]
  },
  scene8: {
    text: "You find a small tunnel behind vines.",
    choices: [
      {
        text: "Enter the tunnel",
        nextScene: "scene9"
      },
    ]
  },
  scene9: {
    text: "You enter a golden chamber filled with treasures.",
    choices: [
      {
        text: "Take the treasure and leave",
        // nextScene: "scene9"
      },
      {
        text: "Search for secret artifacts (need Potion)",
        // nextScene: "scene9"
      },
    ]
  },
  scene10: {
    text: "You run again but the snake bites you on the leg. You collapse and the jungle swallows you.",
    effect: {
      health: -10
    },
    choices: []
  },
  scene11: {
    text: "You found stick and defeat snake",
    effect: {
      visual: "You ate snake as dinner"
    },
    choices: [
      {
        text: "Continue forward",
        nextScene: "scene6"
      }
    ]
  },
  scene12: {
    text: "You feel off the clip ",
    choices: [

    ]
  }
};

// Node readline setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = new GameEngine(scenes);
game.start();
