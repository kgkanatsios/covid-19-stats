<template>
  <b-card-group>
    <b-card bg-variant="light" header="Confirmed" class="text-center">
      <b-card-text>
        <div class="mb-2 text-center">
          <h3 class="font-weight-bold">{{ confirmed }}</h3>
        </div>
        <div>Number of confirmed cases of COVID-19</div>
      </b-card-text>
    </b-card>
    <b-card
      bg-variant="success"
      text-variant="white"
      header="Recoveries"
      class="text-center"
    >
      <b-card-text>
        <div class="mb-2 text-center">
          <h3 class="font-weight-bold">{{ recovered }}</h3>
        </div>
        <div>
          Number of recoveries from COVID-19
        </div>
      </b-card-text>
    </b-card>
    <b-card
      bg-variant="danger"
      text-variant="white"
      header="Deaths"
      class="text-center"
    >
      <b-card-text>
        <div class="mb-2 text-center">
          <h3 class="font-weight-bold">{{ deaths }}</h3>
        </div>
        <div>
          Number of deaths caused by COVID-19
        </div></b-card-text
      >
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: "Cards",
  props: ["confirmed", "recovered", "deaths"]
};
</script>

<style></style>
