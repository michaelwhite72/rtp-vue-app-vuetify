<template>
  <div id="app">
    <v-app id="inspire">
      <!-- FIRST ROW OF ENTRIES -->
      <v-container fluid>
        <v-row align="center" justify="center">
          <!-- Autofill Transaction ID -->
          <v-col class="d-flex" cols="2" sm="4">
            <v-textarea
              outlined
              rows="1"
              name="paymentInformationId"
              label="Transaction ID"
              :value="`${paymentInformationId}`"
              readonly
            ></v-textarea>
          </v-col>
          <!-- Payee Name -->
          <v-col class="d-flex" cols="2" sm="4">
            <v-select
              v-model="payeeName"
              :items="names"
              label="Payee Name"
              outlined
            ></v-select>
          </v-col>
          <!-- Account Number -->
          <v-col class="d-flex" cols="12" sm="4">
            <v-select
              v-model="accountNumber"
              :items="accounts"
              label="Payee Account Number"
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
      <!-- SECOND ROW OF ENTRIES-->
      <v-container fluid>
        <!-- ENTRIES -->
        <v-row align="center" justify="center">
          <!-- DATE PAYMENT EXECUTED -->
          <v-col class="d-flex" cols="2" sm="4">
            <v-textarea
              rows="1"
              name="executionDate"
              label="Date to be Paid (YYYY-MM-DD)"
              :value="`${today}`"
              readonly
              outlined
            ></v-textarea>
          </v-col>
          <!-- AMOUNT FIELD -->
          <v-col class="d-flex" cols="2" sm="4">
            <v-text-field
              type="text"
              v-model="amount"
              label="Amount (USD)"
              outlined
            >
            </v-text-field>
          </v-col>
          <!-- MEMO / DESCRIPTION -->
          <v-col class="d-flex" cols="2" sm="4">
            <v-text-field
              v-model="memo"
              label="Memo / Description"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <h1 style="background-color: green">{{ successMsg }}</h1>
          <h1 style="background-color: orange">{{ errorMsg }}</h1>
        </v-row>
      </v-container>
      <!-- END 2ND ROW OF ENTRIES -->

      <!-- START POP-UP -->
      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">Verify</v-btn>
              <v-btn v-on:click="newPayment()" depressed color="grey">
                Clear / New
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <!-- VERIFICATION POP-UP -->
              <v-card>
                <v-toolbar color="purple" dark>
                  <h2>TransactionID: {{ paymentInformationId }}</h2>
                </v-toolbar>
                <v-card-text>
                  <div>
                    <br />
                    <h2>Payee:</h2>
                    <p>{{ payeeName }}</p>
                    <br />
                    <h2>Account Number:</h2>
                    <p>{{ accountNumber }}</p>
                    <br />
                    <h2>Amount:</h2>
                    <p>{{ amount }}</p>
                    <br />
                    <h2>Memo:</h2>
                    <p>{{ memo }}</p>
                    <br />
                    <h2>Date Payment to be executed:</h2>
                    <p>{{ executionDate }}</p>
                    <br />
                  </div>
                </v-card-text>
                <!-- POP-UP BUTTONS -->
                <v-card-actions class="justify-end">
                  <v-btn
                    text
                    @click="dialog.value = false"
                    depressed
                    color="error"
                    >CANCEL</v-btn
                  >
                  <v-btn
                    v-on:click="createPayment()"
                    @click="dialog.value = false"
                    depressed
                    color="green"
                  >
                    Make Payment
                  </v-btn>
                </v-card-actions>
              </v-card>
              <!-- END POP-UP VERIFICATION -->
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function () {
    return {
      // message: "Welcome to Vue.js!",
      errors: [],
      successMsg: "",
      errorMsg: "",
      token: "",
      today: moment().format("YYYY-MM-DD"),
      paymentInformationId: Math.floor(Math.random() * 100000000000),
      names: [
        "Acme Systems",
        "Ace Services",
        "Star Cleaning",
        "Gearshaft Automotive",
      ],
      payeeName: "",
      accounts: ["1309785469", "3711354879", "5261260818", "1309785469"],
      accountNumber: "",
      denomination: ["USD", "CAD", "EUR", "Mex$"],
      executionDate: "",
      currency: "",
      amount: "",
    };
  },
  async created() {
    const response = await axios.get("/api/login");
    const curToken = response.data.token;
    this.token = curToken;
    return (this.executionDate = moment().format("YYYY-MM-DD"));
  },

  methods: {
    // showPayment() {
    //   console.log(this.PayeeName);
    //   document.querySelector("#payment-details").showModal();
    // },

    newPayment() {
      this.$router.go();
    },

    async createPayment() {
      console.log(this.token);
      var data = {
        token: this.token,
        paymentInformationId: this.paymentInformationId,
        creditor: this.payeeName,
        creditorAccountId: this.accountNumber,
        executionDate: this.executionDate,
        amount: this.amount,
        memo: this.memo,
      };
      console.log(data);
      axios
        .post("/api/payment", data, {
          headers: { "Content-Type": "application/json" },
        })

        .then((response) => {
          console.log(response);
          this.successMsg = "Payment Successful";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.errorMsg = "Payment Unsuccessful";
        });
    },
  },
};
</script>
