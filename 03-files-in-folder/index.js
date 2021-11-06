const fs = require('fs');
const path = require('path');
const promises = require('fs/promises');

async function informationAboutFile(folder, file){
  let fileType = path.extname(file);
  let fileName = path.basename(file, fileType);
  let filePath = path.join(folder, file);
  let fileSize = (await promises.stat(filePath)).size;
  let sizeKB = Math.ceil((fileSize / 1024) * 1000) / 1000;
  console.log(`${fileName} - ${fileType.slice(1)} - ${sizeKB}kb`);
};

async function readInfo(folder){
  const files = await promises.readdir(folder, {withFileTypes: true});
  for(let i = 0; i < files.length; i ++)
    if (files[i].isFile()) 
      informationAboutFile(folder, files[i].name);
}

readInfo(path.join(__dirname, 'secret-folder'));