const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Hello, type some text to save or "exit" to exit\n---');

rl.on('line', (line) => {
    if (line === 'exit'){
        goodBye()
        rl.close();
        return;
    }
    fs.writeFile("02-write-file/text.txt", line + '\n', {'flag': 'a'},() => {});
});

function goodBye(){
    console.log('---\nGood bye!');
}

if (process.platform === "win32") {
    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

process.on('SIGINT', () => {
    goodBye();
    process.exit();
});