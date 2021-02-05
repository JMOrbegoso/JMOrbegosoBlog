import { readdirSync, existsSync, unlinkSync, writeFileSync } from 'fs';
import { DirectoryType } from '../enums/directoryType';
import { join } from 'path';

export const rootDirectory = (directoryType: DirectoryType) =>
  join(
    process.cwd(),
    directoryType === DirectoryType.Author ? '_author' : '_posts',
  );

export const localeDirectory = (directoryType: DirectoryType, locale: string) =>
  join(
    process.cwd(),
    directoryType === DirectoryType.Author ? '_author' : '_posts',
    locale,
  );

export const getSubDirectories = (directory: string) =>
  readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const getResourcesFileNames = (
  directoryType: DirectoryType,
  locale: string,
) => readdirSync(localeDirectory(directoryType, locale));

export const getfileNamesByLocale = (directoryType: DirectoryType) => {
  return getSubDirectories(rootDirectory(directoryType)).map(
    (locale: string) => {
      const fileNames = getResourcesFileNames(directoryType, locale);

      return {
        locale: locale,
        fileNames: fileNames,
      };
    },
  );
};

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
