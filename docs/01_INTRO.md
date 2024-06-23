## Tech-Stack
Für die Umsetzung des Projekts habe ich die Programmiersprache Java verwendet, das Spring Boot Framework für die App selbst und Vaadin für die Benutzeroberfläche und die grafische Darstellung. Für das Datenbankmanagementsystem habe ich PostgreSQL verwendet und das gesamte Projekt kann mit Maven kompiliert werden.

## Projektstruktur
Aurora setzt sich aus den folgenden Ordnern zusammen (`/src/main/java/com/livajusic/marko`):
* `/configuration`: In diesem Ordner wird Spring Security modifiziert, um Anfragen zuzulassen und die von den Benutzern hochgeladenen Inhalte so zu regulieren, wie sie vom Server bereitgestellt werden sollen.
* `/db_repos`: Interfaces aus diesem Ordner erweitern JpaRepository und ermöglichen so den Zugriff auf die jeweiligen Repositories.
* `/services`: Klassen aus diesem Ordner interagieren mit den Repositories aus (`/db_repos`) und aktualisieren die Werte in den Datenbanktabellen.
* `/tables`: Klassen aus diesem Ordner verwenden JPA, um die von Spring erstellten Tabellen zu modellieren.
* `/views`: Klassen aus diesem Ordner verwenden Vaadin, um die App im Web anzuzeigen.

## Schwierigkeiten / Design-Entscheidungen
Bisher bereitete mir die Anzeige jeglicher Bilder (sei es die Anzeige von GIFs, die von Nutzern hochgeladen wurden, oder von Profilbildern) Probleme, da ich sie zunächst als statische Dateien im Spring-Ordner /resource/ speicherte und nur ihre Pfade in der Datenbank hinterlegte. Trotz verschiedener Konfigurationen, die versuchten, die Erzeugung statischer Inhalte zu regeln, wurden nur die "alt"-Elemente von HTML angezeigt, da die Bilder nicht verfügbar waren. Erst nach einem Neustart der App konnten alle Bilder korrekt angezeigt werden. Da ich dies aber nicht wollte, habe ich die Datenbank so geändert, dass die Bilder als BLOBS gespeichert werden, was zwar zu einem Leistungsverlust führt, aber für den Benutzer viel angenehmer ist.

Weiter geht es mit dem Design der ![Datenbank][02_DATABASE.md]
