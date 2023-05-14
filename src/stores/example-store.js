import {defineStore} from 'pinia';

const {SerialPort} = require('serialport')

const default_port = {
  locationId: "",
  manufacturer: "",
  path: "asd",
  pnpId: "",
  productId: "",
  serialNumber: "",
  vendorId: ""
}

export const useSerialStore = defineStore('serial', {
  state: () => ({
    port: default_port,
    serialport: null,
    settings: {
      is_const_speed: true,
      const_speed: 50,
      temperature_limits: {min: 30, max: 60},
      speed_limits: {min: 20, max: 90},
      is_dynamic_light: true,
      brightness: 100,
      red: 255,
      green: 255,
      blue: 255,
    },
    is_devices: false,
    serialList: []
  }),
  actions: {
    async listSerialPorts() {
      await SerialPort.list().then((ports, err) => {
        if (err != null || err === undefined) {
          let devices = [];
          for (const device of ports) {
            if (device.productId !== undefined && device.vendorId !== undefined) {
              devices.push(device);
            }
          }
          this.is_devices = devices.length === 0;
          this.serialList = devices;
          console.log('ports: ', ports);
        }
      })
    },
    getSettingsForSerialPort() {
      return [
        this.settings.is_const_speed ? 1 : 0,
        this.settings.const_speed,
        this.settings.temperature_limits.min,
        this.settings.temperature_limits.max,
        this.settings.speed_limits.min,
        this.settings.speed_limits.max,
        this.settings.is_dynamic_light ? 1 : 0,
        this.settings.brightness,
        this.settings.red,
        this.settings.green,
        this.settings.blue
      ]
    },
  },
});
