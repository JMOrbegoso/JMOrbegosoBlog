import { existsSync, unlinkSync, writeFileSync } from 'fs';

export function writeFile(filePath: string, fileContent: string) {
  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    writeFileSync(filePath, fileContent);
    console.info(`${filePath} file successfully created`);
  } catch (error) {
    console.info(
      `Could not generate the ${filePath} file or the previous file could not be deleted`,
    );
  }
}
