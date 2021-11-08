const fs = require('fs');
const path = require('path');
const promises = require('fs/promises');

let assetsFolder, assetsDist;
assetsFolder = path.join(__dirname, 'assets');
assetsDist = path.join(__dirname, 'project-dist/assets');
let templateFile, componentsPath;
templateFile = path.join(__dirname, 'template.html');
componentsPath = path.join(__dirname, 'components');


async function bundle(){
  let styleFiles = await promises.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true});
  for(let i = 0; i < styleFiles.length; i ++)
    if (!styleFiles[i].isFile() || path.extname(styleFiles[i].name) !== '.css')
      styleFiles.splice(i, 1);
  let styleBundle = '';
  for(let i = 0; i < styleFiles.length; i ++)
    styleBundle += await promises.readFile(path.resolve(__dirname, 'styles', styleFiles[i].name), 'utf8');
  promises.writeFile(path.resolve(__dirname, 'project-dist', 'style.css'), styleBundle);
};

async function copy(folderOld, folderCopy){
  await promises.mkdir(folderCopy, {recursive: true});
  let files = await promises.readdir(folderOld, {withFileTypes: true});
  for(let i = 0; i < files.length; i ++){
    if (files[i].isFile()){
      let fileOld = path.join(folderOld, files[i].name);
      let fileCopy = path.join(folderCopy, files[i].name);
      await promises.copyFile(fileOld, fileCopy);
    } else {
      copy(path.join(folderOld, files[i].name), path.join(folderCopy, files[i].name));
    }
  }
}

async function copyAssets(){
  await promises.rmdir(assetsDist, { recursive: true });
  await promises.mkdir(assetsDist, { recursive: true });
  copy(assetsFolder, assetsDist);
}

async function makeHTML(){
  let streamTemplate = fs.createReadStream(templateFile, "utf8");
  streamTemplate.on("data", function(chunk) { 
    template = chunk.toString();
    fs.readdir(componentsPath, function(err, components) {
      if (err)
        throw err;
      components.forEach(component => {
        let streamComponent = fs.createReadStream(path.join(componentsPath, component));
        streamComponent.on("data", function(chunk) {
          template = template.replace(`{{${component.slice(0, component.length - 5)}}}`, chunk);
          fs.writeFile(path.join(path.join(__dirname, 'project-dist'), 'index.html'), template, () => {});
        });
      });
    });
  });
}

copyAssets();
bundle();
makeHTML();