/* Klarwerk AI · gemeinsames Skript für alle Seiten
   1. Handy-Menü: Schaltfläche „Menü“ klappt die Hauptnavigation auf und zu (bis 860 px Breite).
   2. Warenkorb (alle Seiten): Produktliste mit Preisen, Speicher, Zähler im Kopf, „In den Warenkorb“.
   3. Warenkorb-Seite (warenkorb.html): Liste, Mengen, Summen, Demo-Bestellung. Es wird nichts bestellt.
   Jeder Teil läuft nur, wenn seine Elemente auf der Seite vorhanden sind. */
(function () {
  "use strict";

  /* 1 · Handy-Menü
     Ohne JavaScript bleibt die Schaltfläche versteckt (hidden) und die Navigation immer sichtbar.
     Mit JavaScript: Klasse "menue-js" am Kopf aktiviert das Zuklappen (siehe klarwerk.css, Abschnitt 8). */
  var kopf = document.querySelector("header.kopf");
  var knopf = document.querySelector(".menue-btn");
  var nav = knopf ? document.getElementById(knopf.getAttribute("aria-controls")) : null;

  if (kopf && knopf && nav) {
    var setzeMenue = function (offen) {
      knopf.setAttribute("aria-expanded", offen ? "true" : "false");
      kopf.classList.toggle("offen", offen);
    };
    var istOffen = function () { return knopf.getAttribute("aria-expanded") === "true"; };

    kopf.classList.add("menue-js");
    knopf.hidden = false;

    knopf.addEventListener("click", function () { setzeMenue(!istOffen()); });

    // Escape schließt das Menü und setzt den Fokus zurück auf die Schaltfläche
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && istOffen()) {
        setzeMenue(false);
        knopf.focus();
      }
    });

    // Klick auf einen Link schließt das Menü (wichtig für Sprungmarken auf der Startseite)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setzeMenue(false);
    });
  }

  /* 2 · Warenkorb (Demo, alle Seiten)
     Produktliste: einzige Stelle mit Preisen (netto, in Cent). Links gelten ab dem Ordner website/.
     min: kleinste Menge. monate: Menge bedeutet Monate (Head of AI, Mindestlaufzeit 3 Monate). */
  var PRODUKTE = {
    "strategie":       { kurz: "Strategie", name: "Conversational AI & Digital Analytics Strategy", preis: 520000,  link: "produkte/strategie.html",       min: 1 },
    "governance":      { kurz: "Governance", name: "Data Governance, Compliance & AI",               preis: 590000,  link: "produkte/governance.html",      min: 1 },
    "automatisierung": { kurz: "Automatisierung", name: "AI Automation & LowCode Integration",            preis: 890000,  link: "produkte/automatisierung.html", min: 1 },
    "agenten-bi":      { kurz: "Agenten & BI", name: "AI Agents & Generative Business Intelligence",   preis: 1190000, link: "produkte/agenten-bi.html",      min: 1 },
    "head-of-ai":      { kurz: "Head of AI", name: "Strategic AI Business Management (Head of AI)",  preis: 690000,  link: "produkte/head-of-ai.html",      min: 3, monate: true },
    "startpaket":      { kurz: "Startpaket", name: "Startpaket: Strategie + Governance",             preis: 1060000, link: "index.html#bundles-titel",      min: 1 },
    "umsetzungspaket": { kurz: "Umsetzungspaket", name: "Umsetzungspaket: Automatisierung + Agenten & BI", preis: 1980000, link: "index.html#bundles-titel",     min: 1 },
    "komplettpaket":   { kurz: "Komplettpaket", name: "Komplettpaket: Strategie, Governance, Automatisierung, Agenten & BI", preis: 3000000, link: "index.html#bundles-titel", min: 1 }
  };
  var MAX_MONATE = 99;
  // Pakete und Bundles liegen genau einmal im Warenkorb; nur beim Head of AI ist die Menge (Monate) wählbar
  var maxMenge = function (id) { return PRODUKTE[id].monate ? MAX_MONATE : 1; };
  var SCHLUESSEL = "klarwerk-warenkorb";
  var MWST_PROZENT = 19;
  var euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
  var formatiere = function (cent) { return euro.format(cent / 100); };
  var istProdukt = function (id) { return Object.prototype.hasOwnProperty.call(PRODUKTE, id); };

  /* Speicher (localStorage): nur Kennung und Menge, z. B. [{"id":"strategie","menge":1}].
     Gesperrter oder kaputter Speicher: Warenkorb startet leer, ohne Fehlermeldung.
     Ungültige Einträge (unbekannte Kennung, doppelt, falsche Menge) werden verworfen. */
  var liesKorb = function () {
    try {
      var daten = JSON.parse(window.localStorage.getItem(SCHLUESSEL) || "[]");
      if (!Array.isArray(daten)) return [];
      var gesehen = {};
      var korb = [];
      daten.forEach(function (a) {
        if (!a || typeof a.id !== "string" || !istProdukt(a.id) || gesehen[a.id]) return;
        var m = a.menge;
        if (typeof m !== "number" || Math.floor(m) !== m || m < PRODUKTE[a.id].min) return;
        m = Math.min(m, maxMenge(a.id)); // ältere Warenkörbe mit Menge > 1 begrenzen
        gesehen[a.id] = true;
        korb.push({ id: a.id, menge: m });
      });
      return korb;
    } catch (e) { return []; }
  };
  var speichereKorb = function (korb) {
    try { window.localStorage.setItem(SCHLUESSEL, JSON.stringify(korb)); } catch (e) { /* Speicher gesperrt: nichts tun */ }
  };
  // Zähler im Kopf: Summe der Mengen; Head of AI zählt unabhängig von den Monaten als 1 Artikel
  var zaehleArtikel = function (korb) {
    return korb.reduce(function (summe, a) { return summe + (PRODUKTE[a.id].monate ? 1 : a.menge); }, 0);
  };

  var korbLink = document.getElementById("warenkorb-link");
  var zaehler = document.getElementById("anzahl");
  var zeigeZahl = function (korb) {
    if (!korbLink || !zaehler) return;
    var n = zaehleArtikel(korb);
    zaehler.textContent = n;
    korbLink.setAttribute("aria-label", "Warenkorb, " + n + " Artikel");
  };
  zeigeZahl(liesKorb());

  /* Meldungsfläche: wird beim Laden angelegt (leer), damit Screenreader spätere Meldungen ansagen.
     Kurze Einblendung mit Link zum Warenkorb; sie bleibt stehen, solange Maus oder Fokus darauf liegen. */
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  var timer;
  var starteTimer = function () {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () { toast.textContent = ""; }, 5000);
  };
  var melde = function (text, mitLink) {
    toast.textContent = "";
    var s = document.createElement("span");
    s.textContent = text;
    toast.appendChild(s);
    if (mitLink && korbLink) {
      var a = document.createElement("a");
      a.href = korbLink.getAttribute("href");
      a.textContent = "Zum Warenkorb";
      toast.appendChild(a);
    }
    starteTimer();
  };
  ["mouseenter", "focusin"].forEach(function (t) { toast.addEventListener(t, function () { window.clearTimeout(timer); }); });
  ["mouseleave", "focusout"].forEach(function (t) { toast.addEventListener(t, starteTimer); });

  // „In den Warenkorb“: Paket einmal hinzufügen (Head of AI mit 3 Monaten), Button bestätigt kurz
  document.querySelectorAll("button[data-id]").forEach(function (b) {
    var id = b.getAttribute("data-id");
    if (!istProdukt(id)) return;
    var beschriftung = b.textContent;
    var zurueck;
    b.addEventListener("click", function () {
      var p = PRODUKTE[id];
      var korb = liesKorb();
      var schonDa = korb.some(function (a) { return a.id === id; });
      if (!schonDa) korb.push({ id: id, menge: p.min });
      speichereKorb(korb);
      zeigeZahl(korb);
      b.textContent = schonDa ? "✓ Im Warenkorb" : "✓ Hinzugefügt";
      window.clearTimeout(zurueck);
      zurueck = window.setTimeout(function () { b.textContent = beschriftung; }, 2000);
      melde(p.kurz + (schonDa ? " ist schon im Warenkorb." : " hinzugefügt" + (p.monate ? " (" + p.min + " Monate)" : "") + ". Demo, keine Bestellung."), true);
    });
  });

  /* Aufklappbare Details: am Handy zugeklappt, darüber offen (ohne JavaScript bleiben die Karten offen) */
  var handy = window.matchMedia("(max-width: 560px)");
  var klappe = function () {
    document.querySelectorAll("details.mehr").forEach(function (d) { d.open = !handy.matches; });
  };
  klappe();
  if (handy.addEventListener) handy.addEventListener("change", klappe);
  window.addEventListener("beforeprint", function () { document.querySelectorAll("details.mehr").forEach(function (d) { d.open = true; }); });

  /* Startseite: aktuellen Bereich im Menü markieren */
  if (nav && document.getElementById("top")) {
    var ziele = [["orientierung", 'a[href="#orientierung"]'], ["produkte", 'a[href="#produkte"]'], ["service", 'a[href="service/index.html"]'], ["ueber-uns", 'a[href="#ueber-uns"]'], ["kontakt", 'a[href="#kontakt"]']]
      .map(function (z) { return { bereich: document.getElementById(z[0]), link: nav.querySelector(z[1]) }; })
      .filter(function (z) { return z.bereich && z.link; });
    var markiere = function () {
      var aktiv = null;
      var grenze = (kopf ? kopf.offsetHeight : 0) + 120;
      ziele.forEach(function (z) { if (z.bereich.getBoundingClientRect().top <= grenze) aktiv = z; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) aktiv = ziele[ziele.length - 1];
      ziele.forEach(function (z) {
        if (z === aktiv) z.link.setAttribute("aria-current", "true");
        else z.link.removeAttribute("aria-current");
      });
    };
    window.addEventListener("scroll", markiere, { passive: true });
    window.addEventListener("resize", markiere);
    markiere();
  }

  /* 3 · Warenkorb-Seite (warenkorb.html)
     Baut die Liste aus dem Speicher; − und + ändern die Menge, „Entfernen“ löscht den Artikel.
     MwSt. in Cent gerechnet und kaufmännisch gerundet. „Demo-Bestellung absenden“ leert nur den Warenkorb. */
  var bereich = document.getElementById("korb");

  if (bereich) {
    var el = function (tag, attribute, text) {
      var e = document.createElement(tag);
      Object.keys(attribute || {}).forEach(function (k) { e.setAttribute(k, attribute[k]); });
      if (text !== undefined) e.textContent = text;
      return e;
    };
    var mengeText = function (p, menge) { return p.monate ? menge + " Monate" : String(menge); };

    var zeigeUeberschrift = function (text) {
      var h = el("h2", { id: "korb-titel", tabindex: "-1" }, text);
      bereich.appendChild(h);
      return h;
    };
    var zeigeLinkZuPaketen = function () {
      var p = el("p");
      p.appendChild(el("a", { "class": "btn", href: "index.html#produkte" }, "Zu den Paketen"));
      bereich.appendChild(p);
    };

    var zeigeKorb = function (fokus) {
      var korb = liesKorb();
      bereich.textContent = "";

      if (korb.length === 0) {
        zeigeUeberschrift("Ihr Warenkorb ist leer");
        bereich.appendChild(el("p", {}, "Wählen Sie ein Paket oder ein Bundle aus."));
        zeigeLinkZuPaketen();
        return;
      }

      var layout = el("div", { "class": "korb-layout" });
      var haupt = el("div", { "class": "korb-haupt" });
      haupt.appendChild(el("h2", { id: "korb-titel", tabindex: "-1" }, "Ihre Auswahl"));
      var liste = el("ul", { "class": "korb-liste" });
      var netto = 0;

      korb.forEach(function (a) {
        var p = PRODUKTE[a.id];
        var zeile = p.preis * a.menge;
        netto += zeile;

        var li = el("li", { "class": "korb-zeile" });

        var name = el("div", { "class": "korb-name" });
        name.appendChild(el("a", { href: p.link }, p.name));
        name.appendChild(el("span", { "class": "korb-einzel" }, p.monate ? mengeText(p, a.menge) + " × " + formatiere(p.preis) : "Festpreis"));
        li.appendChild(name);

        if (p.monate) {
          var menge = el("div", { "class": "korb-menge", role: "group", "aria-label": "Monate: " + p.name });
          var minus = el("button", { type: "button", "class": "menge-btn", "data-aktion": "minus", "data-id": a.id, "aria-label": "Monate verringern: " + p.name }, "−");
          var plus = el("button", { type: "button", "class": "menge-btn", "data-aktion": "plus", "data-id": a.id, "aria-label": "Monate erhöhen: " + p.name }, "+");
          minus.disabled = a.menge <= p.min;
          plus.disabled = a.menge >= maxMenge(a.id);
          menge.appendChild(minus);
          menge.appendChild(el("span", { "class": "menge-wert" }, mengeText(p, a.menge)));
          menge.appendChild(plus);
          li.appendChild(menge);
        }

        var summe = el("p", { "class": "korb-summe" });
        summe.appendChild(el("span", { "class": "sr-nur" }, "Summe: "));
        summe.appendChild(document.createTextNode(formatiere(zeile)));
        li.appendChild(summe);

        li.appendChild(el("button", { type: "button", "class": "korb-entfernen", "data-aktion": "entfernen", "data-id": a.id, "aria-label": "Entfernen: " + p.name }, "Entfernen"));

        liste.appendChild(li);
      });
      haupt.appendChild(liste);
      var weiter = el("p");
      weiter.appendChild(el("a", { "class": "korb-weiter", href: "index.html#produkte" }, "← Weiter ansehen"));
      haupt.appendChild(weiter);
      layout.appendChild(haupt);

      var mwst = Math.round(netto * MWST_PROZENT / 100);
      var abschluss = el("div", { "class": "korb-abschluss" });
      abschluss.appendChild(el("h2", { "class": "korb-box-titel" }, "Zusammenfassung"));
      var summen = el("dl", { "class": "korb-summen" });
      [["Zwischensumme netto", netto, ""], ["zzgl. " + MWST_PROZENT + " % MwSt.", mwst, ""], ["Gesamtbetrag", netto + mwst, "gesamt"]].forEach(function (r) {
        var zeile = el("div", r[2] ? { "class": r[2] } : {});
        zeile.appendChild(el("dt", {}, r[0]));
        zeile.appendChild(el("dd", {}, formatiere(r[1])));
        summen.appendChild(zeile);
      });
      abschluss.appendChild(summen);
      abschluss.appendChild(el("p", { "class": "korb-hinweis" }, "Digitale Leistung, kein Versand. Angebot nur für Unternehmen."));
      abschluss.appendChild(el("button", { type: "button", "class": "btn", "data-aktion": "bestellen" }, "Demo-Bestellung absenden"));
      layout.appendChild(abschluss);
      bereich.appendChild(layout);

      // Fokus nach dem Neuaufbau wiederherstellen (gesperrte Schaltfläche: die andere der Gruppe)
      if (fokus) {
        var ziel = bereich.querySelector('[data-aktion="' + fokus.aktion + '"][data-id="' + fokus.id + '"]');
        if (ziel && ziel.disabled) ziel = bereich.querySelector('[data-aktion="' + (fokus.aktion === "minus" ? "plus" : "minus") + '"][data-id="' + fokus.id + '"]');
        if (ziel) ziel.focus();
      }
    };

    bereich.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-aktion]");
      if (!b) return;
      var aktion = b.getAttribute("data-aktion");

      if (aktion === "bestellen") {
        speichereKorb([]);
        zeigeZahl([]);
        bereich.textContent = "";
        var h = zeigeUeberschrift("Demo-Bestellung abgeschickt");
        bereich.appendChild(el("p", {}, "Es wurde nichts bestellt und nichts bezahlt. Ihr Warenkorb ist jetzt leer."));
        zeigeLinkZuPaketen();
        h.focus();
        melde("Demo-Bestellung abgeschickt. Es wurde nichts bestellt und nichts bezahlt.");
        return;
      }

      var id = b.getAttribute("data-id");
      if (!istProdukt(id)) return;
      var p = PRODUKTE[id];
      var korb = liesKorb();
      var artikel = korb.filter(function (a) { return a.id === id; })[0];
      if (!artikel) { zeigeKorb(); return; }

      if (aktion === "entfernen") {
        korb = korb.filter(function (a) { return a.id !== id; });
        speichereKorb(korb);
        zeigeZahl(korb);
        zeigeKorb();
        document.getElementById("korb-titel").focus();
        melde("„" + p.name + "“ entfernt.");
        return;
      }

      if (aktion === "minus") artikel.menge = Math.max(artikel.menge - 1, p.min);
      if (aktion === "plus") artikel.menge = Math.min(artikel.menge + 1, maxMenge(id));
      speichereKorb(korb);
      zeigeZahl(korb);
      zeigeKorb({ aktion: aktion, id: id });
      melde("Monate für " + p.kurz + ": " + artikel.menge + ".");
    });

    zeigeKorb();
  }
})();
