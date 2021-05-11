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
      Select Payee Account type:
      <input type="text" v-model="PayeeAccountType" /><br />
      Select from Payee Account Type:
      <input type="text" v-model="FromPayeeAccountType" /><br />
      Amount: <input type="text" v-model="Amount" /><br />
      Memo: <input type="text" v-model="Memo" /><br />

      <!-- <button v-on:click="cancel">Cancel</button> -->
      <button v-on:click="showPayment">Verify Payment</button>
    </div>

    <dialog id="payment-details">
      <form method="dialog">
        <h2>Payment Info</h2>
        <p>PayeeName: {{ PayeeName }}</p>

        <button v-on:click="updatePlace(currentPlace)">Make Payment</button>
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
      PayeeAccountNumber: "",
      ConfirmPayeeAccountNumber: "",
      PayeeAccountType: "",
      FromPayeeAccountType: "",
      Amount: "",
      Memo: "",
      currentPlace: {},
    };
  },
  created: function () {
    axios.get("/api/login").then((response) => {
      console.log(response.data);
      this.token = response.data;
    });
  },

  methods: {
    showPayment: function () {
      console.log(this.PayeeName);
      document.querySelector("#payment-details").showModal();
    },

    createPayment: function () {
      var params = {
        name: this.PayeeName,
        address: this.Amount,
      };
      console.log(params);
    },
  },
};
</script>
