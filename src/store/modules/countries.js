import Axios from "axios";

const state = {
  current: {
    name: "Global",
    alpha3Code: null
  },
  list: []
};
const mutations = {
  SET_CURRENT_COUNTRY(state, { name, alpha3Code }) {
    state.current.name = name;
    state.current.alpha3Code = alpha3Code;
  },
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
  },
  setCurrentCountry: ({ commit }, [name, alpha3Code]) => {
    commit("SET_CURRENT_COUNTRY", {
      name,
      alpha3Code
    });
  }
};
const getters = {
  currentCountry: state => {
    return state.current;
  },
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
