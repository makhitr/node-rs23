import path, { dirname } from "path";
import os, { homedir } from "os";
import { fileURLToPath } from "url";
import { up, ls, cd } from "./commands/nwd.js";
import { cat, add, rn, cp, mv, rm } from "./commands/bof.js";
import { oSystem } from "./commands/os.js";
import { hash } from "./commands/hash.js";
import { compress, decompress } from "./commands/zip.js";
// import { stdin, stdout, argv } from 'process';

import readline from "readline";

const args = process.argv.slice(2);

const userName = !args.length
  ? "Anonymous"
  : args[0].slice(args[0].indexOf("=") + 1);
// проверку, что пришло, какие знаки

// console.log(`Welcome to the File Manager, ${userName}!`);

// на завершение процесса, нужно его еще начать
// console.log(`Thank you for using File Manager,  ${userName}, goodbye!`);

// process.on('exit', () => console.log(`Thank you for using File Manager,  ${userName}, goodbye!`))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = os.homedir();
let currentDir = dir;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Welcome to the File Manager, ${userName}!`, () => {});
// rl.write(`Welcome to the File Manager, ${userName}!`);
rl.prompt();
rl.on("line", async (line) => {
  const [command, ...args] = line.split(" ");

  switch (command) {
    case "up": {
      currentDir = up(currentDir);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "ls": {
      ls(currentDir);
      // ls(dirname)
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "cd": {
      currentDir = await cd(...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "cat": {
      cat(currentDir, ...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "add": {
      add(currentDir, ...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "rn": {
      rn(currentDir, ...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "cp": {
      cp(...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "mv": {
      mv(currentDir, ...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "rm": {
      rm(currentDir, ...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "os": {
      oSystem(...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "hash": {
      hash(...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "compress": {
      compress(...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    case "decompress": {
      decompress(...args);
      console.log(`You are currently in ${currentDir}`);
      break;
    }
    // currentDir

    default:
      console.log("Unknown command");
      break;
  }
  rl.prompt();
}).on("close", () => {
  console.log(`Thank you for using File Manager,  ${userName}, goodbye!`);
  process.exit(0);
});

// console.log(`You are currently in ${dir}`);
