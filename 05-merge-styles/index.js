const promises = require('fs/promises');
const path = require('path');

async function bundle(){
  let styleFiles = await promises.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true});
  for(let i = 0; i < styleFiles.length; i ++)
    if (!styleFiles[i].isFile() || path.extname(styleFiles[i].name) !== '.css')
      styleFiles.splice(i, 1);
  let styleBundle = '';
  for(let i = 0; i < styleFiles.length; i ++)
    styleBundle += await promises.readFile(path.resolve(__dirname, 'styles', styleFiles[i].name), 'utf8');
  promises.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), styleBundle);
};

bundle();