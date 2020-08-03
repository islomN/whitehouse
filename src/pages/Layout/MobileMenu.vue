<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <a href="#" @click="logout">
          <p class="">Выйти</p>
      </a>
    </li>
  </ul>
</template>
<script>
import TokenService from "../../services/TokenService";

export default {
  data() {
    return {
      search: null,
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
    methods:{
        logout(){
            TokenService.removeAll();
            this.$router.push({ path: '/login' })
        }
    }
};
</script>
