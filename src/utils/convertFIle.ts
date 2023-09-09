import * as readline from 'readline/promises';
import { Readable } from 'stream';

async function convertFile (buffer: Buffer): Promise<string[][]> {
  const readableFile = new Readable();

  readableFile.push(buffer);
  readableFile.push(null);

  const fileLines = readline.createInterface({input: readableFile});

  const arrLines = [];

  // On
  for await(const line of fileLines) {
    arrLines.push(line.split(','));
  }

  return arrLines;
}

export default convertFile;
