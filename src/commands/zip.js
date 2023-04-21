// const { createGzip } = require('zlib');
// const { pipeline } = require('stream');
// const {
//   createReadStream,
//   createWriteStream,
// } = require('fs');

// export const compress = () => {

//   const source = createReadStream('input.txt');
//   const destination = createWriteStream('input.txt.gz');
//   const brot = zlib.createBrotliCompress();
//   source.pipe(brot).pipe(destination);
//   console.log("Program Completed!");
// }




// pipeline(source, gzip, destination, (err) => {
//   if (err) {
//     console.error('Произошла ошибка:', err);
//     process.exitCode = 1;
//   }
// });

import zlib from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';

export const compress = (...args) => {
  const [pathToFile, pathToDestination] = args
  const brot = zlib.createBrotliCompress();
  const source = createReadStream(pathToFile);
  const destination = createWriteStream(pathToDestination);

  pipeline(source, brot, destination, (err) => {
    if (err) {
      console.error('Произошла ошибка:', err);
      process.exitCode = 1;
    }
  })
}

export const decompress = (...args) => {
  const [pathToFile, pathToDestination] = args
  const brot = zlib.createBrotliDecompress();
  const source = createReadStream(pathToFile);
  const destination = createWriteStream(pathToDestination);

  pipeline(source, brot, destination, (err) => {
    if (err) {
      console.error('Произошла ошибка:', err);
      process.exitCode = 1;
    }
  })
}
