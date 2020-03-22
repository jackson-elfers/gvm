<p align="center">
  <img src="./public/images/banner.png">
</p>

<p align="center">
 <img src="https://img.shields.io/badge/License-MIT-blue.svg">
   <a href=""><img src="https://travis-ci.com/jackson-elfers/bontaki.svg?branch=master"></a>
</p>

<p align="center">Live Chat focused on the Cultivation of helpful Conversation.</p>

> **Warning**: Bontaki is still in active development. Unit tests are still being
> written and the api hasn't been documented or stabilized.

## Development Installation

### Preinstallation

1. install/create mysql database on ubuntu linux 19.10

```
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation utility
sudo systemctl start mysql
sudo mysql -u root -p
create database dev;
exit
```

### Installation

1. clone the repo

```
git clone https://github.com/jackson-elfers/bontaki.git
cd bontaki
npm install && cd client && npm install && cd ..
```

2. create server .env

```
PORT=5000
MYSQL_CONNECTION_LIMIT=100
MYSQL_HOST=localhost
MYSQL_USER=admin
MYSQL_PASSWORD=12345
MYSQL_DATABASE=dev

JWT_SECRET=01308163-c262-4f9a-b1a5-80e388670eca
JWT_EXPIRATION=3600

REDIS=false
REDIS_HOST=
REDIS_PORT=

RECAPTCHA_SECRET_KEY=

```

3. obtain recaptcha credentials from [www.google.com](https://www.google.com/recaptcha/intro/v3.html)

### Start and Run

1. start the development server

```
npm run dev
```
