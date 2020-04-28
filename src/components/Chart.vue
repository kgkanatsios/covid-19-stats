<template>
  <line-chart :chart-data="chartData" :height="150"></line-chart>
</template>

<script>
import { mapGetters } from "vuex";
import LineChart from "@/charts/LineChart.js";

export default {
  name: "Chart",
  components: {
    LineChart
  },
  computed: {
    ...mapGetters(["covidData"]),
    chartData: function() {
      if (Object.entries(this.covidData).length === 0) {
        return {};
      }
      let confirmed = [];
      let recovered = [];
      let deaths = [];
      Object.keys(this.covidData.result).forEach(covidDataKey => {
        confirmed.push(this.covidData.result[covidDataKey].confirmed);
        recovered.push(this.covidData.result[covidDataKey].recovered);
        deaths.push(this.covidData.result[covidDataKey].deaths);
      });
      return {
        labels: Object.keys(this.covidData.result),
        datasets: [
          {
            label: "Confirmed Cases",
            borderColor: "#000000",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            data: confirmed
          },
          {
            label: "Recoveries",
            borderColor: "#28a745",
            backgroundColor: "rgba(40, 167, 69, 0.2)",
            data: recovered
          },
          {
            label: "Deaths",
            borderColor: "#dc3545",
            backgroundColor: "rgba(220, 53, 69, 0.2)",
            data: deaths
          }
        ]
      };
    }
  }
};
</script>

<style></style>
