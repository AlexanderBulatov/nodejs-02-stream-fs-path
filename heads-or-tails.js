console.clear();
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;

const fs = require('fs');
const path = require('path');


function parsArgv(argv) {
  return argv._[0];
}


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};



let recursiveAsyncReadLine = function () {

  rl.question('Lets PLAY! press any keys for continue (or n for exit): ', function (answer) {
    if (answer === 'n') {
      console.log('Game session over');
      fs.appendFile(file, JSON.stringify(dataLog), (err)=>{
        if (err) console.log(err);
          console.log('write ok');
        })
      console.log(dataLog);
      return rl.close();
    }
    else {
      let headsTails = getRandomInt(1, 3);

      rl.question(`Try to guess! /spoiler -  ${headsTails}/: `, (answer) => {
        if (Number(answer) === headsTails) {
          console.log('you win!');
          dataLog.gameResult[dataLog.gameResult.length] = 'win';
        }
        else {
          console.log('you lose :-(');
          dataLog.gameResult[dataLog.gameResult.length] = 'lose';
        }
        recursiveAsyncReadLine();
        
      });

    }
  });

};
let dt = new Date();
let dataLog = {};
const file = path.join(__dirname, 'log', `${parsArgv(argv).split('.')[0]}.log`);
dataLog.date = dt.toLocaleDateString() + ' | ' + dt.toLocaleTimeString();
dataLog.gameResult = [];

fs.mkdir('log', (err) => {
  if (err.code === 'EEXIST' || !err) {

    console.log(`Данные этой сессии будут сохранены в файле ${file}`);
    recursiveAsyncReadLine();
  } else {
    console.log('Something wrong! Folder log have not created', err.code);
    rl.close();
  }

});