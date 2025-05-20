'use strict';

const textArea      = document.querySelector("#textArea");
const hidingObj     = document.querySelector("#hidingObject");
const hideButton    = document.querySelector("#hideButton");
const saveButton    = document.querySelector("#saveButton");

import * as save from './autosave.js';
import * as time from './time.js';

// holy hell do I hate event listeners
textArea.addEventListener("focus", () => {
  hidingObj.style.display = "block";
});

saveButton.addEventListener('click', () => {
  saveContents();
});

showButton.addEventListener('click', () => {
  hidingObj.style.display = "none";
});

window.addEventListener("load", () => {
  save.checkCachedData();
})

function saveContents(){
  const textContent = textArea.value;
  if (!(textContent.trim() === '')){
  const blob = new Blob([textContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${time.readableTimestamp().replace(/[: ]/g, '-')}.md`;
  a.click();

  URL.revokeObjectURL(url);
  }
  else{
    alert("The document is empty. Aborting save...")
  }
}
