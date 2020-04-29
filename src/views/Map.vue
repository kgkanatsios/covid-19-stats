<template>
  <div>
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <h3 class="text-center">
            <span class="text-capitalize font-weight-bold">{{
              currentCountry.name
            }}</span>
          </h3>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid>
      <b-row>
        <b-col style="height:700px;">
          <l-map class="w-100 h-100 d-flex" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker
              v-for="(country, index) in countryList"
              :key="index"
              :lat-lng="[country.latlng[0], country.latlng[1]]"
            >
              <l-popup>{{ country.name }}</l-popup>
            </l-marker>
          </l-map>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  name: "Map",
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 2,
      center: [47.41322, -1.219482],
      bounds: null
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  methods: {
    ...mapActions({
      fetchCountries: "fetchCountries"
    })
  },
  computed: {
    ...mapGetters(["currentCountry", "countryList"])
  },
  created() {
    this.fetchCountries();
  }
};
</script>

<style></style>
