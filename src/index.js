'use strict';

const textArea      = document.querySelector("#textArea");
const hidingObj     = document.querySelector("#hidingObject");
const hideButton    = document.querySelector("#hideButton");
const saveButton    = document.querySelector("#saveButton");

import * as save from './autosave.js';
import * as time from './time.js';

document.addEventListener("DOMContentLoaded", function () {
  const modalEl = document.getElementById("introModal");
  const dismissBtn = document.getElementById("dismissIntroModal");
  const modal = new bootstrap.Modal(modalEl);

  if (!localStorage.getItem("introShown")) {
    modal.show();
  }

  dismissBtn.addEventListener("click", function () {
    modal.hide();      localStorage.setItem("introShown", "true");
  });

  modalEl.addEventListener("hidden.bs.modal", function () {
    localStorage.setItem("introShown", "true");
  });
});

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
