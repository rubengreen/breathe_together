require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const simpleGit = require('simple-git');

const token = process.env.TOKEN;

// Created instance of TelegramBot
const bot = new TelegramBot(token, {
    polling: true
});

// In-memory storage
const URLs = [];
const URLLabels = [];
let tempSiteURL = '';

//function to add a message to the webpage
const fs = require('fs');

function updatePage (user, message) {
  let date_ob = new Date();
  var time = ("0" + (date_ob.getHours())).slice(-2) + ":" + ("0" + (date_ob.getMinutes())).slice(-2);
  var para = "\n<p>" + message + "<br/><span class=timestamp>" + user + " - " + time + "</span></p>"
  fs.appendFile(__dirname + '../content.html', para, (err) => {
      if (err) throw err;
      console.log('The page was updated!');
  });
  simpleGit
}

//add a text message
bot.on('text', (msg) => {
  let username = msg.from.first_name;
  updatePage(username, msg.text);
});

//add photo message
bot.on('photo', (msg) => {
  let date_ob = new Date();
  let username = msg.from.first_name;
  let newFilename = ("0" + date_ob.getDate()).slice(-2) + ("0" + (date_ob.getMonth() + 1)).slice(-2) + date_ob.getFullYear() + "-" + ("0" + (date_ob.getHours())).slice(-2) + ("0" + (date_ob.getMinutes())).slice(-2) + ("0" + (date_ob.getSeconds())).slice(-2) + "_" + username; //create new file name to change downloaded file to
  let newPath =  __dirname + "../media/img/" + newFilename + ".jpg";
  let imgCode = '<img src="media/img/' + newFilename + '.jpg"/>';

  function whenDownloaded(filePath) {  //function to run when image sucessfully downloaded - filePath is the path to the file
    fs.rename(filePath, newPath, function(err) { //rename photo
      if ( err ) console.log('ERROR: ' + err);
    });
    if (msg.caption == undefined) { //append caption if there is one
      updatePage(username, imgCode);
    } else {
      updatePage(username, imgCode + "<br/>" + msg.caption);
    }
  }

  let pSize = msg.photo;
  let photoId = pSize[pSize.length - 1].file_id; //get id of largest photo size

  const dlPromise = bot.downloadFile(photoId, __dirname + '../media/img'); //save photo and create Promise dlPromise
  dlPromise.then(whenDownloaded)
});

//add voice memo message
bot.on('voice', (msg) => {
  let date_ob = new Date();
  let username = msg.from.first_name;
  let newFilename = ("0" + date_ob.getDate()).slice(-2) + ("0" + (date_ob.getMonth() + 1)).slice(-2) + date_ob.getFullYear() + "-" + ("0" + (date_ob.getHours())).slice(-2) + ("0" + (date_ob.getMinutes())).slice(-2) + ("0" + (date_ob.getSeconds())).slice(-2) + "_" + username; //create new file name to change downloaded file to
  let newPath =  __dirname + "../media/sound/" + newFilename + ".ogg";
  let soundCode = '<audio controls><source src="media/sound/' + newFilename + '.ogg" type="audio/ogg"></audio>';

  function whenDownloaded(filePath) {  //function to run when sucessfully downloaded - filePath is the path to the file
    fs.rename(filePath, newPath, function(err) { //rename sound file
      if ( err ) console.log('ERROR: ' + err);
    });
    if (msg.caption == undefined) { //append caption if there is one
      updatePage(username, soundCode);
    } else {
      updatePage(username, soundCode + "<br/>" + msg.caption);
    }
  }

  let soundId = msg.voice.file_id; //get id of sound file

  const dlPromise = bot.downloadFile(soundId, __dirname + '../media/sound'); //save photo and create Promise dlPromise
  dlPromise.then(whenDownloaded)
});

//add audioo message
bot.on('audio', (msg) => {
  let date_ob = new Date();
  let username = msg.from.first_name;
  let newFilename = ("0" + date_ob.getDate()).slice(-2) + ("0" + (date_ob.getMonth() + 1)).slice(-2) + date_ob.getFullYear() + "-" + ("0" + (date_ob.getHours())).slice(-2) + ("0" + (date_ob.getMinutes())).slice(-2) + ("0" + (date_ob.getSeconds())).slice(-2) + "_" + username; //create new file name to change downloaded file to
  let newPath =  __dirname + "../media/sound/" + newFilename + ".ogg";
  let soundCode = '<audio controls><source src="media/sound/' + newFilename + '.ogg" type="audio/ogg"></audio>';

  function whenDownloaded(filePath) {  //function to run when sucessfully downloaded - filePath is the path to the file
    fs.rename(filePath, newPath, function(err) { //rename sound file
      if ( err ) console.log('ERROR: ' + err);
    });
    if (msg.caption == undefined) { //append caption if there is one
      updatePage(username, soundCode);
    } else {
      updatePage(username, soundCode + "<br/>" + msg.caption);
    }
  }

  let soundId = msg.audio.file_id; //get id of sound file

  const dlPromise = bot.downloadFile(soundId, __dirname + '../media/sound'); //save photo and create Promise dlPromise
  dlPromise.then(whenDownloaded)
});

//add video message
bot.on('video_note', (msg) => {
  let date_ob = new Date();
  let username = msg.from.first_name;
  let newFilename = ("0" + date_ob.getDate()).slice(-2) + ("0" + (date_ob.getMonth() + 1)).slice(-2) + date_ob.getFullYear() + "-" + ("0" + (date_ob.getHours())).slice(-2) + ("0" + (date_ob.getMinutes())).slice(-2) + ("0" + (date_ob.getSeconds())).slice(-2) + "_" + username; //create new file name to change downloaded file to
  let newPath =  __dirname + "../media/video/" + newFilename + ".mp4";
  let videoCode = '<video width=20em" height="35.55em" controls><source src="media/video/' + newFilename + '.mp4" type="video/mp4"></video>';

  function whenDownloaded(filePath) {  //function to run when sucessfully downloaded - filePath is the path to the file
    fs.rename(filePath, newPath, function(err) { //rename sound file
      if ( err ) console.log('ERROR: ' + err);
    });
    if (msg.caption == undefined) { //append caption if there is one
      updatePage(username, videoCode);
    } else {
      updatePage(username, videoCode + "<br/>" + msg.caption);
    }
  }

  let videoId = msg.video_note.file_id; //get id of sound file

  const dlPromise = bot.downloadFile(videoId, __dirname + '../media/sound'); //save photo and create Promise dlPromise
  dlPromise.then(whenDownloaded)
});

//add video
bot.on('video', (msg) => {
  let date_ob = new Date();
  let username = msg.from.first_name;
  let newFilename = ("0" + date_ob.getDate()).slice(-2) + ("0" + (date_ob.getMonth() + 1)).slice(-2) + date_ob.getFullYear() + "-" + ("0" + (date_ob.getHours())).slice(-2) + ("0" + (date_ob.getMinutes())).slice(-2) + ("0" + (date_ob.getSeconds())).slice(-2) + "_" + username; //create new file name to change downloaded file to
  let newPath =  __dirname + "../media/video/" + newFilename + ".mp4";
  let videoCode = '<video width=20em" height="35.55em" controls><source src="media/video/' + newFilename + '.mp4" type="video/mp4"></video>';

  function whenDownloaded(filePath) {  //function to run when sucessfully downloaded - filePath is the path to the file
    fs.rename(filePath, newPath, function(err) { //rename sound file
      if ( err ) console.log('ERROR: ' + err);
    });
    if (msg.caption == undefined) { //append caption if there is one
      updatePage(username, videoCode);
    } else {
      updatePage(username, videoCode + "<br/>" + msg.caption);
    }
  }

  let videoId = msg.video.file_id; //get id of sound file

  const dlPromise = bot.downloadFile(videoId, __dirname + '../media/sound'); //save photo and create Promise dlPromise
  dlPromise.then(whenDownloaded)
});

//give more information about errors
bot.on("polling_error", (err) => console.log(err));
