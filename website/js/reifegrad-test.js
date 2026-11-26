/* Klarwerk AI · KI-Reifegrad-Test (orientierung/reifegrad-test.html)
   Baut die 12 Fragen auf, rechnet das Ergebnis aus und bietet Senden (E-Mail-Entwurf), Kopieren und Zurücksetzen.
   Antworten bleiben nur im Browser (localStorage). Läuft nur, wenn es #quiz auf der Seite gibt. */
(function () {
  if (!document.getElementById("quiz")) return;
  {
    const DIMS = [
      { k: "s", n: "Strategie",  d: "Ziele, Verantwortung und Budget für KI.", pk: "Conversational AI &amp; Digital Analytics Strategy",
        tip: "Legen Sie zwei bis drei messbare KI-Ziele fest und benennen Sie eine verantwortliche Person mit Budget. Das Strategie-Paket liefert dafür Ist-Aufnahme, Use-Case-Bewertung und eine Roadmap, die die Geschäftsführung freigeben kann." },
      { k: "d", n: "Daten",      d: "Verfügbarkeit und Qualität Ihrer Daten.", pk: "AI Agents &amp; Generative Business Intelligence",
        tip: "Klären Sie, welche Daten aus ERP, Produktion und Vertrieb zentral verfügbar sind. Ohne saubere Stammdaten liefert keine KI verlässliche Ergebnisse. Im Pilot entsteht ein KI-Agent auf Ihren Kennzahlen." },
      { k: "p", n: "Prozesse",   d: "Wo KI im Alltag schon wirkt.", pk: "AI Automation &amp; LowCode Integration",
        tip: "Wählen Sie einen dokumentierten, wiederkehrenden Prozess und testen Sie dort einen klar abgegrenzten Anwendungsfall mit Kennzahl. Das Paket automatisiert zwei Prozesse mit LowCode-Werkzeugen und dokumentiert sie." },
      { k: "m", n: "Menschen",   d: "Kompetenz und Akzeptanz im Team.", pk: "Strategic AI Business Management (Head of AI)",
        tip: "Schulen Sie Führungskräfte und Teams praxisnah. Der EU AI Act verlangt ohnehin, dass Mitarbeitende, die KI nutzen, ausreichend KI-Kompetenz haben. Ein Head of AI auf Zeit verantwortet Befähigung und Akzeptanz." },
      { k: "g", n: "Governance", d: "Regeln, Risiken und EU AI Act.", pk: "Data Governance, Compliance &amp; AI",
        tip: "Erstellen Sie eine KI-Richtlinie und eine Übersicht der eingesetzten KI-Systeme. Das schützt vor Datenabfluss und ist die Basis für die Pflichten nach EU AI Act. Das Paket liefert Reifegrad-Check, Rollenmodell und Richtlinien. Es ersetzt keine Rechtsberatung." }
    ];
    const Q = [
      ["s","Gibt es eine schriftliche KI-Strategie mit konkreten Zielen?",["Nein","Erste Ideen","In Arbeit","Ja, mit Zielen"]],
      ["s","Gibt es eine verantwortliche Person und ein Budget für KI?",["Nein","Informell","Person, kein Budget","Person und Budget"]],
      ["d","Sind Ihre Geschäfts- und Produktionsdaten digital und zentral verfügbar?",["Kaum","Teilweise, verstreut","Überwiegend","Ja, zentral"]],
      ["d","Wie bewerten Sie die Qualität Ihrer Daten (Stammdaten, ERP, Maschinen)?",["Schlecht","Lückenhaft","Gut","Sehr gut, gepflegt"]],
      ["p","Sind Ihre Kernprozesse dokumentiert und standardisiert?",["Nein","Einzelne","Die meisten","Ja, alle"]],
      ["p","Wird KI bereits produktiv in einem Prozess eingesetzt?",["Nein","Erste Tests","Ein Pilot","Ja, im Betrieb"]],
      ["p","Messen Sie den Nutzen von Digital- und KI-Projekten mit Kennzahlen?",["Nein","Selten","Meistens","Immer"]],
      ["m","Wie viele Mitarbeitende nutzen KI-Tools regelmäßig?",["Niemand","Einzelne","Ganze Teams","Breit im Unternehmen"]],
      ["m","Wurden Mitarbeitende zum Umgang mit KI geschult?",["Nein","Selbststudium","Einzelne Schulungen","Systematisch, dokumentiert"]],
      ["m","Wie steht die Geschäftsführung zum Einsatz von KI?",["Skeptisch","Abwartend","Offen","Treibt es aktiv"]],
      ["g","Gibt es eine KI-Richtlinie (erlaubte Tools, Daten, Freigaben)?",["Nein","Mündliche Regeln","Entwurf","Ja, verbindlich"]],
      ["g","Haben Sie eine Übersicht der eingesetzten KI-Systeme und kennen Ihre Pflichten nach EU AI Act?",["Nein","Davon gehört","Teilweise","Ja, vollständig"]]
    ];
    const LV = [[0,"Stufe 1 · Einsteiger","KI ist noch kein Thema mit System."],[26,"Stufe 2 · Entdecker","Erste Versuche, aber ohne Steuerung."],[51,"Stufe 3 · Gestalter","Gute Basis, jetzt fehlt die Skalierung."],[76,"Stufe 4 · Serienreif","KI ist gesteuert und im Betrieb."]];
    const A = new Array(Q.length).fill(null);
    const quiz = document.getElementById("quiz");
    quiz.innerHTML = DIMS.map(d => `<div class="dim"><h2>${d.n}</h2><p>${d.d}</p>${Q.map((q,i) => q[0]===d.k ? `<div class="q"><h3 id="h${i}">${i+1}. ${q[1]}</h3><div class="opts" role="radiogroup" aria-labelledby="h${i}">${q[2].map((o,j) => `<input type="radio" name="q${i}" id="q${i}o${j}" value="${j}"><label for="q${i}o${j}">${o}</label>`).join("")}</div></div>` : "").join("")}</div>`).join("");
    document.getElementById("bars").innerHTML = DIMS.map(d => `<div class="bar"><span>${d.n}</span><div class="track"><div class="fill" id="f${d.k}"></div></div><b id="v${d.k}">–</b></div>`).join("");

    function calc() {
      const per = {}; DIMS.forEach(d => per[d.k] = {s:0, m:0, a:0});
      Q.forEach((q,i) => { per[q[0]].m += 3; if (A[i] !== null) { per[q[0]].s += A[i]; per[q[0]].a++; } });
      const done = A.filter(x => x !== null).length, tot = A.reduce((t,x) => t + (x||0), 0), pct = Math.round(tot/(Q.length*3)*100);
      return {per, done, pct};
    }
    function render() {
      const {per, done, pct} = calc();
      document.getElementById("score").textContent = pct + " %";
      document.getElementById("count").textContent = done + " von 12 Fragen beantwortet";
      document.getElementById("fort-text").textContent = done + " von " + Q.length + " beantwortet";
      document.getElementById("fort-fill").style.width = Math.round(done/Q.length*100) + "%";
      document.getElementById("fort-link").hidden = done < Q.length;
      document.getElementById("send").classList.toggle("main", done === Q.length);
      document.getElementById("arc").style.strokeDashoffset = (314.16*(1-pct/100)).toFixed(1);
      let lv = LV[0]; LV.forEach(l => { if (pct >= l[0]) lv = l; });
      document.getElementById("level").textContent = done ? lv[1] : "Noch keine Antworten";
      let weak = null, wv = 2;
      DIMS.forEach(d => {
        const p = per[d.k], v = p.a ? Math.round(p.s/p.m*100) : null;
        document.getElementById("f"+d.k).style.width = (v||0) + "%";
        document.getElementById("v"+d.k).textContent = v === null ? "–" : v + " %";
        if (p.a === Q.filter(q => q[0]===d.k).length) { const r = p.s/p.m; if (r < wv) { wv = r; weak = d; } }
      });
      const rec = document.getElementById("rec");
      if (done < Q.length) { rec.innerHTML = `<strong>Ihr nächster Schritt</strong><p>Noch ${Q.length-done} Fragen, dann erscheint hier Ihre Empfehlung.</p>`; return; }
      rec.innerHTML = `<strong>${lv[2]} Größter Hebel: ${weak.n}</strong><p>${weak.tip}</p><p>Passendes Paket: <a href="../index.html#produkte">${weak.pk}</a></p><p>Einstieg: <a href="potenzial-check.html">KI-Startworkshop (1.290 € netto)</a>, Angebot ansehen und anfragen.</p><p><a class="btn" href="mailto:kontakt@klarwerk-ai.example?subject=Erstgespr%C3%A4ch%20anfragen">Erstgespräch anfragen</a></p>`;
    }
    quiz.addEventListener("change", e => {
      const m = e.target.name.match(/^q(\d+)$/);
      if (m) { A[+m[1]] = +e.target.value; try { localStorage.setItem("kiReife", JSON.stringify(A)); } catch (_) {} render(); }
    });
    document.getElementById("reset").addEventListener("click", () => {
      A.fill(null); quiz.querySelectorAll("input").forEach(i => i.checked = false);
      try { localStorage.removeItem("kiReife"); } catch (_) {} render();
    });
    document.getElementById("send").addEventListener("click", () => {
      const {per, done, pct} = calc();
      const msg = document.getElementById("sendmsg");
      if (done < Q.length) { msg.textContent = "Bitte beantworten Sie zuerst alle 12 Fragen (noch " + (Q.length - done) + " offen)."; return; }
      let lv = LV[0]; LV.forEach(l => { if (pct >= l[0]) lv = l; });
      const body = "Ausgefüllter KI-Reifegrad-Test (Demo, alle Angaben erfunden)\n\n" +
        "Gesamtergebnis: " + pct + " % (" + lv[1] + ")\n\n" +
        "Bereiche:\n" + DIMS.map(d => "- " + d.n + ": " + Math.round(per[d.k].s/per[d.k].m*100) + " %").join("\n") + "\n\n" +
        "Antworten:\n" + Q.map((q,i) => (i+1) + ". " + q[1] + "\n   -> " + q[2][A[i]]).join("\n") + "\n\n" +
        "Unternehmen / Ansprechperson (bitte ergänzen): \n";
      msg.textContent = "Ihr E-Mail-Programm öffnet sich mit dem ausgefüllten Ergebnis. Bitte prüfen und absenden.";
      location.href = "mailto:kontakt@klarwerk-ai.example?subject=" + encodeURIComponent("KI-Reifegrad-Test: Ergebnis " + pct + " %") + "&body=" + encodeURIComponent(body);
    });
    document.getElementById("copy").addEventListener("click", async e => {
      const {per, pct} = calc(); let lv = LV[0]; LV.forEach(l => { if (pct >= l[0]) lv = l; });
      const t = `KI-Reifegrad: ${pct} % (${lv[1]})\n` + DIMS.map(d => `${d.n}: ${per[d.k].a ? Math.round(per[d.k].s/per[d.k].m*100) + " %" : "offen"}`).join("\n");
      try { await navigator.clipboard.writeText(t); e.target.textContent = "Kopiert"; } catch (_) { e.target.textContent = "Kopieren nicht möglich"; }
      setTimeout(() => e.target.textContent = "Ergebnis kopieren", 1800);
    });
    try { const s = JSON.parse(localStorage.getItem("kiReife") || "null"); if (Array.isArray(s) && s.length === Q.length) s.forEach((v,i) => { if (Number.isInteger(v) && v >= 0 && v <= 3) { A[i] = v; const el = document.getElementById(`q${i}o${v}`); if (el) el.checked = true; } }); } catch (_) {}
    render();
  }
})();
