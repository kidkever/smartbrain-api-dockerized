BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Yolanda', 'yolanda@gmail.com', 5, '2020-01-01');
INSERT into login (hash, email) values ('$2b$10$zZS9lMpulkIDLfVbZSTBL.MBYt7iOJl/hJFTPXf8lEZ/4rbnPPc76', 'yolanda@gmail.com');

COMMIT;