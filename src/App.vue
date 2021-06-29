<template>
  <v-app>
    <!-- APP BAR -->
    <v-app-bar app color="purple" dark>
      <div class="d-flex align-center">
        <h1>FASTER PAY</h1>
      </div>

      <v-spacer></v-spacer>
      <!-- Routing Buttons -->
      <v-btn v-on:click="homePage()" color="white" text rounded class="my-2">
        Home
      </v-btn>

      <v-btn v-on:click="vendorPage()" color="white" text rounded class="my-2">
        Vendor Pay
      </v-btn>

      <v-btn
        v-on:click="customerPage()"
        color="white"
        text
        rounded
        class="my-2"
      >
        Customer Pay
      </v-btn>
      <!-- End Buttons  -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <!-- Footer -->
    <v-footer color="purple" padless>
      <v-row justify="center" no-gutters>
        <v-btn color="white" text rounded class="my-2"> Home </v-btn>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="purple lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>FINASTRA</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    links: ["About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
  methods: {
    // homePage() {
    //   this.$router.push({ path: "/" });
    //   console.log("home");
    // },
    // vendorPage() {
    //   this.$router.push({ path: "B2B" });
    //   console.log("b2b");
    // },
    // customerPage() {
    //   this.$router.push({ path: "C2B" });
    //   console.log("c2b");
    // },
  },
};
</script>
