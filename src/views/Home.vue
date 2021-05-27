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
      <!-- SECOND ROW OF ENTRIES / BUTTONS-->
      <v-container fluid>
        <!-- ENTRIES -->
        <v-row align="center" justify="center">
          <!-- DATE PAYMENT EXECUTED -->
          <v-col class="d-flex" cols="2" sm="4">
            <v-text-field
              v-model="executionDate"
              label="Date to be Paid (YYYY-MM-DD)"
              outlined
            ></v-text-field>
          </v-col>
          <!-- AMOUNT FIELD -->
          <v-col class="d-flex" cols="2" sm="4">
            <v-text-field v-model="amount" label="Amount" outlined>
            </v-text-field>
          </v-col>
          <!-- CURRENCY -->
          <v-col class="d-flex" cols="2" sm="4">
            <v-text-field
              v-model="memo"
              label="Memo / Description"
              outlined
            ></v-text-field>
          </v-col>
          <!-- Buttons for review payment and cancel -->
        </v-row>
        <!-- BUTTONS -->
        <!-- <v-row align="center" justify="center">
          <v-btn v-on:click="createPayment()" depressed color="primary">
            Transfer
          </v-btn>
          <v-btn depressed color="error">
            Clear
          </v-btn>
        </v-row> -->
      </v-container>
      <!-- END 2ND ROW OF ENTRIES / BUTTONS -->

      <!-- START POP-UP -->
      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">Verify</v-btn>
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

export default {
  data: function () {
    return {
      // message: "Welcome to Vue.js!",
      errors: [],
      token: "",
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
  },

  methods: {
    showPayment() {
      console.log(this.PayeeName);
      document.querySelector("#payment-details").showModal();
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
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
