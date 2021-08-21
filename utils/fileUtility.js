const fs = require('fs-extra');
const  path = require('path');
let timeUtility = require("./timeUtility.js");
// source : https://www.npmjs.com/package/fs.extra


function movefiletToDestination(source, filename, destination) {

    try {
        let currentFolder = process.cwd();

        fs.move("./" + source, currentFolder + '/' + destination + '/' + filename, function (err) {
            if (err) {
                return console.error("movefiletodestination  " + err);
            }
            console.log("file uploaded!")
          
        });
    } catch (err) {
        throw err;
    }
}

function CopyFile(sourcePath, sourcefile, destinationPath, destinationfile, IsReplace = false) {
    try {
        let currentFolder = process.cwd();
        fs.copy(
            currentFolder + sourcePath + "/" + sourcefile,
            destinationPath + destinationfile + "/" + sourcefile,
            { replace: IsReplace }, function (err) {
                if (err) {
                    // i.e. file already exists or can't write to directory
                    errorLogger.error(` CopyFile Error Message : ${err}`);
                    throw err;
                }

                console.log("Copied 'foo.txt' to 'bar.txt'");
            });
    } catch (err) {
        throw err;
    }
}

function fileList(dir) {
    return fs.readdirSync(dir).reduce(function(list, file) {
      var name = path.join(dir, file);
      var isDir = fs.statSync(name).isDirectory();
      return list.concat(isDir ? fileList(name) : [name]);
    }, []);
  }

exports.fileList = fileList;
exports.movefiletToDestination = movefiletToDestination;
exports.CopyFile = CopyFile;
