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

function saveContents(){
  const textContent = textArea.value;
  const blob = new Blob([textContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "notes.md";
  a.click();

  URL.revokeObjectURL(url);
}
