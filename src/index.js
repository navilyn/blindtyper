'use strict';
const textArea = document.querySelector("#textArea");
const hidingObj = document.querySelector("#hidingObject");
const showButton = document.querySelector("#showButton");

textArea.addEventListener("focus", () => {
  hidingObj.style.display = "block";
  }
);

function showText(){
  hidingObj.style.display = "none";
}

function getReadableTimestamp() {
  const now = new Date();
  return now.toLocaleString('sv-SE').replace(/[: ]/g, '-') // sv-SE = "2025-04-24 18:33:15"
}

function saveContents(){
  const textContent = textArea.value;

  if (!(textContent.trim() === '')){
    const blob = new Blob([textContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `${getReadableTimestamp()}.md`;
    a.click();

    URL.revokeObjectURL(url);
  }
  else {
    alert("The document is empty... try writing something down.");
  }
}
