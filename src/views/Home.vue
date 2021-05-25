<template>
  <div class="home">
    <h1>Pay a Customer (RTP)</h1>

    <!-- <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul> -->

    <div>
      <h2>Payment</h2>
      <label> Name: </label>
      <input type="text" v-model="PayeeName" /><br />
      Payee Account Number:
      <input type="text" v-model="PayeeAccountNumber" /><br />
      Confirm Payee Account Number:
      <input type="text" v-model="ConfirmPayeeAccountNumber" /><br />
      <!-- Select Payee Account type:
      <input type="text" v-model="PayeeAccountType" /><br /> -->
      <!-- Select from Payee Account Type:
      <input type="text" v-model="FromPayeeAccountType" /><br /> -->
      Amount (USD): <input type="text" v-model="Amount" /><br />
      Memo: <input type="text" v-model="Memo" /><br />

      <!-- <button v-on:click="cancel">Cancel</button> -->
      <button v-on:click="showPayment()">Verify Payment</button>
    </div>

    <dialog id="payment-details">
      <form method="dialog">
        <h2>Payment Info</h2>
        <p>Payee Name: {{ PayeeName }}</p>
        <p>Payee Account Number: {{ PayeeAccountNumber }}</p>
        <p>Payee Account Type: {{ PayeeAccountType }}</p>
        <p>From Account: {{ FromPayeeAccountType }}</p>
        <p>Amount: {{ Amount }}</p>
        <p>Memo: {{ Memo }}</p>
        <!-- <p>token: {{ token }}</p> -->

        <button v-on:click="createPayment()">Make Payment</button>
        <button>Cancel</button>
      </form>
    </dialog>
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
      PayeeName: "Payee Name",
      PayeeAccountNumber: "Payee Account Number",
      ConfirmPayeeAccountNumber: "Confirm Payee Account Number",
      PayeeAccountType: "Account Type (Savings, Checking, etc)",
      FromPayeeAccountType: "From Account Type (acct number)",
      Amount: "Amount",
      Memo: "Memo",
      currentPlace: {},
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
        debtor: this.PayeeName,
        amount: this.Amount,
        paymentInformationId: "1234567890",
        currency: "USD",
        creditor: "Mike-Test-Account",
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
