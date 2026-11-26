/* Klarwerk AI · Angebot KI-Potenzial-Check (orientierung/potenzial-check.html)
   Kurzanfrage: Pflichtfelder prüfen und einen E-Mail-Entwurf öffnen. Nichts wird automatisch übertragen.
   Beim Drucken werden alle Details aufgeklappt. Läuft nur, wenn es das Formular #anfrage-form gibt. */
(function () {
  var form = document.getElementById("anfrage-form");
  if (!form) return;

  var msg = document.getElementById("meldung");
  function melde(t, fehler) { msg.textContent = t; msg.className = fehler ? "fehler" : ""; }
  function v(id) { return (document.getElementById(id).value || "").trim(); }

  // Ausdruck: alle Details sichtbar, danach wieder wie vorher
  var offen = [];
  window.addEventListener("beforeprint", function () {
    offen = [];
    document.querySelectorAll(".doc details").forEach(function (d) { offen.push(d.open); d.open = true; });
  });
  window.addEventListener("afterprint", function () {
    document.querySelectorAll(".doc details").forEach(function (d, i) { d.open = offen[i]; });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) { melde("Bitte füllen Sie alle Pflichtfelder (*) aus.", true); return; }
    var fmt = form.querySelector("input[name=Format]:checked");
    var body = "Anfrage: KI-Potenzial-Check (Demo, alle Angaben erfunden)\n" +
      "Festpreis 1.290,00 EUR netto zzgl. MwSt., Angebot vom 24.11.2026\n\n" +
      "Firma: " + v("firma") + "\nAnsprechperson: " + v("person") + "\nE-Mail: " + v("mail") +
      "\nWorkshop-Format: " + (fmt ? fmt.value : "") + "\nWunschzeitraum: " + v("zeitraum") +
      "\nAnmerkungen: " + v("anm") + "\n";
    melde("Ihr E-Mail-Programm öffnet einen Entwurf mit Ihren Angaben. Bitte prüfen Sie ihn und senden Sie ihn selbst ab.");
    location.href = "mailto:kontakt@klarwerk-ai.example?subject=" + encodeURIComponent("Anfrage KI-Potenzial-Check: " + v("firma")) + "&body=" + encodeURIComponent(body);
  });
})();
