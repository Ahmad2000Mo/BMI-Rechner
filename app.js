document.getElementById("submit-bmi").addEventListener("click", function() {
      let groß = parseFloat(document.getElementById("height").value);
      let gewicht = parseFloat(document.getElementById("weight").value);
      let resultBox = document.getElementById("result");

      if (isNaN(groß) || isNaN(gewicht) || groß <= 0 || gewicht <= 0) {
        resultBox.textContent = "Bitte gültige Werte eingeben.";
        return;
      }

      let bmi = gewicht / ((groß / 100) ** 2);
      let message = "BMI: " + bmi.toFixed(2) + " – ";

      if (bmi < 18.5) {
        message += "Du bist schlank.";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        message += "Perfekto Body.";
      } else if (bmi >= 25 && bmi <= 29.9) {
        message += "Übergewicht.";
      } else if (bmi >= 30 && bmi <= 34.9) {
        message += "Erste Fettleibigkeit.";
      } else if (bmi >= 35 && bmi <= 39.9) {
        message += "Zweite Fettleibigkeit.";
      } else {
        message += "Gefährliche Fettleibigkeit !!!!!!";
      }

      resultBox.textContent = message;
    });
