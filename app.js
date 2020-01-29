const fs = require('fs');
const Path = require('path');

const allowedFolders = ['fonts'];

const rimraf = function(dir_path) {
  if (fs.existsSync(dir_path)) {
      fs.readdirSync(dir_path).forEach(function(entry) {
          var entry_path = Path.join(dir_path, entry);
          if (fs.lstatSync(entry_path).isDirectory()) {
              rimraf(entry_path);
          } else {
              fs.unlinkSync(entry_path);
          }
      });
      fs.rmdirSync(dir_path);
  }
}

const deleteFolderRecursive = function(path) {
 
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
        const curPath = Path.join(path, file);
         if (fs.lstatSync(curPath).isDirectory()) { // recurse
            const splitedDir = curPath.split('\\');
            const folderName = splitedDir[splitedDir.length - 1];
            if(allowedFolders.indexOf(folderName) <= -1) {
              rimraf(curPath);
            }
         }
        });
    });
};


const testFolder = './test';

deleteFolderRecursive(testFolder);

 
