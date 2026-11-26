# Klarwerk AI – Demo-Shop

Übungsprojekt (Kurs „KI-Manager“, Tag 42, Vibe Coding I, DataSmart Point) von Rachid Eddouks.
Fiktiver B2B-Online-Shop für fünf KI-Management-Leistungspakete. **Alle Firmen, Produkte, Preise und Daten sind erfunden.** Keine Bezahlfunktion, keine echten Kundendaten.

## Starten
ZIP entpacken, dann `website/index.html` per Doppelklick im Browser öffnen. Alle Links, E-Mail-Versand (mailto) und PDF-Druck funktionieren nur so, nicht in einer Chat-Vorschau.

Alternativ lokale Vorschau mit Node.js (ohne Zusatzpakete): `node .claude/vorschau-server.js`, dann http://127.0.0.1:8000 öffnen.

## Inhalt
| Ordner / Datei | Zweck |
|---|---|
| `website/` | die fertige Website (statisch: HTML, CSS, etwas JavaScript, keine Server, keine externen Schriften) |
| `website/css/klarwerk.css` | die gesamte Gestaltung aller 7 Seiten |
| `website/js/` | `app.js` (Handy-Menü und Warenkorb, alle Seiten), `reifegrad-test.js`, `potenzial-check.js` |
| `docs/` | Konzept, Projektanweisungen, Designsystem, Entscheidungen, Abnahme-Checkliste, Bildnachweise, Ordnerstruktur |
| `CLAUDE.md` | Regeln für Claude (Kurzfassung aus `docs/`) |
| `vorschau/` | ganzseitige Screenshots aller 7 Seiten bei 1440 px (Rechner), 768 px (Tablet), 390 px (Handy), Stand 25.11.2026 |
| `archiv/hero-entwuerfe/` | verworfene eigene Entwürfe für das Startbild (SVG) |

Das frühere Titelbild (Pixabay) liegt nur noch außerhalb des Projekts in `C:\projekte\klarwerk_ai_privat\` und ist nicht Teil des Repositorys.

## Seiten (website/)
- `index.html` Startseite: Start, Orientierung, fünf Produktkarten mit Demo-Warenkorb, Service-Kurzfassung, Über uns, Kontakt
- `orientierung/reifegrad-test.html` KI-Reifegrad-Test (12 Fragen, Ergebnis per E-Mail)
- `orientierung/potenzial-check.html` Angebot KI-Potenzial-Check (Formular, Unterschrift, PDF-Druck)
- `leistungen/index.html` Paketübersicht (Tabelle), `leistungen/paketumfang.html` Umfang je Paket
- `service/index.html` Zusagen, Ablauf, Support; `service/faq.html` 7 häufige Fragen

## Die fünf Pakete (netto, zzgl. MwSt.)
Strategie 5.200 € · Governance 5.900 € · Automatisierung (2 Prozesse) 8.900 € · Agenten & BI 11.900 € · Head of AI 6.900 € pro Monat
Bundles: Startpaket (1 + 4) 10.600 € · Umsetzungspaket (3 + 2) 19.800 € · Komplettpaket (1 + 4 + 3 + 2) 30.000 €

## Stand
Fertig und geprüft (siehe `docs/Abnahme-Checkliste.md`). Offene Punkte: Impressum und Datenschutzerklärung sind bewusst Platzhalter; Prüfung auf echten Geräten steht aus.

25.11.2026: Projektstruktur aufgeräumt. CSS vollständig in `klarwerk.css`, JavaScript in `website/js/`, Handy-Menü (Schaltfläche „Menü“ bis 860 px) auf allen 7 Seiten. Vorschau-Screenshots in `vorschau/` neu erzeugt.
