# rtp-vue-app

Simple app to use with [fusionfabric.cloud](https://www.fusionfabric.cloud) [api](https://developer.fusionfabric.cloud) and Fusion Global PayPlus

[Contact Co-Author](mailto:pierre.quemard@finastra.com)
[Contact Co-Author](mailto:michael.whiote@finastra.com)

## Project setup

> This project has little to no dependency, it will use cache token until expiration.

### Install

Make sure you have [nodejs](https://nodejs.org/en/) installed.

Load dependencies for the project

```
npm install
```

### Configure

Set `.env` file

```bash
# FFDC Related details
CLIENT_ID=MyClient_ID
CLIENT_SECRET=MyClient_Secret
TOKEN_URL=

# Server configuration
PORT=A_NUMBER
```

## Usage

### Test and run

first step

```
npm run build
```

Second Step

```
npm run test
```

### Native OAuth2 B2B _client_credentials_ library

Utilized [ffdc-simple-oauth-b2b](https://github.com/fusionfabric/ffdc-simple-oauth-b2b) for the B2B OIDC Authentication

### Demonstrate the Application

Navigate to [localhost:8000](http://localhost:8000) to demonstrate the application
