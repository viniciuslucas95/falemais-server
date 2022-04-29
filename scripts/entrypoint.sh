#!/bin/bash
export PGPASSWORD='admin'
psql -U 'postgres' <<- EOSQL
    CREATE DATABASE dev;
    CREATE ROLE dev WITH
    	LOGIN
	    NOSUPERUSER
	    NOCREATEDB
	    NOCREATEROLE
	    INHERIT
	    NOREPLICATION
	    CONNECTION LIMIT -1
	    PASSWORD 'dev';
    GRANT CONNECT ON DATABASE dev TO dev;
	\c dev;
	CREATE TABLE tariffs (
	id SMALLSERIAL PRIMARY KEY,
	origin_ddd SMALLINT NOT NULL,
    destiny_ddd SMALLINT NOT NULL,
    price_per_min DECIMAL NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
    );
	INSERT INTO tariffs (origin_ddd, destiny_ddd, price_per_min) VALUES(11, 16, 1.9);
	INSERT INTO tariffs (origin_ddd, destiny_ddd, price_per_min) VALUES(16, 11, 2.9);
	INSERT INTO tariffs (origin_ddd, destiny_ddd, price_per_min) VALUES(11, 17, 1.7);
	INSERT INTO tariffs (origin_ddd, destiny_ddd, price_per_min) VALUES(17, 11, 2.7);
	INSERT INTO tariffs (origin_ddd, destiny_ddd, price_per_min) VALUES(11, 18, 0.9);
	INSERT INTO tariffs (origin_ddd, destiny_ddd, price_per_min) VALUES(18, 11, 1.9);
	CREATE TABLE plans (
	id SMALLSERIAL PRIMARY KEY,
	name varchar NOT NULL UNIQUE,
    bonus INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
    );
	INSERT INTO plans(name, bonus) VALUES('FaleMais 30', 30);
	INSERT INTO plans(name, bonus) VALUES('FaleMais 60', 60);
	INSERT INTO plans(name, bonus) VALUES('FaleMais 120', 120);
    GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE public.tariffs TO dev;
    GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE public.plans TO dev;
	GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dev;
EOSQL