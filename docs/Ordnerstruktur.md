# Ordnerstruktur

```
Klarwerk-AI/
├── README.md
├── CLAUDE.md (Regeln für Claude, Kurzfassung aus docs/)
├── .claude/ (launch.json, vorschau-server.js: lokale Vorschau unter http://127.0.0.1:8000)
├── docs/
│   ├── Konzept_Klarwerk-AI.md
│   ├── Projektanweisungen_Klarwerk-AI.md
│   ├── Designsystem_Stil-C.md
│   ├── Entscheidungsprotokoll.md
│   ├── Abnahme-Checkliste.md
│   ├── Bildnachweise_und_Lizenzen.md
│   └── Ordnerstruktur.md
├── website/
│   ├── index.html
│   ├── warenkorb.html (Warenkorb-Seite, Inhalt baut js/app.js auf; seit 26.11.2026)
│   ├── impressum.html, datenschutz.html (Platzhalter; seit 26.11.2026)
│   ├── css/klarwerk.css
│   ├── js/ (app.js: Handy-Menü, Produktliste mit Preisen, Warenkorb und Warenkorb-Seite, alle Seiten · reifegrad-test.js · potenzial-check.js)
│   ├── fonts/ (SourceSans3.ttf, OFL.txt)
│   ├── images/ (start.svg, produkt-1..5.svg, team-1..4.svg, favicon.svg, BILDNACHWEIS.txt)
│   ├── orientierung/ (reifegrad-test.html, potenzial-check.html)
│   ├── leistungen/ (index.html, paketumfang.html: Kurzübersicht mit Links auf die Produktseiten)
│   ├── produkte/ (strategie.html, governance.html, automatisierung.html, agenten-bi.html, head-of-ai.html; seit 26.11.2026)
│   └── service/ (index.html, faq.html)
├── vorschau/ (45 ganzseitige Screenshots: 15 Seiten x 1440, 768, 390 px, Stand 26.11.2026; Namen seite_geraet-breite.jpg, Produktseiten als produkt-…)
└── archiv/ (hero-entwuerfe/: verworfene SVG-Entwürfe)
```
Außerhalb des Projekts: `C:\projekte\klarwerk_ai_privat\` (Pixabay-Original und früheres Titelfoto, nicht im Repository).

Regel: Jede Information gehört in genau einen Bereich (Orientierung, Leistungen, Service). Der Leistungsumfang je Paket steht nur auf der jeweiligen Produktseite. Das gemeinsame Design liegt in `website/css/klarwerk.css`, das JavaScript in `website/js/` (eingebunden im `<head>` mit `defer`). CSS und JS tragen eine Versionsmarke `?v=JJJJ-MM-TT`, die nach jeder Änderung auf allen Seiten erneuert wird. In den HTML-Seiten stehen weder `<style>`, `style="…"` noch `<script>`-Code.