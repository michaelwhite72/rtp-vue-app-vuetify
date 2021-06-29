<template>
  <div id="app">
    <!-- <div class="home">
    <h1>{{ message }}</h1>
  </div> -->
    <!-- services -->
    <!-- <section class="services py-5"> -->
    <v-app-bar app color="purple" dark>
      <div class="d-flex align-center">
        <h1>
          FASTER PAY
        </h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn  color="white" text rounded class="my-2">
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
    </v-app-bar>
    <div class="container py-md-5 py-sm-3">
      <h1>FASTER PAY</h1>
      <h3 class="heading mb-5">Services <strong> we provide </strong></h3>
      <div class="row">
        <div class="col-lg-4">
          <div class="row">
            <div class="col-9 mt-lg-5 grid">
              <h3>International Payment Initiation</h3>
              <p class="mt-2">
                Initiate a high value cross-border payment through SWIFT Gateway
              </p>
            </div>
            <div class="col-3 mt-lg-5 icon text-lg-center text-left grid1">
              <img src="../images/a2.png" alt="" class="img-fluid" />
            </div>

            <div class="col-9 mt-sm-5 mt-4 grid">
              <h3>Real-Time Payment Initiation</h3>
              <p class="mt-2">
                Initiate real-time payment for Immediate Payment clearings.
              </p>
            </div>
            <div class="col-3 mt-sm-5 mt-4 icon text-lg-center text-left grid4">
              <img src="../images/a3.png" alt="" class="img-fluid" />
            </div>

            <div class="col-9 mt-sm-5 mt-4 grid">
              <h3>Payment Request</h3>
              <p class="mt-2">
                Initiate market specific real-time payment requests for USD
                real-time schemes.
              </p>
            </div>
            <div class="col-3 mt-sm-5 mt-4 icon text-lg-center text-left grid5">
              <img src="../images/a1.png" alt="" class="img-fluid" />
            </div>
          </div>
        </div>
        <div class="col-lg-4 text-center my-lg-0 my-4">
          <img src="../images/serv.jpg" alt="" class="img-fluid" />
        </div>
        <div class="col-lg-4 text-right">
          <div class="row">
            <div
              class="col-3 mt-sm-5 mt-4 icon text-lg-center text-right grid6"
            >
              <img src="../images/a2.png" alt="" class="img-fluid" />
            </div>
            <div class="col-9 mt-sm-5 mt-4 grid">
              <h3>International Payment Initiation</h3>
              <p class="mt-2">Get a status report of a payment</p>
            </div>

            <div
              class="col-3 mt-sm-5 mt-4 icon text-lg-center text-right grid7"
            >
              <img src="../images/a3.png" alt="" class="img-fluid" />
            </div>
            <div class="col-9 mt-sm-5 mt-4 grid">
              <h3>Real-Time Payment Initiation</h3>
              <p class="mt-2">Get a status report of a payment.</p>
            </div>

            <div
              class="col-3 mt-sm-5 mt-4 icon text-lg-center text-right grid3"
            >
              <img src="../images/a1.png" alt="" class="img-fluid" />
            </div>
            <div class="col-9 mt-sm-5 mt-4 grid">
              <h3>Payment Request</h3>
              <p class="mt-2">Get the status of real-time payment requests.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to Real-Time Payments Application Home Page",
    };
  },
  created: function() {},
  methods: {

    managePayments() {
      this.$router.push({ path: "ManagePayments" });
      console.log("ManagePayments");
    },
    requestPayment() {
      this.$router.push({ path: "RequestPayment" });
      console.log("RequestPayment");
    },
  },
};
</script>
