# node-api-oauth2-boilerplate

A boilerpate REST API application using Node.js, Express, MongoDB etc. It implements the authentication by OAuth2 protocol via Passport and OAuth2orize.

## Install
1. Install Node.js and MongoDB.
2. Install required dependencies:
```sh
$ npm i
```
#### Generate a demo data
If you want to see how it works you can run the command below for populating your DB:
```sh
$ node data/generator.js
```

## Start API in the development environment

To run this app execute the code below in your terminal:
```sh
$ npm run dev
```

## Usage
#### Authorization Code Request
```
GET /api/oauth2/authorize?response_type=code&amp;client_id=android HTTP/1.1
Host: localhost:4002
Authorization: Basic dXNlckBtYWlsLmNvbToxMjM0NTY3ODk=
```

#### Access Token Request
```
POST /api/oauth2/token HTTP/1.1
Host: localhost:4002
Authorization: Basic dXNlckBtYWlsLmNvbToxMjM0NTY3ODk=
Content-Type: application/x-www-form-urlencoded

client_id=android&client_secret=1234567890&grant_type=authorization_code&code=a118dd6b74c754ea84ee5166fa90aecfc4042c7071447cee324639d3d1f3a3dc
```
Where **code** - Access Code that was resived in the previous step.

#### Use the Refresh Token to Request a New Access Token
```
POST /api/oauth2/token HTTP/1.1
Host: localhost:4002
Authorization: Basic dXNlckBtYWlsLmNvbToxMjM0NTY3ODk
Content-Type: application/x-www-form-urlencoded

client_id=android&client_secret=1234567890&grant_type=refresh_token&refresh_token=377be1d4097f95c4b18f37b8fa6a70fb8f062fa537606d1bc93ddc1d12b0a0ec
```

#### Use the Access Token to Access the Resource
```
GET /api/v1/users HTTP/1.1
Host: localhost:4002
Authorization: Bearer 2c11760cfd870a657c7fca17541e8b43637cf196b7affa763c8491c9bfb36c2e
Cache-Control: no-cache
```

## Documentation
The documentation is implemented via [apiDoc](http://apidocjs.com/).
For opening the documentation run:
```sh
$ npm run apidoc:open
```

## Author

Created by Alexander Shlinchak ([@ashlinchak](<mailto:ashlinchak@gmail.com>)).
