# Klarwerk AI – Demo-Shop (Regeln für Claude)

Quellen: `docs/Projektanweisungen_Klarwerk-AI.md`, `docs/Designsystem_Stil-C.md`. Bei Widerspruch gelten diese Dokumente.

## Projekt
- Demo-Shop für KI-Management-Leistungen, B2B für Industrieunternehmen. Alles ist erfunden: keine echten Firmen-, Personen- oder Kundendaten.
- Fünf Pakete in dieser Reihenfolge: Strategie (Conversational AI & Digital Analytics Strategy), Governance (Data Governance, Compliance & AI), Automatisierung (AI Automation & LowCode Integration), Agenten und BI (AI Agents & Generative Business Intelligence), Head of AI (Strategic AI Business Management).

## Arbeitsweise
- Knapp und sachlich antworten, ohne Füllsätze. Bei Unklarheit erst nachfragen, statt zu raten.
- In kleinen Schritten arbeiten: pro Runde eine Änderung. Fachbegriffe kurz erklären.
- Gestaltungsänderungen erst vorschlagen und nach Freigabe umsetzen. Gestaltungsentscheidungen in einem Satz begründen.

## Git und GitHub
- Git ist eingerichtet (Zweig `main`), GitHub CLI `gh` ist installiert.
- **Commit und Push nur, wenn ich ausdrücklich darum bitte.** Niemals von selbst committen, pushen, Zweige löschen oder Verlauf umschreiben (kein `--force`, kein `reset --hard` ohne Rückfrage).
- **Vor jedem Commit und Push alle betroffenen Dateien prüfen** auf Passwörter, API-Schlüssel, Tokens, private Schlüssel und echte persönliche Daten (echte Namen, Adressen, Telefonnummern, E-Mail-Adressen außer `*.example`). Fundstellen nennen und erst nach meiner Freigabe weitermachen.
- `.gitignore` schützt geheime Dateien (`.env`, `*.key`, `*.pem`, `credentials*`, `.claude/settings.local.json` usw.). Diese Regeln nicht aufweichen; neue geheime Dateien nie mit `git add -f` erzwingen.
- Vor jedem Git- oder gh-Befehl kurz sagen, was er tut und was ich selbst tun muss (z. B. Anmeldung bei GitHub).
- Anmeldung bei GitHub (`gh auth login`) mache ich selbst; keine Passwörter oder Tokens in Dateien oder Befehle schreiben.

## Ordnerstruktur (`website/`)
- `index.html`; `warenkorb.html`; `impressum.html`, `datenschutz.html` (Platzhalter, `body.seite-recht`); `orientierung/` (reifegrad-test.html: kostenloser Test; potenzial-check.html: Angebotsseite KI-Startworkshop mit Beispielergebnis, Dateiname bleibt); `leistungen/` (index.html, paketumfang.html: Kurzübersicht mit Links); `produkte/` (strategie.html, governance.html, automatisierung.html, agenten-bi.html, head-of-ai.html); `service/` (index.html, faq.html).
- Produktseiten: Inhalte (Enthalten, Sie erhalten, Ihre Mitwirkung) stehen nur dort, fest im HTML, `body.seite-produkt`. Laufzeit, Preis und Knöpfe („In den Warenkorb“, „Frage zum Paket?“ als mailto an `kontakt@klarwerk-ai.example`) im Kaufkasten. Warenkorb-Schaltflächen tragen `data-id` (strategie, governance, automatisierung, agenten-bi, head-of-ai, startpaket, umsetzungspaket, komplettpaket); Namen und Preise der Artikel stehen nur in der Produktliste in `js/app.js` (Preise in Cent).
- `css/klarwerk.css`: die gesamte Gestaltung. Keine `<style>`-Blöcke und keine `style="…"` in den Seiten. Seitenspezifisches CSS steht als beschrifteter Abschnitt mit Körperklasse davor (`.seite-reifegrad`, `.seite-potenzial`).
- `js/app.js` (auf allen Seiten: Handy-Menü, Produktliste mit Preisen, Warenkorb-Speicher und Zähler, Warenkorb-Seite), `js/reifegrad-test.js`, `js/potenzial-check.js`. Einbindung im `<head>` mit `defer`, kein JavaScript in den Seiten. Jeder Code-Teil läuft nur, wenn sein Element existiert.
- Versionsmarke: CSS und JS werden mit `?v=JJJJ-MM-TT` eingebunden (z. B. `klarwerk.css?v=2026-11-27`). Nach jeder Änderung an CSS oder JS die Marke auf allen 15 Seiten auf das aktuelle Datum setzen, damit Browser keine alte Datei aus dem Zwischenspeicher zeigen.
- `fonts/` (Source Sans 3, lokal) und `images/`.
- Jede Information gehört in genau einen Bereich.

## Gestaltung (Stil C „kontrastreich und kompakt“, freigegeben)
- Farben: Nachtblau #12284C (Logo, Kopf, Überschriften, dunkle Flächen), Petrolgrün #0B6B73 (nur Buttons und Links auf hellem Grund), Hellgrau #F4F6F8 (Hintergrund), Text #1A1A1A, Text leise #4A5568, Linie #D5DBE3, Demo-Leiste #FFD966 auf #1A1A1A, Teal #6FC2C9 (große Ziffern auf dunklem Grund), Hell auf dunkel #E1E8F4, Linie dunkel #2B4670, Hellblau #E4ECF7 (Kontaktbox).
- Knopfregel: gefüllt ist nur die wichtigste Aktion (Petrolgrün, auf dunklem Grund weiß); alle weiteren Aktionen nur mit Rahmen.
- Auf dunklen Flächen sind die Hauptbuttons weiß mit nachtblauer Schrift.
- Eine Schrift: Source Sans 3, lokal aus `website/fonts`. Fließtext 16 px, Zeilenabstand mindestens 1,5, linksbündig, etwa 80 Zeichen pro Zeile. Nur sechs Schriftgrößen: 14, 16, 20, 28, 40, 56 px. Startüberschrift 56 px (bis 860 px: 40 px). Mindestschrift 14 px.
- Ecken 4 px, eckige Buttons, Karten mit 4-px-Balken oben, kurzer Balken über jeder h2.
- Inhaltsbreite 1100 px. Umbrüche bei 1100, 860 und 560 px. Produktkarten (Nutzenzeile, Häkchenliste, Laufzeit, Preis) ab 1001 px drei plus zwei, 861 bis 1000 px zwei Spalten (fünfte Karte über die volle Breite), bis 860 px eine Spalte; bis 560 px kompakt mit kleinem Bild und zugeklappten Leistungen. Tabellen bis 700 px als Karten.
- Kopf: bis 860 px Schaltfläche „Menü“ (oben rechts, neben dem Warenkorb), darüber Navigation wie gewohnt. Letzter Menüpunkt ist der Knopf „Erstgespräch“; auf der Startseite markiert das Menü den aktuellen Abschnitt.
- Kopf läuft beim Scrollen mit (sticky). Warenkorb als Link zu `warenkorb.html` (Symbol, Wort, Zahl im Kreis) auf allen 15 Seiten. Gespeichert wird in localStorage („klarwerk-warenkorb“, nur Kennung und Menge) und erst beim Klick auf „In den Warenkorb“. Jedes Paket und Bundle liegt höchstens einmal im Warenkorb; Zähler = Anzahl der Artikel (Head of AI zählt als 1); bleibt nach Seitenwechsel und Neuladen. Gesperrter oder kaputter Speicher: Warenkorb leer, keine Fehlermeldung. Bis 560 px: Kopf in einer Zeile, Warenkorb nur als Symbol mit Zahl, Demo-Leiste in Kurzfassung.
- Rückmeldungen des Warenkorbs als kurze Einblendung (role="status") mit Link „Zum Warenkorb“, ab 861 px oben rechts, darunter unten; der Knopf zeigt kurz „✓ Hinzugefügt“. Kein Meldungskasten im Inhalt.
- Preise 28 px fett in Nachtblau; Bundles mit Häkchenliste und Etikett „Sie sparen … €“ (weiß auf Petrolgrün), Startpaket als „Empfohlen zum Einstieg“.
- Team im Bereich „Über uns“ als gezeichnete Avatare `images/team-1..4.svg` (keine Fotos, leerer Alt-Text, Name steht darunter).
- Titelbild: eigene Grafik `images/start.svg` im Stil der Produktbilder; alle Bilder selbst erstellt.
- Startseite als Kundenreise: Kopf, Start (Nutzenversprechen, Hauptknopf „In 2 Schritten starten“ zur Orientierung), Orientierung (einziger Knopf zum Reifegrad-Test), fünf Produktkarten, Bundles, Service (Kurzfassung), Über uns, Kontakt (helle Kontaktbox), Fußbereich. Das Beispielergebnis (erfundener Musterbericht) steht auf der Workshop-Seite (potenzial-check.html#beispiel).

## Pflichten
- Nichts von fremden Servern laden: keine Schriften, Skripte, Bilder oder externen Links.
- WCAG AA: Text mindestens 4,5 : 1, Bedienelemente 3 : 1. Bilder mit Alternativtext. Alles per Tastatur bedienbar, Fokus sichtbar.
- Bei 320 px Breite nichts seitlich scrollen. Tippflächen mindestens 24 × 24 px (Menü-Schaltfläche 44 × 44 px).
- Oben auf jeder Seite der Hinweis „Demo-Shop: keine echten Bestellungen“ (B2B, Preise netto).
- Preise netto, großer Preis mit kleinem Hinweis „zzgl. MwSt.“, sonst nichts Kleingedrucktes am Preis.
- Keine Bezahlfunktion: „In den Warenkorb“ zeigt nur eine Bestätigung. Die Warenkorb-Seite zeigt die Artikel (Festpreis; nur bei Head of AI Monate mit −/+, mindestens 3) und rechts den Kasten „Zusammenfassung“ mit Zwischensumme netto, 19 % MwSt. (in Cent, kaufmännisch gerundet) und Gesamtbetrag; „Demo-Bestellung absenden“ leert nur den Warenkorb, es wird nichts bestellt oder bezahlt.
- Impressum und Datenschutzerklärung bleiben Platzhalter (eigene Seiten, im Fußbereich jeder Seite verlinkt).
- Bilder nur lizenzfrei, Bildnachweis im Fußbereich jeder Seite und in `docs/Bildnachweise_und_Lizenzen.md`.
- Shop-Texte kurz, sachlich, freundlich; Kunden mit „Sie“ ansprechen.

## Vorschau
- Lokaler Server: `node .claude/vorschau-server.js` → http://127.0.0.1:8000 (nur lokal, keine Zusatzpakete).
