import fsp from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";

export const validateCommand = (command) => {
  const commandList = [
    "up",
    "ls",
    "cd",
    "cat",
    "add",
    "rn",
    "cp",
    "mv",
    "rm",
    "os",
    "hash",
    "compress",
    "decompress",
  ];
  return commandList.includes(command);
};

export const COMMANDS = {
  UP: "up",
  CD: "cd",
  LS: "ls",
  CAT: "cat",
  ADD: "add",
  RN: "rn",
  CP: "cp",
  MV: "mv",
  RM: "rm",
  OS: "os",
  HASH: "hash",
  COMPRESS: "compress",
  DECOMPRESS: "decompress",
  EXIT: ".exit",
};

export const existChecked = async (file) => {
  try {
    await fsp.access(file, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch {
    console.error("There is no such directory or file.\n Operation failed");
    return false;
  }
};

export const isFileChecked = async (path) => {
  const stats = await fsp.stat(path);
  if (!stats.isFile(path)) {
    console.log("It is not a file.\n Operation failed");
  } else return true;
};
