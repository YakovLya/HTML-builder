const path = require('path');
const promises = require('fs/promises');

let assetsFolder, assetsDist;
assetsFolder = path.join(__dirname, 'files');
assetsDist = path.join(__dirname, 'files-copy');

async function copy(folderOld, folderCopy){
  await promises.mkdir(folderCopy, {recursive: true});
  let files = await promises.readdir(folderOld);
  for(let i = 0; i < files.length; i ++){
    let fileOld = path.join(folderOld, files[i]);
    let fileCopy = path.join(folderCopy, files[i]);
    await promises.copyFile(fileOld, fileCopy);
  }
}

async function copyFiles(){
  await promises.rmdir(assetsDist, { recursive: true });
  await promises.mkdir(assetsDist, { recursive: true });
  copy(assetsFolder, assetsDist);
}

copyFiles();