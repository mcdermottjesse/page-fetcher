
/*const args = process.argv.slice(2);
const url = args[0];
const path = args[1]; */

const request = require('request');
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const args = process.argv.slice(2);
const url = args[0];
const path = args[1];

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) { 
      fs.writeFile(path, body, (err) => {
        if (err) throw err;
        console.log((`Downloaded and saved ${body.length} bytes to ${path}`))
    });
    } else {
    rl.question('The file already exists would you like to overwrite y/n?\n', (answer) => {
      //console.log(answer)
      if (answer === 'y') {
        fs.writeFile(path, body, (err) => {
          if (err) throw err;
          console.log(`Downloaded and saved ${body.length} bytes to ${path}`)
        }); 
      } else {
        console.log("Try a different directory")
      }
      rl.close();
    });
  }
});
});

       //console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML page
  //console.log('dir:', dir)

  //> node fetcher.js http://www.example.edu/ ./index.html


  //What should happen if the local file path given is invalid?