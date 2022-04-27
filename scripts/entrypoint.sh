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
    GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE public.tariffs TO dev;
EOSQL