<template>
  <div id="app">
    <v-app-bar app color="pink darken-2">
      <div class="d-flex align-center">
        <h1>LOBSTER SHACK</h1>
      </div>

      <!-- ROUTING BUTTONS INDEX -->
      <v-spacer></v-spacer>

      <v-btn v-on:click="homePage()" color="white" text rounded class="my-2">
        Home
      </v-btn>

      <v-btn color="blue" text rounded class="my-2"> Manage Payments </v-btn>

      <v-btn
        v-on:click="requestPayment()"
        color="green"
        text
        rounded
        class="my-2"
      >
        Request Payment
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!-- END BUTTONS -->
    </v-app-bar>

    <!-- LOBSTER SHACK IMAGE -->
    <v-img
      lazy-src="../images/lobsters.jpeg"
      max-height="300"
      src="../images/lobsters.jpeg"
    ></v-img>
    <!-- LOBSTER SHACK IMAGE END -->

    <div class="home">
      <h1>{{ message }}</h1>
    </div>

    <v-container fluid> </v-container>

    <!-- PAYMENT REQUEST INFO-->
    <v-container fluid>
      <v-row align="center" justify="center">
        <!-- Transaction ID -- provided by GPP -->
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

        <!-- Creditor Name -- from GPP -->
        <v-col class="d-flex" cols="4" sm="3">
          <v-text-field
            v-model="creditor"
            label="Payee Name"
            outlined
          ></v-text-field>
        </v-col>

        <!-- Amount -- suppplied by GPP-->
        <v-col class="d-flex" cols="4" sm="3">
          <v-text-field
            v-model="amount"
            label="Amount (USD)"
            outlined
          ></v-text-field>
        </v-col>

        <!-- ACCEPT / DECLINE BUTTONS -->
        <v-col class="d-flex" cols="5" sm="2">
          <v-btn depressed color="green"> MAKE PAYMENT </v-btn>
          <v-btn depressed color="red"> DECLINE </v-btn>
        </v-col>
        <!-- accept / decline end -->
      </v-row>
    </v-container>
  </div>
</template>

<style></style>

<script>
import moment from "moment";

export default {
  data: function () {
    return {
      message: "Manage Received Payment Requests!",
      today: moment().format("YYYY-MM-DD"),
      paymentInformationId: Math.floor(Math.random() * 100000000000),
      creditor: "",
      amount: "",
    };
  },
  created: function () {
    return (this.executionDate = moment().format("YYYY-MM-DD"));
  },
  methods: {
    homePage() {
      this.$router.push({ path: "/" });
      console.log("home");
    },
    requestPayment() {
      this.$router.push({ path: "RequestPayment" });
      console.log("RequestPayment");
    },

    async makePayment() {
      // console.log(this.token);
      console.log(this.paymentInformationId);
      console.log(this.salesTotal);
      console.log("account number: 1122334455");
      console.log(this.executionDate);
      // var data = {
      //   token: this.token,
      //   debtor: this.PayeeName,
      //   amount: this.Amount,
      //   paymentInformationId: "1234567890",
      //   currency: "USD",
      //   creditor: "Mike-Test-Account",
      // };
      // console.log(data);
      // axios
      //   .post("/api/payment", data, {
      //     headers: { "Content-Type": "application/json" },
      //   })

      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     this.errors = error.response.data.errors;
      //   });
    },
  },
};
</script>
