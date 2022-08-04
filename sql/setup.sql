-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS gtas;

CREATE TABLE gtas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    occupation VARCHAR
);

INSERT INTO
    gtas (first_name, last_name, occupation)
VALUES
    (
        'Michael',
        'De Santa',
        'Former bank robber'
    ),
    (
        'Franklin',
        'Clinton',
        'Gang member, Repo man'
    ),
    (
        'Trevor',
        'Philips',
        'Drug addict, Former airman'
    ),
    (
        'Lamar',
        'Davis',
        'Deluxe Premium Motorsport Employee'
    );