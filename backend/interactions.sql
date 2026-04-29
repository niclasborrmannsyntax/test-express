/* Lege Tabelle für Nutzer an. */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL
);
/* Erstellt zwei Nutzer mit seriell generierter ID und gesetztem Nutzernamen. */
INSERT INTO users (username) VALUES ('mario93');
INSERT INTO users (username) VALUES ('till85');

/* Gib alle Nutzer aus. */
SELECT * FROM users;

/* Ändere Nutzer. */
UPDATE users SET username = 'm93' WHERE id = 1;

/* Lösche Nutzer per ID. */
DELETE FROM users WHERE id = 1;

/* Lösche gesamte Nutzer Tabelle (Vorsicht!) */
DROP TABLE users;