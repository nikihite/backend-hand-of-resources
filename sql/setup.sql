-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS gtas;
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS shapes;

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

CREATE TABLE planets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    color VARCHAR NOT NULL,
    sun VARCHAR NOT NULL
);

INSERT INTO
    planets (name, color, sun)
VALUES
    (
        'Mercury',
        'grey',
        'closest to the sun'
    ),
    (
        'Venus',
        'brown, grey',
        'second from the sun'
    ),
    (
        'Earth',
        'blue, brown, green, white',
        'third from the sun'
    ),
    (
        'Mars',
        'red, brown, tan',
        'fourth from the sun'
    ),
    (
        'Jupiter',
        'brown, orange, tan',
        'fifth from the sun'
    ),
    (
        'Saturn',
        'gold, brown, blue, grey',
        'sixth from the sun'
    ),
    (
        'Uranus',
        'blue, green',
        'seventh from the sun'
    ),
    (
        'Neptune',
        'blue',
        'eigth from the sun'
    );

    CREATE TABLE shapes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    sides VARCHAR NOT NULL
);

INSERT INTO
    shapes (name, sides)
VALUES
    (
        'Triangle',
        '3'
    ),
    (
        'Pentagon',
        '5'
    ),
    (
        'Square',
        '4'
    ),
    (
        'Hexagon',
        '6'
    );