<template>
  <div v-if="isLoading">
    <p>Veuillez patienter, nous sommes entrain de vous localiser</p>
  </div>
  <div id="app" v-else-if="error">
    <p>Je suis désolé mais nous avons recontré un problème pour vous localiser.</p>
    <p>{{errorMessage}}</p>
  </div>
  <div v-else>
    <Header :city="city" />
    <Meteo  :list="list" />
  </div>
</template>

<script>

import axios from 'axios';
import Header from './components/Header.vue';
import Meteo from './components/Meteo.vue';

export default {
  name: 'app',
  components: {
    Header,
    Meteo
  },
  data() {
    return {
      isLoading: true,
      error: false,
      errorMessage: '',
      key: 'bf7fb8a121f64ab88b4b32e2642939e2',
      city: {},
      list: []
    }
  },
  mounted: function() {
    navigator.geolocation.getCurrentPosition((pos) => {
      var crd = pos.coords;
      axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${crd.latitude}&lon=${crd.longitude}&key=${this.key}`)
      .then(res => {
        this.city = {city_name: res.data.city_name, country_code: res.data.country_code};
        this.list = res.data.data.slice(0, 5);
      })
      .catch(error => {
        this.errorMessage = error.message;
        this.error = true;
      })
      .finally(() => {
        this.isLoading = false;
      })
    }, (error) => {
      this.errorMessage = `ERROR${error.code}: ${error.message}`;
      this.error = true;
      this.isLoading = false;
    })
  }
}
</script>

<style>

body {
    margin: 0px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

</style>
