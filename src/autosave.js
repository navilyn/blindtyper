'use strict';
const textArea      = document.querySelector('#textArea');
const restoreButton = document.querySelector('#restore');
// This is the part of the program where we will save the form even upon refresh/exit using session storage.
import * as time from './time.js'

export function cacheData(value){
  if(value.trim() !== ''){
    const saveData = {
    lastEdited : time.readableTimestamp(), //getting the current time in seconds
    contents   : value
    };
    const parsedData = JSON.stringify(saveData);
    localStorage.setItem(`draft-${Math.floor(Date.now() / 1000)}`, parsedData);
  };
}

let latestRestorePoint = null;
let latestRestorePointHRD = null;

export function checkCachedData() {
  let currentWinner = -Infinity;
  let currentWinnerKey = null;
  let currentWinnerValue = null;
  
  for (const [key, value] of Object.entries(localStorage)) {
    // Extract numbers from key and convert to number
    const numericKey = Number(key.replace(/\D/g, ''));
    
    // Compare as numbers (not strings)
    if (numericKey >= currentWinner) {
      currentWinner = numericKey;
      currentWinnerKey = key;
      currentWinnerValue = value;
    }
  }
  
  if (currentWinnerKey) {
    let parsedValue = JSON.parse(currentWinnerValue);
    latestRestorePoint = parsedValue.contents;
    latestRestorePointHRD = parsedValue.lastEdited;
    console.log(`The latest snapshot taken is: ${currentWinnerKey} (timestamp: ${latestRestorePointHRD})`);
    console.log(`${parsedValue.contents}`);
  }
  else{
    console.log("No valid snapshots found");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    setInterval(() => {
      cacheData(textArea.value);
      if(textArea.value.trim() != false){
        console.log(`Cached: ${textArea.value}\nat: ${time.readableTimestamp()}`)
      }
      limitDrafts(5);
    }, 5000);
  }, 3000);
});

export function restoreData(){
  textArea.value = latestRestorePoint;
  localStorage.clear();
}

function limitDrafts(max = 5) {
  const drafts = [];

  for (const [key, value] of Object.entries(localStorage)) {
    if (key.startsWith('draft-')) {
      const timestamp = Number(key.replace(/\D/g, ''));
      drafts.push({ key, timestamp });
    }
  }

  drafts.sort((a, b) => b.timestamp - a.timestamp); // newest first

  // Remove oldest if too many
  while (drafts.length > max) {
    const toDelete = drafts.pop();
    localStorage.removeItem(toDelete.key);
  }
}
