/* Klarwerk AI · Angebot KI-Potenzial-Check (orientierung/potenzial-check.html)
   Unterschriftenfeld, Pflichtfeld-Prüfung, Drucken als PDF und E-Mail-Entwurf. Nichts wird automatisch übertragen.
   Läuft nur, wenn es das Formular #annahme auf der Seite gibt. */
(function () {
  if (!document.getElementById("annahme")) return;

  var form = document.getElementById("annahme");
  var msg = document.getElementById("meldung");
  var cv = document.getElementById("sig");
  var wrap = document.getElementById("sigwrap");
  var ctx = cv.getContext("2d");
  var hatUnterschrift = false, zeichnet = false;

  // Datum vorbelegen
  var d = new Date(); document.getElementById("datum").value = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

  function groesse() {
    var r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    var bild = hatUnterschrift ? cv.toDataURL() : null;
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#12284C";
    if (bild) { var im = new Image(); im.onload = function () { ctx.drawImage(im, 0, 0, r.width, r.height); }; im.src = bild; }
  }
  groesse(); window.addEventListener("resize", groesse);

  function pos(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  cv.addEventListener("pointerdown", function (e) {
    zeichnet = true; cv.setPointerCapture(e.pointerId);
    var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + .1, p.y + .1); ctx.stroke(); e.preventDefault();
  });
  cv.addEventListener("pointermove", function (e) { if (!zeichnet) return; var p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); hatUnterschrift = true; wrap.classList.add("fertig"); });
  function ende() { zeichnet = false; }
  function sigbild() { document.getElementById("sigimg").src = hatUnterschrift ? cv.toDataURL("image/png") : ""; }
  cv.addEventListener("pointerup", function () { ende(); sigbild(); }); cv.addEventListener("pointercancel", ende);
  document.getElementById("sigclear").addEventListener("click", function () {
    var r = cv.getBoundingClientRect(); ctx.clearRect(0, 0, r.width, r.height); hatUnterschrift = false; wrap.classList.remove("fertig"); sigbild();
  });

  function melde(t, fehler) { msg.textContent = t; msg.className = fehler ? "fehler" : ""; }

  function pruefen() {
    if (!form.reportValidity()) { melde("Bitte füllen Sie alle Pflichtfelder (*) aus.", true); return false; }
    var hs = document.getElementById("handschrift").checked;
    if (!hatUnterschrift && !hs) { melde("Bitte unterschreiben Sie im Feld oder wählen Sie die handschriftliche Unterschrift auf dem Ausdruck.", true); cv.scrollIntoView({ block: "center" }); return false; }
    return true;
  }
  function v(id) { return (document.getElementById(id).value || "").trim(); }

  document.getElementById("btn-pdf").addEventListener("click", function () {
    if (!pruefen()) return;
    melde("Der Druckdialog öffnet sich. Wählen Sie dort „Als PDF speichern“ und senden Sie die Datei an kontakt@klarwerk-ai.example.");
    setTimeout(function () { window.print(); }, 150);
  });

  document.getElementById("btn-mail").addEventListener("click", function () {
    if (!pruefen()) return;
    var fmt = form.querySelector("input[name=Format]:checked");
    var body = "Annahme des Angebots: KI-Potenzial-Check (Demo, alle Angaben erfunden)\n" +
      "Festpreis 1.290,00 EUR netto (1.535,10 EUR brutto), Angebot vom 24.11.2026\n\n" +
      "Auftraggeber\n" +
      "Firma: " + v("firma") + "\nAnschrift: " + v("anschrift") + "\nAnsprechperson: " + v("person") + (v("funktion") ? " (" + v("funktion") + ")" : "") +
      "\nE-Mail: " + v("mail") + "\nTelefon: " + v("tel") + "\nUSt-IdNr.: " + v("ust") + "\n\n" +
      "Wünsche\nWorkshop-Format: " + (fmt ? fmt.value : "") + "\nFachverantwortliche: " + v("teiln") + "\nWunschzeitraum: " + v("zeitraum") + "\nAnmerkungen: " + v("anm") +
      "\nNDA gewünscht: " + (document.getElementById("nda").checked ? "ja" : "nein") + "\n\n" +
      "Beauftragung bestätigt: ja\nOrt, Datum: " + v("ort") + ", " + v("datum") + "\n" +
      "Unterschrift: " + (hatUnterschrift ? "digital im Angebot geleistet (siehe angehängtes PDF)" : "handschriftlich auf dem Ausdruck (siehe Anhang)") + "\n\n" +
      "Bitte hängen Sie das unterschriebene Angebot (PDF) an diese E-Mail an.\n";
    melde("Ihr E-Mail-Programm öffnet sich mit den ausgefüllten Angaben. Bitte hängen Sie das unterschriebene PDF an und senden Sie die Nachricht ab.");
    location.href = "mailto:kontakt@klarwerk-ai.example?subject=" + encodeURIComponent("Annahme Angebot KI-Potenzial-Check: " + v("firma")) + "&body=" + encodeURIComponent(body);
  });
})();
