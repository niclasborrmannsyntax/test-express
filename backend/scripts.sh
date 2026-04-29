# ------------
# docker
# ------------

# Starten der Datenbank
docker compose up -d db

# Zugriff auf die Datenbank über psql
docker compose exec db psql -U admin -d syntax_db

# Stoppen der Datenbank und Entfernen der Volumes
docker compose down -v

# Backup Database
docker compose exec db pg_dump -U admin syntax_db > backup.sql

# Restore Database
docker compose exec -T db psql -U admin -d syntax_db < backup.sql

# ------------
# psql
# ------------

# Zeigt Infos zur Verbindung
\conninfo
# Leert den Bildschirminhalt
\! clear
# Zeigt alle Tabellen
\dt
# Zeigt Strukturinfos zur Nutzer Tabelle
\d users
# Beendet die CLI
\q

