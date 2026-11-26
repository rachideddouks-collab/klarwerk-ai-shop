# Entscheidungsprotokoll

| Thema | Entscheidung |
|---|---|
| Name | Klarwerk AI (sachlich, modern) |
| Preise | netto, kleiner Hinweis „zzgl. MwSt.“ (B2B); bei Verbrauchern wäre § 6 PAngV zu prüfen |
| Abgabe | `Klarwerk-AI.zip` mit Ordner `website`, getrennte Seiten, lokal per Doppelklick |
| Chat-Vorschau | nur zum Ansehen; Links zwischen Seiten zeigen einen Hinweis „Externen Link öffnen“, mailto und Druck gehen nicht |
| Struktur | Bereiche als Ordner (orientierung, leistungen, service); Produktkarten mit Warenkorb bleiben auf der Startseite (Shop) |
| Stil | C „kontrastreich und kompakt“ freigegeben |
| Produktbilder | selbst gezeichnete SVG-Illustrationen in einer Reihe |
| Produktkarten | fünf in einer Reihe ab 1101 px, gleiche Geometrie |
| Startbild | Foto „Digital brain in head profile“ (geralt, Pixabay Content License); eigene Entwürfe wurden verworfen |
| Tablet-Kopf | Warenkorb oben rechts, Navigation darunter (561 bis 860 px) |
| Arbeitsregel | Gestaltung erst vorschlagen, nach Freigabe umsetzen |
| Preise 25.11.2026 | Tagessatz 1.000 € netto, Preis mindestens Aufwand plus 10 % Puffer, am Markt orientiert: Strategie 5.200 €, Governance 5.900 €, Automatisierung 8.900 €, Agenten & BI 11.900 €, Head of AI 6.900 € pro Monat |
| Paket 3 | 2 Prozesse statt 3 (überschaubare Prozesse, Standardschnittstellen) |
| Paket 4 | Leistungstext mit Hinweis „keine Rechtsberatung“ |
| Kundenkreis | nur Unternehmen (B2B), Preise netto |
| B2B-Hinweis | 25.11.2026: In der Demo-Leiste oben auf allen 7 Seiten: „Angebot ausschließlich für Unternehmen (B2B), alle Preise netto zzgl. MwSt.“ (gleiche Farben, Kontrast unverändert) |
| Vorschaubilder | 25.11.2026: 21 Screenshots neu erzeugt (1440, 768, 390 px), kein seitliches Überlaufen |
| Bundles | 25.11.2026: drei Bundles, jedes Paket bleibt einzeln buchbar. Startpaket (1 + 4) 10.600 €, Umsetzungspaket (3 + 2) 19.800 €, Komplettpaket (1 + 4 + 3 + 2) 30.000 €; Ersparnis 4,5 bis 6 %, immer über Aufwand plus 10 %. Paket 5 nicht enthalten, monatlich dazubuchbar. Umgesetzt auf der Startseite (unter den Paketen) und in der Leistungsübersicht |
| Design-Feinschliff | 25.11.2026: Warenkorb auf allen Seiten mit Zähler über Seitenwechsel, kurze Einblendung statt Meldungskasten, Handy-Kopf einzeilig und Demo-Leiste kurz, Preise 24 px, Bundles mit Abstand und Etikett „Sie sparen“, einheitliche linke Kante im Produktbereich, Kopf mitlaufend, Preise und Warenkorb im Leistungsumfang, Team mit Initialen, flachere Bilder am Handy, Favicon, Menü mit Trennlinien. Sicherung vorher: C:\projekte\klarwerk_ai_sicherung_2026-11-25_vor-design |
| Startbild | 25.11.2026: Eigene Grafik als Vorschlag erstellt (archiv/hero-entwuerfe/start-vorschlag-2026-11-25.svg), noch nicht eingebaut; Entscheidung offen, weil eigene Entwürfe früher verworfen wurden |
| Startbild (neu) | 25.11.2026: eigene Grafik website/images/start.svg ersetzt das Pixabay-Foto (Freigabe Rachid); Bildnachweis auf allen 7 Seiten angepasst; Foto in archiv/startbild-pixabay/ |
| Produktseiten | 26.11.2026: je Paket eine eigene Seite in website/produkte/ (Bild, Kategorie, Beschreibung, Laufzeit, Preis, Enthalten, Sie erhalten, Ihre Mitwirkung, Warenkorb). Bild und Name der Produktkarten sowie Paketnamen in den Bundles verlinken darauf. paketumfang.html ist nur noch Kurzübersicht mit „Details ansehen“. Warenkorb-Schaltflächen mit fester Kennung (data-id). Head of AI: „Mindestlaufzeit 3 Monate“ nur noch am Preis |
| Warenkorb | 26.11.2026: localStorage statt sessionStorage („klarwerk-warenkorb“, nur Kennung und Menge, gespeichert erst beim Klick). Preise nur in der Produktliste in js/app.js (Cent), Anzeige mit Intl.NumberFormat. Warenkorb im Kopf wird Link zu warenkorb.html. Zähler = Summe der Mengen, Head of AI zählt als 1 Artikel. Head of AI: Menge = Monate, Start und Minimum 3. Warenkorb-Seite mit −/+, Entfernen, Zwischensumme, 19 % MwSt. (Cent, kaufmännisch gerundet), Gesamtbetrag und „Demo-Bestellung absenden“ (Bestätigung als Seiteninhalt, leert den Warenkorb). data-name an den Schaltflächen entfernt |
| Fremde Bilder | 26.11.2026: Pixabay-Original und früheres Titelfoto nach `C:\projekte\klarwerk_ai_privat\` verschoben, in `.gitignore` ausgeschlossen; das öffentliche Repository enthält keine fremden Bilder |
| Design-Überarbeitung | 26.11.2026: 16 Punkte einzeln per Vorher/Nachher-Bild freigegeben: (1) Test am Handy: Fragen zuerst, Fortschritt (2) eine Knopfregel (3) Paketkarten 3 + 2 mit Nutzenzeile (4) kompakte Startseite am Handy (5) Tabellen am Handy als Karten (6) neue Warenkorb-Rückmeldung (7) kürzerer Startbereich, Hauptknopf Reifegrad-Test (8) Menüknopf „Erstgespräch“, Scroll-Markierung (9) Bundles mit Häkchenliste, Startpaket empfohlen (10) Produktseiten mit Kaufkasten und „Frage zum Paket?“ (11) Beispielergebnis (12) Avatare statt Initialen (13) sechs Schriftgrößen (14) helle Kontaktbox (15) eigene Seiten für Impressum und Datenschutz (16) Warenkorb: Pakete nur einmal, Zusammenfassung als Kasten. Ersetzt die früheren Entscheidungen „fünf Karten in einer Reihe“ und „Team mit Initialen“ |
