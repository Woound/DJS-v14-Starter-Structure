/**
Retrieves a list of file names in a given directory.
@param {string} directory - The directory path.
@param {boolean} foldersOnly - Optional parameter to indicate if only folders should be included in the list. Default is false.
@returns {Array} - An array containing the file names.
*/

const fs = require('fs'); // File system.
const path = require('path'); // Path module for working with directories and file paths.

module.exports = (directory, foldersOnly = false) => {
  let fileNames = [];

  // Read the contents of the directory synchronously and retrieve the file information.
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);

    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }

  return fileNames;
};
