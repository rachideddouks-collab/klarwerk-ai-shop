# Klarwerk AI – Demo-Shop

**Online ansehen:** https://rachideddouks-collab.github.io/klarwerk-ai-shop/
Veröffentlicht mit GitHub Pages aus dem Ordner `website/` (Workflow `.github/workflows/pages.yml`, bei jedem Push auf `main`).

Übungsprojekt (Kurs „KI-Manager“, Tag 42, Vibe Coding I, DataSmart Point) von Rachid Eddouks.
Fiktiver B2B-Online-Shop für fünf KI-Management-Leistungspakete. **Alle Firmen, Produkte, Preise und Daten sind erfunden.** Keine Bezahlfunktion, keine echten Kundendaten.

## Starten
Online über den Link oben, oder lokal `website/index.html` per Doppelklick öffnen.

Alternativ lokale Vorschau mit Node.js (ohne Zusatzpakete): `node .claude/vorschau-server.js`, dann http://127.0.0.1:8000 öffnen.

## Inhalt
| Ordner / Datei | Zweck |
|---|---|
| `website/` | die fertige Website (statisch: HTML, CSS, etwas JavaScript, keine Server, keine externen Schriften) |
| `website/css/klarwerk.css` | die gesamte Gestaltung aller 15 Seiten |
| `website/js/` | `app.js` (Handy-Menü, Produktliste mit Preisen, Warenkorb und Warenkorb-Seite, alle Seiten), `reifegrad-test.js`, `potenzial-check.js` |
| `.github/workflows/pages.yml` | veröffentlicht `website/` mit GitHub Pages |
| `docs/` | Konzept, Projektanweisungen, Designsystem, Entscheidungen, Abnahme-Checkliste, Bildnachweise, Ordnerstruktur |
| `CLAUDE.md` | Regeln für Claude (Kurzfassung aus `docs/`) |
| `vorschau/` | 45 ganzseitige Screenshots aller 15 Seiten bei 1440 px (Rechner), 768 px (Tablet), 390 px (Handy), Stand 26.11.2026; Warenkorb mit Beispielinhalt |
| `archiv/hero-entwuerfe/` | verworfene eigene Entwürfe für das Startbild (SVG) |

Das frühere Titelbild (Pixabay) liegt nur noch außerhalb des Projekts in `C:\projekte\klarwerk_ai_privat\` und ist nicht Teil des Repositorys.

## Seiten (website/)
- `index.html` Startseite: Start, Orientierung, Beispielergebnis, fünf Produktkarten mit Demo-Warenkorb, Bundles, Service-Kurzfassung, Über uns, Kontakt
- `produkte/` je Paket eine Seite (strategie, governance, automatisierung, agenten-bi, head-of-ai)
- `warenkorb.html` Warenkorb mit Summen, Monatswahl für Head of AI und Demo-Bestellung
- `impressum.html`, `datenschutz.html` Platzhalterseiten
- `orientierung/reifegrad-test.html` KI-Reifegrad-Test (12 Fragen, Ergebnis per E-Mail)
- `orientierung/potenzial-check.html` Angebot KI-Potenzial-Check (Formular, Unterschrift, PDF-Druck)
- `leistungen/index.html` Paketübersicht (Tabelle), `leistungen/paketumfang.html` Kurzübersicht mit Links zu den Produktseiten
- `service/index.html` Zusagen, Ablauf, Support; `service/faq.html` 7 häufige Fragen

## Die fünf Pakete (netto, zzgl. MwSt.)
Strategie 5.200 € · Governance 5.900 € · Automatisierung (2 Prozesse) 8.900 € · Agenten & BI 11.900 € · Head of AI 6.900 € pro Monat
Bundles: Startpaket (1 + 4) 10.600 € · Umsetzungspaket (3 + 2) 19.800 € · Komplettpaket (1 + 4 + 3 + 2) 30.000 €

## Stand
Fertig und geprüft (siehe `docs/Abnahme-Checkliste.md`). Offene Punkte: Impressum und Datenschutzerklärung sind bewusst Platzhalter; Prüfung auf echten Geräten steht aus.

25.11.2026: Projektstruktur aufgeräumt. CSS vollständig in `klarwerk.css`, JavaScript in `website/js/`, Handy-Menü (Schaltfläche „Menü“ bis 860 px) auf allen 7 Seiten. Vorschau-Screenshots in `vorschau/` neu erzeugt.

26.11.2026: Produktseiten, Warenkorb mit Summen (localStorage), Veröffentlichung mit GitHub Pages.

26.11.2026: Design-Überarbeitung (Punkte 1 bis 16, einzeln freigegeben, siehe `docs/Entscheidungsprotokoll.md`). Danach Rückweg-Link auf `potenzial-check.html` korrigiert und Screenshots in `vorschau/` für alle 15 Seiten neu erzeugt.
