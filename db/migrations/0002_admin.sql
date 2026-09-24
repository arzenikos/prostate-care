--- Inside postrgres db, create database, user + password
CREATE DATABASE postgres;
CREATE USER pgadmin WITH ENCRYPTED PASSWORD 'pgprostatecareadmin';
GRANT ALL PRIVILEGES ON DATABASE postgres TO pgadmin;

--- Connect to the database (a.k.a Getting inside the database)
--- \c postgres

--- Connect the schema too
GRANT ALL ON SCHEMA public to pgadmin;
ALTER DATABASE postgres OWNER TO pgadmin;