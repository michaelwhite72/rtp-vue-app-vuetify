//import axios from 'axios';
"use strict";
const axios = require("axios");
const qs = require("qs");

class Authenticator {
  constructor(client, secret, token) {
    this.client = process.env.CLIENT_ID || client;
    this.secret = process.env.CLIENT_SECRET || secret;
    this.tokenurl = process.env.TOKEN_URL || token;
    this.date = Date.now();
    this.expires_in = -1;
    this.token = "empty";
    console.log(
      "Initiate autentication with client_id: " +
        this.client +
        "\nToken URL: " +
        this.tokenurl
    );
  }

  async getToken() {
    const headers = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const data = qs.stringify({
      grant_type: "client_credentials",
      client_id: this.client,
      client_secret: this.secret,
    });
    //console.log("curTime: "+Date.now()+"\noldTime: "+this.date+"\nexpires: "+this.expires_in*1000);
    var curTime = this.date + this.expires_in * 1000;
    if (curTime < Date.now()) {
      try {
        //console.log("Fetching token");
        const res = await axios.post(this.tokenurl, data, headers);
        if (res.status == "200") {
          this.token = res.data.access_token;
          this.refresh_token = res.data.refresh_token;
          this.expires_in = res.data.expires_in;
          this.refresh_expires_in = res.data.refresh_expires_in;
          this.date = Date.now();
          var returnData = { token: res.data.access_token };
          return returnData;
        } else {
          throw res;
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      //console.log("Using local token");
      var returnData = { token: this.token };
      return returnData;
    }
  }
}

module.exports = Authenticator;
