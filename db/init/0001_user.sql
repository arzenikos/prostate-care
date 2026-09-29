--- Inside postrgres db, create database, user + password
CREATE DATABASE prostatecaredb;
CREATE USER '${POSTGRES_USER}' WITH ENCRYPTED PASSWORD '${POSTGRES_PASSWORD}';
GRANT ALL PRIVILEGES ON DATABASE '${POSTGRES_DB}' TO '${POSTGRES_USER}';

--- Connect to the database (a.k.a Getting inside the database)
--- \c prostatecaredb

--- Connect the schema too
ALTER DATABASE '${POSTGRES_DB}' OWNER TO '${POSTGRES_USER}';

