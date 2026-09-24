--- Inside postrgres db, create database, user + password
CREATE DATABASE prostatecaredb;
CREATE USER arzenikoss WITH ENCRYPTED PASSWORD 'pgprostatecarepass';
GRANT ALL PRIVILEGES ON DATABASE prostatecaredb TO arzenikoss;

--- Connect to the database (a.k.a Getting inside the database)
--- \c prostatecaredb

--- Connect the schema too
ALTER DATABASE prostatecaredb OWNER TO arzenikoss;