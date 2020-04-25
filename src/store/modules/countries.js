import Axios from "axios";

const state = {
  list: []
};
const mutations = {
  SET_COUNTRIES(state, { countries }) {
    state.list = countries;
  }
};
const actions = {
  fetchCountries: ({ commit }) => {
    Axios.get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        commit("SET_COUNTRIES", {
          countries: res.data
        });
      })
      .catch(error => console.log(error));
  }
};
const getters = {
  countryList: state => {
    return state.list;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
