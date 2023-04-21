import path from 'path';
import fsp from "fs/promises";
import fs from 'fs';


export const cat = async (dir, filePath) => {
  // надо ли проверять на наличие такого файла?
  //являетя ли он файлом а не директорией
  const file = path.join(dir, filePath)
  console.log(file)
  try {
    const data = await fsp.readFile(file, { encoding: 'utf8' });
    console.log(data)
  } catch (err) {
    console.error(err);
  }
};

export const add = async (dir, fileName) => {
  try {
    const file = path.join(dir, fileName)
    await fsp.writeFile(file, '', { flag: "ax+" })
  } catch (err) {
    console.error(err);
  }
};

export const rn = async (dir, ...args) => {
  const [oldFileName, newFileName] = args
  const oldFile = path.join(dir, oldFileName)
  const newFile = path.join(dir, newFileName)
  try {
    await fsp.rename(oldFile, newFile)
  } catch (err) {
    console.error(err);
  }
}

export const cp = async (...args) => {
  //убирать лишние пробелы
  const [originalFile, pathToFolder] = args
  // const fileName = pathToFolder.slice(pathToFolder.lastIndexOf('\\'))
  // // const originalFile = path.join(dir, pathToFile)
  // const copiedFile = path.join(pathToFolder, pathToFile)

  try {
    const readable = fs.createReadStream(originalFile);
    const writable = fs.createWriteStream(copiedFile);
    readable.pipe(writable)
  }
  catch (err) {
    console.log(err.message)
  }
}

export const mv = async (dir, ...args) => {
  //убирать лишние пробелы
  const [pathToFile, pathToFolder] = args

  const originalFile = path.join(dir, pathToFile)
  const copiedFile = path.join(pathToFolder, pathToFile)
  await cp(dir, ...args)
  fs.rm(originalFile, { recursive: true, force: true }, (error) => error && console.log(error.message))
  // try {
  //   const readable = fs.createReadStream(originalFile);
  //   const writable = fs.createWriteStream(copiedFile);
  //   readable.pipe(writable)
  //   // writable.on('finish', () => fs.rm(originalFile))
  //   // fs.rm(originalFile)
  //   // fs.rm(originalFile)
  // } catch (err) {
  //   console.log(err.message)
  // }

}

// await read();

export const rm = (dir, filePath) => {
  //убирать лишние пробелы
  const file = path.join(dir, filePath)
  fs.rm(file, { recursive: true, force: true }, (error) => error && console.log(error.message))
}
