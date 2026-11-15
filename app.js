// Obergrenzen der BMI-Kategorien (WHO-Einteilung für Erwachsene).
// Die Liste wird von oben nach unten geprüft: Die erste Kategorie,
// deren Grenze über dem BMI liegt, ist die richtige.
const KATEGORIEN = [
  { bis: 18.5, name: "Untergewicht" },
  { bis: 25, name: "Normalgewicht" },
  { bis: 30, name: "Übergewicht" },
  { bis: 35, name: "Adipositas Grad I" },
  { bis: 40, name: "Adipositas Grad II" },
  { bis: Infinity, name: "Adipositas Grad III" },
];

// BMI = Gewicht in kg / (Größe in m)²
function berechneBmi(groesseCm, gewichtKg) {
  const groesseM = groesseCm / 100;
  return gewichtKg / (groesseM * groesseM);
}

function findeKategorie(bmi) {
  return KATEGORIEN.find((kategorie) => bmi < kategorie.bis).name;
}

const formular = document.getElementById("bmi-form");
const ergebnisBox = document.getElementById("result");

formular.addEventListener("submit", function (event) {
  // Verhindert, dass der Browser die Seite beim Absenden neu lädt.
  event.preventDefault();

  const groesse = parseFloat(document.getElementById("height").value);
  const gewicht = parseFloat(document.getElementById("weight").value);

  if (isNaN(groesse) || isNaN(gewicht) || groesse <= 0 || gewicht <= 0) {
    ergebnisBox.textContent = "Bitte gültige Werte eingeben.";
    ergebnisBox.className = "fehler";
    return;
  }

  // Erst auf eine Nachkommastelle runden, dann einordnen. So passt die
  // Kategorie immer zu der Zahl, die angezeigt wird.
  const bmi = Math.round(berechneBmi(groesse, gewicht) * 10) / 10;
  ergebnisBox.textContent = "BMI: " + bmi.toFixed(1) + " – " + findeKategorie(bmi);
  ergebnisBox.className = "";
});
