import {defineStore} from 'pinia';

const default_port = {
  locationId: "",
  manufacturer: "",
  path: "asd",
  pnpId: "",
  productId: "",
  serialNumber: "",
  vendorId: ""
}

export const useSerialStore = defineStore('counter', {
  state: () => ({
    port: default_port,
    settings: {
      is_const_speed: false,
      const_speed: 0,
      first_slider: {min: 0, max: 50},
      second_slider: {min: 0, max: 50},
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
