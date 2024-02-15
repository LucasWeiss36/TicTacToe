let fields = [
  null,
  "circle",
  "circle",
  "circle",
  null,
  null,
  "cross",
  "cross",
  null,
];

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
      let symbol =
        fields[index] === "circle" ? "o" : fields[index] === "cross" ? "x" : "";
        //Bedingung ? Ausdruck_wenn_wahr : Ausdruck_wenn_falsch
        // wie if abfrage wenn true dann vor -> : <- wenn false dann nach -> : <-
      tableHTML += "<td>" + symbol + "</td>";
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</table>";
  contentDiv.innerHTML = tableHTML;
}


