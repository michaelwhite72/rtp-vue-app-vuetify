<template>
  <div id="app">
    <v-app-bar app color="blue">
      <div class="d-flex align-center">
        <h1>MAINE SEAFOOD DISTRIBUTORS</h1>
      </div>

      <v-spacer></v-spacer>

      <!-- ROUTING BUTTONS -->
      <v-btn v-on:click="homePage()" color="white" text rounded class="my-2">
        Home
      </v-btn>

      <v-btn
        v-on:click="managePayments()"
        color="red"
        text
        rounded
        class="my-2"
      >
        Manage Payments
      </v-btn>

      <v-btn color="green darken-4" text rounded class="my-2">
        Request Payment
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!-- END ROUTING BUTTONS -->
    </v-app-bar>

    <!-- MAINE SEAFOOD IMAGE -->
    <v-img
      lazy-src="../images/lobsters.jpeg"
      max-height="300"
      src="../images/seafood.jpeg"
    ></v-img>
    <!-- END MAINE SEAFOOD IMAGE -->

    <!-- WELCOME MESSAGE -->
    <div class="home">
      <h1>{{ message }}</h1>
    </div>
    <!-- END WELCOME MESSAGE -->

    <!-- ADD BREAK -->
    <v-container fluid> </v-container>

    <!-- FIRST ROW OF ENTRIES -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <!-- Autofill Transaction ID -->
        <v-col class="d-flex" cols="4" sm="3">
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
        <v-col class="d-flex" cols="4" sm="3">
          <v-select
            v-model="customerName"
            :items="customers"
            label="Customer Name"
            outlined
          ></v-select>
        </v-col>
        <!-- END PAYEE NAME -->

        <!-- DATE TO BE EXECUTED -->
        <v-col class="d-flex" cols="4" sm="3">
          <v-textarea
            rows="1"
            name="executionDate"
            label="Date (YYYY-MM-DD)"
            :value="`${today}`"
            readonly
            outlined
          ></v-textarea>
        </v-col>
        <!-- END EXECUTION DATE -->
      </v-row>
    </v-container>

    <!-- SECOND ROW OF ENTRIES -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <!-- TUNA-->
        <v-col class="d-flex" cols="2" sm="4">
          <v-slider
            v-model="tuna.val"
            :label="tuna.label"
            :thumb-color="tuna.color"
            thumb-label="always"
          ></v-slider>
        </v-col>
        <!-- END TUNA -->

        <!-- LOBSTER -->
        <v-col class="d-flex" cols="2" sm="4">
          <v-slider
            v-model="lobster.val"
            :label="lobster.label"
            :thumb-color="lobster.color"
            thumb-label="always"
          ></v-slider>
        </v-col>
        <!-- END LOBSTER -->

        <!-- CRAB -->
        <v-col class="d-flex" cols="2" sm="4">
          <v-slider
            v-model="crab.val"
            :label="crab.label"
            :thumb-color="crab.color"
            thumb-label="always"
          ></v-slider>
        </v-col>
        <!-- END CRAB -->

        <!-- START POP-UP -->
        <v-row justify="space-around">
          <v-col cols="auto">
            <v-dialog transition="dialog-bottom-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <!-- SHOW PAYMENT REQUEST BUTTON -->
                <v-btn
                  v-on:click="showPaymentRequest"
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  >Show Payment Request</v-btn
                >
                <!-- END SHOW PAYMENT REQUEST -->

                <!-- CLEAR/NEW BUTTON -->
                <v-btn v-on:click="newPayment()" depressed color="grey">
                  Clear / New
                </v-btn>
                <!-- END CLEAR / NEW BUTTON -->
              </template>
              <template v-slot:default="dialog">
                <!-- VERIFICATION POP-UP -->
                <v-card>
                  <v-toolbar color="light-green ">
                    <h2>TransactionID: {{ paymentInformationId }}</h2>
                  </v-toolbar>
                  <v-card-text>
                    <div>
                      <br />
                      <h2>Customer Name:</h2>
                      <p>{{ customerName }}</p>
                      <br />
                      <h2>Date:</h2>
                      <p>{{ executionDate }}</p>
                      <br />
                      <br />
                      <h2>Tuna Total: $ {{ tunaTotal.toFixed(2) }}</h2>
                      <p>qty: {{ tuna.val }}</p>
                      <p>Price: $4 per pound</p>
                      <br />
                      <h2>Lobster Total: $ {{ lobsterTotal.toFixed(2) }}</h2>
                      <p>qty: {{ lobster.val }}</p>
                      <p>Price: $3 per pound</p>
                      <br />
                      <h2>Crab Total: $ {{ crabTotal.toFixed(2) }}</h2>
                      <p>qty: {{ crab.val }}</p>
                      <p>Price: $5 per pound</p>
                      <br />
                      <br />
                      <h1>
                        Total Payment Requested: $ {{ salesTotal.toFixed(2) }}
                      </h1>
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
                      v-on:click="makePayment()"
                      @click="dialog.value = false"
                      depressed
                      color="green"
                    >
                      Send Payment Request
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <!-- END POP-UP VERIFICATION -->
              </template>
            </v-dialog>
          </v-col>
        </v-row>
        <!-- End POP-UP -->
      </v-row>
    </v-container>
  </div>
</template>

<style></style>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Send Request for Payment ",
      today: moment().format("YYYY-MM-DD"),
      paymentInformationId: Math.floor(Math.random() * 10000000000000),
      tuna: { label: "Tuna", val: 0, color: "blue" },
      lobster: { label: "Lobster", val: 0, color: "red" },
      crab: { label: "Crab", val: 0, color: "orange" },
      customerName: "",
      executionDate: "",
      tunaTotal: "",
      lobsterTotal: "",
      crabTotal: "",
      salesTotal: "",
      customers: [
        "Lobster Shack",
        "Mike's Fish Joint",
        "Dan's Catch of the Day",
      ],
    };
  },
  async created() {
    const response = await axios.get("/api/login");
    const curToken = response.data.token;
    this.token = curToken;
    // console.log(this.token);
    return (this.executionDate = moment().format("YYYY-MM-DD"));
  },
  methods: {
    homePage() {
      this.$router.push({ path: "/" });
      console.log("home");
    },
    managePayments() {
      this.$router.push({ path: "ManagePayments" });
      console.log("ManagePayments");
    },

    newPayment() {
      this.$router.go();
    },
    async showPaymentRequest() {
      this.tunaTotal = this.tuna.val * 4;
      this.lobsterTotal = this.lobster.val * 3;
      this.crabTotal = this.crab.val * 5;
      this.salesTotal = this.tunaTotal + this.lobsterTotal + this.crabTotal;
    },

    async makePayment() {
      // console.log(this.token);
      console.log(this.paymentInformationId);
      console.log(this.salesTotal);
      console.log(this.executionDate);
      var paymentRequestInitiate = {
        token: this.token,
        amt: this.salesTotal,
        dbtrNm: this.customerName,
        paymentInfId: this.paymentInformationId,
        // debtor: this.PayeeName,
        // amount: this.Amount,
        // paymentInformationId: "1234567890",
        // currency: "USD",
        // creditor: "Mike-Test-Account",
      };
      console.log(paymentRequestInitiate);
      axios
        .post("/api/initiate-payment-request", paymentRequestInitiate, {
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
