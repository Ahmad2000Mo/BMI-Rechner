# Der Code erklärt

Diese Datei erklärt, wie der BMI-Rechner aufgebaut ist und warum.
Sie hilft auch, das Projekt in einem Bewerbungsgespräch zu erklären.

## Ablauf in vier Schritten

1. Der Nutzer füllt die zwei Felder aus und klickt auf „Berechnen“ (oder drückt Enter).
2. Der Browser löst am Formular das Ereignis `submit` aus. `app.js` hört darauf mit `addEventListener`.
3. Die Eingaben werden gelesen, in Zahlen umgewandelt und geprüft.
4. Der BMI wird berechnet, gerundet, einer Kategorie zugeordnet und in die Seite geschrieben.

## index.html

- `<form id="bmi-form">`: Ein echtes Formular. Dadurch funktioniert die Enter-Taste von allein.
- `<label for="height">`: Verbindet den Text mit dem Eingabefeld. Ein Klick auf den Text setzt den Cursor ins Feld, und Screenreader lesen den Text vor.
- `type="number"` und `inputmode="decimal"`: Auf dem Handy erscheint die Zahlentastatur.
- `novalidate`: Schaltet die Fehlermeldungen des Browsers ab, weil `app.js` selbst prüft und eine eigene Meldung zeigt.
- `aria-live="polite"` an der Ergebniszeile: Screenreader lesen das Ergebnis vor, sobald es sich ändert.
- Das `<script>` steht am Ende von `<body>`. So existieren die Elemente schon, wenn das Skript sie sucht.

## app.js

**`KATEGORIEN`** ist eine Liste von Objekten. Jedes hat eine Obergrenze (`bis`) und einen Namen.
Vorteil gegenüber einer langen `if / else if`-Kette: Grenzen und Namen stehen an einer Stelle und lassen sich leicht ändern.

**`berechneBmi(groesseCm, gewichtKg)`** rechnet Zentimeter in Meter um und wendet die Formel an.
Die Funktion bekommt nur Zahlen und gibt nur eine Zahl zurück. Sie fasst die Seite nicht an und ist deshalb leicht zu testen.

**`findeKategorie(bmi)`** nutzt `Array.find`. Das liefert das erste Element, für das die Bedingung `bmi < kategorie.bis` stimmt.
Die letzte Grenze ist `Infinity`, also wird immer etwas gefunden.

**Der Event-Listener:**

- `event.preventDefault()` verhindert, dass der Browser das Formular abschickt und die Seite neu lädt.
- `parseFloat(...)` macht aus dem Text des Eingabefelds eine Zahl. Bei leerem Feld kommt `NaN` heraus („Not a Number“).
- `isNaN(...)` und `<= 0` fangen ungültige Eingaben ab. `return` beendet die Funktion dann sofort.
- `Math.round(x * 10) / 10` rundet auf eine Nachkommastelle.
- `textContent` schreibt reinen Text in die Seite. Im Gegensatz zu `innerHTML` kann dabei kein fremdes HTML eingeschleust werden.

## Ein Fehler, der behoben wurde

In der ersten Version waren die Grenzen so geschrieben:

```js
} else if (bmi >= 18.5 && bmi <= 24.9) { ... }
} else if (bmi >= 25 && bmi <= 29.9) { ... }
```

Ein BMI von 24,95 passt in keine der beiden Bedingungen und landete im letzten `else`, also bei der höchsten Kategorie.
Jetzt gibt es keine Lücken mehr, weil nur noch eine Obergrenze pro Kategorie geprüft wird.

Außerdem wird zuerst gerundet und dann eingeordnet. Sonst könnte „BMI: 25,0 – Normalgewicht“ erscheinen, wenn der genaue Wert 24,98 ist.

## main.css

- `display: flex` mit `align-items` und `justify-content` zentriert die Karte auf der Seite.
- `min-height: 100vh` statt `height: 100vh`: Auf kleinen Bildschirmen darf die Seite länger werden und wird nicht abgeschnitten.
- `box-sizing: border-box`: Die Breite eines Felds enthält Innenabstand und Rahmen. So passt `width: 100%` genau.
- `:focus` und `:focus-visible`: Ein sichtbarer Rahmen zeigt bei Tastaturbedienung, wo man gerade ist.

## Mögliche Fragen im Gespräch

- **Warum keine Bibliothek?** Für zwei Felder und eine Formel ist reines JavaScript genug. Das Ziel war, die Grundlagen zu üben: DOM, Ereignisse, Eingabeprüfung.
- **Wie würdest du das testen?** `berechneBmi` und `findeKategorie` sind reine Funktionen. Man kann sie mit festen Werten aufrufen und das Ergebnis vergleichen, zum Beispiel `berechneBmi(200, 100) === 25`.
- **Was würdest du als Nächstes verbessern?** Zum Beispiel automatische Tests, eine farbige Skala für die Kategorien oder eine Umschaltung auf Pfund und Zoll.
