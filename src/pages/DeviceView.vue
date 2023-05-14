<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round aria-label="Home" to="/" icon="list"/>

        <q-toolbar-title>
          {{ store.port.path.manufacturer }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <DeviceActions @command="writeCommand($event)"/>


    </q-page-container>
  </q-layout>
  <q-dialog v-model="portClosed" position="bottom">
    <q-card style="width: 350px">

      <q-card-section class="row items-center no-wrap">
        <div class="text-weight-bold">Port is closed</div>
        <q-space/>
        <q-btn flat dense round to="/" icon="arrow_back"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import DeviceActions from '../components/DeviceActions.vue'
import {ref, onMounted, onUnmounted} from 'vue'

const {SerialPort, ReadlineParser} = require('serialport')
import {useSerialStore} from "stores/example-store"


const portClosed = ref(false)
const timer = ref(null)
const store = useSerialStore()
let serialport = null

const writeCommand = (command) => {
  serialport.write(command, function (err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log(command)
  })
}

const checkPortStatus = () => {
  const parser = new ReadlineParser()
  serialport.pipe(parser)
  portClosed.value = !serialport.isOpen
}

onMounted(() => {
  serialport = new SerialPort({path: store.port.path.path, baudRate: 9600})
  store.serialport = serialport
  timer.value = setInterval(() => {
    checkPortStatus()
  }, 500)
})

onUnmounted(() => {
  clearInterval(timer.value)
  serialport.close()
})

</script>
