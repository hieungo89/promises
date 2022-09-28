/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
let db = Promise.promisifyAll(require('./promisification.js'));

Promise.promisifyAll(fs);

var nodeStyle = require('./callbackReview.js');
var pluckFirstLineFromFileAsync = Promise.promisify(nodeStyle.pluckFirstLineFromFile)
var getStatusCodeAsync = Promise.promisify(nodeStyle.getStatusCode)
var pWrite = Promise.promisify(fs.writeFile)

var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  console.log('readFilePath = ', readFilePath)
  console.log('writeFilePath = ', writeFilePath)

  // look for the person in the readFilePath
  // do a get request with the name from the file
  // write the data received to the file path given

  return pluckFirstLineFromFileAsync(readFilePath)
    .then((name) => {
      return db.getGitHubProfileAsync(name);
    })
    .then((data) => {
      let stringData = JSON.stringify(data)
      return pWrite(writeFilePath, stringData);
    })
    .catch((error) => {
      throw (error);
    })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
