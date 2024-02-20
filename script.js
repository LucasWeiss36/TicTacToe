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
  let tableHTML = "<table>";
  for (let i = 0; i < 3; i++) {
      tableHTML += "<tr>";
      for (let j = 0; j < 3; j++) {
          let index = i * 3 + j;
          let symbol = fields[index] ? fields[index] : ""; // Wenn das Feld nicht null ist, verwenden Sie den Wert, sonst ein leerer String
          tableHTML += `<td onclick="placeSymbol(${index}, this)">${symbol}</td>`; // Füge das onclick-Attribut hinzu
      }
      tableHTML += "</tr>";
  }
  tableHTML += "</table>";
  document.getElementById("content").innerHTML = tableHTML;
  let playerElement = document.getElementById("player");
  if (playerElement) {
      playerElement.innerText = currentPlayer === "circle" ? "Spieler 1" : "Spieler 2"; // Aktualisiere den Spieleranzeige-Text
  }
}

function placeSymbol(index, tdElement) {
  if (!fields[index]) { // Überprüfen Sie, ob das Feld leer ist
      fields[index] = currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG(); // Setze das Feld auf den aktuellen Spieler
      tdElement.innerHTML = fields[index]; // Füge das SVG-Element in das angeklickte td-Element ein
      if (checkWinner()) {
          drawWinningLine();
          return;
      }
      if (checkGameOver()) {
          return;
      }
      currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Wechsle den aktuellen Spieler
  }
}

function checkWinner() {
  // Horizontal überprüfen
  for (let i = 0; i < 3; i++) {
      if (fields[i * 3] && fields[i * 3] === fields[i * 3 + 1] && fields[i * 3] === fields[i * 3 + 2]) {
          return true;
      }
  }
  // Vertikal überprüfen
  for (let i = 0; i < 3; i++) {
      if (fields[i] && fields[i] === fields[i + 3] && fields[i] === fields[i + 6]) {
          return true;
      }
  }
  // Diagonal überprüfen
  if (fields[0] && fields[0] === fields[4] && fields[0] === fields[8]) {
      return true;
  }
  if (fields[2] && fields[2] === fields[4] && fields[2] === fields[6]) {
      return true;
  }
  return false;
}

function checkGameOver() {
  // Überprüfen, ob alle Felder gefüllt sind
  if (fields.every(field => field)) {
      alert("Unentschieden!");
      return true;
  }
  return false;
}

function drawWinningLine() {
  let contentDiv = document.getElementById("content");
  let line = document.createElement("div");
  line.classList.add("winning-line");

  if (fields[0] && fields[0] === fields[1] && fields[0] === fields[2]) {
      line.style.top = "39.5%";
  } else if (fields[3] && fields[3] === fields[4] && fields[3] === fields[5]) {
      line.style.top = "48.5%";
  } else if (fields[6] && fields[6] === fields[7] && fields[6] === fields[8]) {
      line.style.top = "56.5%";
  } else if (fields[0] && fields[0] === fields[3] && fields[0] === fields[6]) {
      line.style.left = "20%";
      line.style.transform = "rotate(90deg)";
  } else if (fields[1] && fields[1] === fields[4] && fields[1] === fields[7]) {
      line.style.left = "32%";
      line.style.transform = "rotate(90deg)";
  } else if (fields[2] && fields[2] === fields[5] && fields[2] === fields[8]) {
      line.style.left = "44%";
      line.style.transform = "rotate(90deg)";
  } else if (fields[0] && fields[0] === fields[4] && fields[0] === fields[8]) {
      line.style.top = "48.5%";
      line.style.transform = "rotate(-135deg)";
  } else if (fields[2] && fields[2] === fields[4] && fields[2] === fields[6]) {
      line.style.top = "48.5%";
      line.style.transform = "rotate(-45deg)";
  }

  contentDiv.appendChild(line);
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
