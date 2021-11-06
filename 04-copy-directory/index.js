const path = require('path');
const promises = require('fs/promises');

let folderOld = path.join(__dirname, 'files');
let folderCopy = path.join(__dirname, 'files-copy');

async function copy(){
  await promises.mkdir(folderCopy, {recursive: true});
  let files = await promises.readdir(folderOld);
  for(let i = 0; i < files.length; i ++){
    let fileOld = path.join(folderOld, files[i]);
    let fileCopy = path.join(folderCopy, files[i]);
    await promises.copyFile(fileOld, fileCopy);
  }
  console.log('Copy - Success.');
}

copy();