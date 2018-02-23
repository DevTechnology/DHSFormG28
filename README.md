# DHS Form G-28 System

## DHS G28 TEAM 1 

### Team Members

1.  James Caple
2.  Kamal Dhiman
3.  Matt Anderson
1.

## Project Goals
To build a suite of Docker Microservices, and an associated User Interface, for capturing data from the DHS Form G-28 in a modern UI, and for demonstrating a fully automated CI/CD Pipeline and Enterprise Deployment System.

- Project Start: 11/21/2017

## UI Module
### Environment Notes
- Angular CLI: 1.5.3
- Node: 6.11.2
- OS: win32 x64
- Angular: 5x

### Running API For Development
1.  cd API
1.  npm install
1.  Set the 'DHS_G28_ENV' environment variable per environment:
    1.  export DHS_G28_ENV=DEV
1.  The following environment variables are needed for connecting to PostgreSQL:
    1.  PGDATABASE
    1.  PGHOST
    1.  PGPASSWORD
    1.  PGPORT
    1.  PGUSER
1.  npm run server

### Running API In Docker
1.  cd API
1.  docker build -t dhsformg28-api:latest -f ./docker/container/Dockerfile .
1.  Set the 'DHS_G28_ENV' environment variable per environment:
    1.  export DHS_G28_ENV=DEV
1.  The following environment variables are needed for connecting to PostgreSQL:
    1.  PGDATABASE
    1.  PGHOST
    1.  PGPASSWORD
    1.  PGPORT
    1.  PGUSER
1.  docker run -p 3000:3000 -e DHS_G28_ENV -e PGDATABASE -e PGHOST -e PGPASSWORD -e PGPORT -e PGUSER dhsformg28-api:latest

### Running UI For Development
1.  cd UI
1.  npm install
1.  ng serve --open | ng serve --host=0.0.0.0 --open (makes access from mobile emulator easier)

### Building and Running UI In Docker
1.  cd UI
1.  ng build
1.  docker build -f docker/container/Dockerfile -t g28form:latest .
1.  docker run -p 8000:80 g28form:latest

# TLS Connection to PostgreSQL RDS

## To connect to PostgreSQL DB over SSL from Application

1. Download the certificate stored at https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem.
2. Import the certificate into your operating system.
3. Connect to your PostgreSQL DB instance over SSL by appending sslmode=verify-full to your connection string. When you use     sslmode=verify-full, the SSL connection verifies the DB instance endpoint against the endpoint in the SSL certificate.
4. Use the sslrootcert parameter to reference the certificate, for example, sslrootcert=rds-ssl-ca-cert.pem.
5. Example connection string: 
    $ psql -h testpg.cdhmuqifdpib.us-east-1.rds.amazonaws.com -p 5432 \
    "dbname=testpg user=testuser sslrootcert=rds-ca-2015-root.pem sslmode=verify-full"

## To connect to PostgreSQL DB over SSL from a DB Client (e.g. DBeaver)
1. Download the certificate stored at https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem.
2. Import the certificate into your operating system.
Open DBeaver and connect to your database.
3. Under Database Navigator, right click your connection name and click Edit Connection.
4. On the settings dialog, under Connection Settings choose Network.
5. Select SSL tab.
6. Check the checkbox 'Use SSL'.
7. Under Certificates, select Root Certificate, SSL Certificate and enter SSL Certificate Key.
8. Press OK.
9. Right click your connection again and select Reconnect.

##Require an SSL Connection to PostgreSQL DB
1. Make it require that connections to PostgreSQL DB instance use SSL by setting the rds.force_ssl parameter to 1 (on). By default, the rds.force_ssl parameter is set to 0 (off).
2. You can set the rds.force_ssl parameter value by updating the parameter group for your DB instance. If the parameter group for your DB instance isn't the default one, and the ssl parameter is already set to 1 when you set rds.force_ssl to 1, you don't need to reboot your DB instance. Otherwise, you must reboot your DB instance for the change to take effect.
