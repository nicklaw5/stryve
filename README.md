# Stryve
A self-hosted chat/messaging application, heavily inspired by [Discord](https://discordapp.com/) and [Slack](https://slack.com/).

## Prerequisites
- MySQL 5.6+ installed
- Composer installed

### Configure Database
Setup and configure your MySQL server how ever you like. Below are the defaults. You can change these in the `.env` file.
```
HOST=127.0.0.1
PORT=3306
DATABASE=stryve_db
USERNAME=stryve
PASSWORD=password123
```

### Setup Install API
Open a console window (Git Bash, Terminal, etc.)
```bash
$ cd ~
$ git clone https://github.com/nicklaw5/stryve-api-php.git
$ cd stryve-api-php
$ composer install
$ mv .env-example .env
$ php artisan key:generate
$ php artisan migrate:refresh --seed
$ php artisan serve --port=8181
```
Leave this console window running.

### Setup Socket Server
Open a new console window
```
$ cd `~
$ git clone https://github.com/nicklaw5/stryve.git
$ cd stryve
$ npm install
$ npm run server-dev
```
Leave this console window running.

### Run Web Client
Open a new console window
```
$ cd ~/stryve
$ npm run w-app
```
Leave this console window running and point your browser to http://localhost:8080/.

### Run Desktop Client
Open a new console window
```
$ cd ~/stryve
$ npm run d-app
```
