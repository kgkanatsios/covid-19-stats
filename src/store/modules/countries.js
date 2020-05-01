import Axios from "axios";

const state = {
  current: {
    name: "Global",
    alpha3Code: null
  },
  list: []
};
const mutations = {
  SET_CURRENT_COUNTRY(state, { alpha3Code }) {
    let currentCountry = state.list.find(
      country => country.alpha3Code == alpha3Code
    );
    if (currentCountry == null) {
      state.current.name = "Global";
      state.current.alpha3Code = null;
    } else {
      state.current.name = currentCountry.name;
      state.current.alpha3Code = currentCountry.alpha3Code;
    }
  },
  SET_COUNTRIES(state, { countries }) {
    state.list = countries;
  }
};
const actions = {
  fetchCountries: ({ commit, dispatch }, alpha3Code = null) => {
    Axios.get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        commit("SET_COUNTRIES", {
          countries: res.data
        });
      })
      .then(() => {
        dispatch("setCurrentCountry", alpha3Code);
      })
      .catch(error => console.log(error));
  },
  setCurrentCountry: ({ commit }, alpha3Code = null) => {
    commit("SET_CURRENT_COUNTRY", {
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
