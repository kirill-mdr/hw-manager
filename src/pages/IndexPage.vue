<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Devices
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          aria-label="Home"
          @click="refreshSerialPorts()"
          icon="refresh"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <DevicesList ref="devicesList"/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import DevicesList from '../components/DevicesList.vue'
import {useSerialStore} from "stores/example-store";

const store = useSerialStore()

const refreshSerialPorts = () => {
  store.listSerialPorts()
}
</script>
