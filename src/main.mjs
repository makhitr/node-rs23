import readline from "node:readline/promises";
import os from "node:os";
import { nwd, bof, oss, zip } from "./commands/index.js";
import { COMMANDS } from "./helper.mjs";

export class App {
  constructor() {
    const args = process.argv.slice(2);
    this.userName = !args.length
      ? "Anonymous"
      : args[0].slice(args[0].indexOf("=") + 1);
    this.dir = os.homedir();
    this.currentDir = this.dir;
  }

  showDir() {
    console.log(`You are currently in ${this.currentDir}`);
  }

  greeting() {
    console.log(`Welcome to the File Manager, ${this.userName}!`);
  }

  exitMessage() {
    console.log(
      `Thank you for using File Manager,  ${this.userName}, goodbye!`
    );
  }

  makeReadline() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.prompt();

    rl.on("line", async (line) => {
      const [command, ...args] = line.split(" ");
      //  if ( !validateCommand(command) ) console.log("Unknown command")
      //validate Args

      switch (command) {
        case COMMANDS.UP: {
          this.currentDir = nwd.up(this.currentDir);
          this.showDir();
          break;
        }
        case COMMANDS.CD: {
          this.currentDir = await nwd.cd(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.LS: {
          await nwd.ls(this.currentDir);
          this.showDir();
          break;
        }
        case COMMANDS.CAT: {
          await bof.cat(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.ADD: {
          await bof.add(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.RN: {
          await bof.rn(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.CP: {
          await bof.cp(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.MV: {
          await bof.mv(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.RM: {
          await bof.rm(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.OS: {
          oss.oSystem(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.HASH: {
          hash.hash(...args);
          this.showDir();
          break;
        }
        case COMMANDS.COMPRESS: {
          await zip.compress(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.DECOMPRESS: {
          await zip.decompress(this.currentDir, ...args);
          this.showDir();
          break;
        }
        case COMMANDS.EXIT: {
          rl.close()
          this.exitMessage();
          break;
        }
        default:
          console.log("Invalid input");
          break;
      }
    });
    rl.on("close", () => {
      this.exitMessage();
      process.exit(0);
    });
  }

  start() {
    this.greeting();
    this.showDir();
    this.makeReadline();
  }
}
