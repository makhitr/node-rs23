import fs from "fs/promises";
import path from "path";

// import

export const up = (dir) => {
  // if (dir.slice(-1) === ":") return dir
  // const newPath = dir.slice(0, dir.lastIndexOf(path.sep));
  // return newPath
  return path.resolve(dir, '..')
};

//вынести отдельно helpers
const checkPath = (path) => true; //сделать имплементацию

// export const cd = (...args) => {
export const cd = (...args) => {
  const [newPath] = args;
  return path.resolve(newPath);
};

export const ls = async (input) => {
  try {
    const files = await fs.readdir(input, { withFileTypes: true });
    const result = files.sort().map((file) => {
      const type = file.isDirectory() ? "directory" : "file";
      return { Name: file.name, Type: type };
    });
    console.table(result);
  } catch (err) {
    console.error(err);
  }
};
