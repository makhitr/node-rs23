const { createHash } = await import('node:crypto');

export const hash = (pathToFile) => {
  const hash = createHash('sha256');
  hash.update(pathToFile)
  console.log(`Hash of file is ${hash.digest('hex')}`)
}



