document.addEventListener("DOMContentLoaded", function() {
  init();
});

let fields = [
null,
null,
null,
null,
null,
null,
null,
null,
null,
];
let currentPlayer = "circle"; // Spieler 1 beginnt mit "circle"

function init() {
  render();
}

function render() {
let contentDiv = document.getElementById("content");
let tableHTML = "<table>";
for (let i = 0; i < 3; i++) {
  tableHTML += "<tr>";
  for (let j = 0; j < 3; j++) {
    let index = i * 3 + j;
    let symbol = fields[index] ? fields[index] : ""; // Wenn das Feld nicht null ist, verwenden Sie den Wert, sonst ein leerer String
    tableHTML += `<td onclick="placeSymbol(${index})">${symbol}</td>`; // Füge das onclick-Attribut hinzu
  }
  tableHTML += "</tr>";
}
tableHTML += "</table>";
contentDiv.innerHTML = tableHTML;
let playerElement = document.getElementById("player");
if (playerElement) {
  playerElement.innerText = currentPlayer === "circle" ? "Spieler 1" : "Spieler 2"; // Aktualisiere den Spieleranzeige-Text
}
}

function placeSymbol(index) {
if (!fields[index]) { // Überprüfen Sie, ob das Feld leer ist
  fields[index] = currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG(); // Setze das Feld auf den aktuellen Spieler
  render(); // Rendere das Spielfeld neu
  currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Wechsle den aktuellen Spieler
}
}

function generateCircleSVG() {
return `
    <svg width="70" height="70">
        <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0EF" stroke-width="5">
            <animate attributeName="r" from="0" to="30" dur="250ms" fill="freeze" />
        </circle>
    </svg>
`;
}

function generateCrossSVG() {
return `
    <svg width="70" height="70">
        <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
            <animate attributeName="x2" from="10" to="60" dur="250ms" fill="freeze" />
            <animate attributeName="y2" from="10" to="60" dur="250ms" fill="freeze" />
        </line>
        <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
            <animate attributeName="x2" from="60" to="10" dur="250ms" fill="freeze" />
            <animate attributeName="y2" from="10" to="60" dur="250ms" fill="freeze" />
        </line>
    </svg>
`;
}
