# Einleitung

Diese Dokumentation beschreibt den Demo-Shop „Klarwerk AI“, ein Übungsprojekt aus dem Kurs „KI-Manager“ (Vibe Coding). Klarwerk AI ist ein erfundener Anbieter, der Industrieunternehmen fünf KI-Management-Pakete verkauft: von der Strategie über Governance, Automatisierung sowie Agenten und BI bis zum „Head of AI“ auf Zeit. Alle Firmen, Personen, Preise und Ergebnisse sind erfunden. Der Shop nimmt keine echten Bestellungen an und hat keine Bezahlfunktion.

Ziel war nicht nur eine fertige Website. Ich wollte vor allem lernen, wie man mit einem KI-Assistenten (Claude Code) ein Webprojekt Schritt für Schritt aufbaut, prüft und sauber sichert. Dabei habe ich jede Aufgabe als eigenen Prompt formuliert. Wichtige Änderungen ließ ich mir zuerst als Plan oder Vorschlag zeigen und habe sie erst nach meiner Freigabe umsetzen lassen.

Die Arbeit verlief in vier Abschnitten:

1. **Aufräumen der Projektstruktur:** Die Gestaltung aller Seiten steht in einer CSS-Datei, das JavaScript in eigenen Dateien. Dazu kam ein Handy-Menü, das sich auch per Tastatur bedienen lässt. Konflikte zwischen alten und neuen Regeln wurden benannt und einzeln gelöst. Feste Regeln für die weitere Arbeit stehen in der Datei `CLAUDE.md`.
2. **Prüfen und Nachbessern:** Jede Änderung wurde in einer lokalen Vorschau bei Handy-, Tablet- und Rechnerbreite geprüft. Gefundene Fehler wurden behoben, etwa falsche Zeilenumbrüche im E-Mail-Text. Danach wurden neue Vorschaubilder erzeugt.
3. **Sichern mit Git und GitHub:** Der Projektordner wird mit Git versioniert und liegt in einem privaten GitHub-Repository. Eine `.gitignore` hält geheime Dateien fern. Commit und Push gibt es nur auf meine ausdrückliche Bitte. Vorher werden alle Dateien auf Passwörter, Schlüssel und echte persönliche Daten geprüft.
4. **Feinschliff des Seitenaufbaus:** Doppelte Inhalte wurden entfernt (der Reifegrad-Test ist nur noch einmal verlinkt). Das Beispielergebnis steht jetzt auf der Angebotsseite des KI-Startworkshops, zu der es gehört. Begriffe und Gestaltung wurden über alle Seiten abgestimmt.

Die folgenden Kapitel zeigen, welche Prompts ich verwendet habe, welche Entscheidungen daraus entstanden sind und was ich über die Zusammenarbeit mit einem KI-Assistenten gelernt habe.
