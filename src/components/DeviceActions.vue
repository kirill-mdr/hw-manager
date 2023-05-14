<template>
  <q-page class="flex flex-center">
    <q-list bordered padding class="rounded-borders q-pa-sm" style="width: 500px">
      <q-toggle v-model="store.settings.is_const_speed" label="Постоянная скорость" color="blue-grey-8"/>

      <div v-if="store.settings.is_const_speed" class="actions-container">
        <q-badge color="blue-grey-8">
          Скорость: {{ store.settings.const_speed }}%
        </q-badge>
        <q-slider
          v-model="store.settings.const_speed"
          :min="5"
          :max="100"
          label
          :label-value="store.settings.const_speed + '%'"
          color="blue-grey-8"
        />
      </div>

      <div v-else class="actions-container">
        <q-badge color="blue-grey-8">
          Границы температуры: от {{ store.settings.temperature_limits.min }}° до
          {{ store.settings.temperature_limits.max }}°
        </q-badge>
        <q-range
          v-model="store.settings.temperature_limits"
          :min="10"
          :max="100"
          label
          :left-label-value="store.settings.temperature_limits.min + '°'"
          :right-label-value="store.settings.temperature_limits.max + '°'"
          color="blue-grey-8"
        />

        <q-badge color="blue-grey-8">
          Границы скорости: от {{ store.settings.speed_limits.min }}% до
          {{ store.settings.speed_limits.max }}%
        </q-badge>
        <q-range
          v-model="store.settings.speed_limits"
          :min="5"
          :max="100"
          label
          :left-label-value="store.settings.speed_limits.min + '%'"
          :right-label-value="store.settings.speed_limits.max + '%'"
          color="blue-grey-8"
        />
      </div>

      <q-toggle v-model="store.settings.is_dynamic_light" label="Динамическая подсветка" color="blue-grey-8"/>
      <div class="actions-container">
        <div class="actions__group">
          <q-badge color="blue-grey-8">
            Яркость: {{ store.settings.brightness }}%
          </q-badge>
          <q-slider
            v-model="store.settings.brightness"
            :max="100"
            label
            :label-value="store.settings.const_speed + '%'"
            color="blue-grey-8"
          />
        </div>
        <div class="actions__group"
             v-if="!store.settings.is_dynamic_light"
        >
          <q-badge color="red">
            Красный: {{ store.settings.red }}
          </q-badge>
          <q-slider
            class="actions__item"
            v-model="store.settings.red"
            :max="255"
            label
            color="red"
          />

          <q-badge color="green">
            Зеленый: {{ store.settings.green }}
          </q-badge>
          <q-slider
            class="actions__item"
            v-model="store.settings.green"
            :max="255"
            label
            color="green"
          />

          <q-badge color="blue">
            Синий: {{ store.settings.blue }}
          </q-badge>
          <q-slider
            class="actions__item"
            v-model="store.settings.blue"
            :max="255"
            label
            color="blue"
          />
        </div>
      </div>

    </q-list>
  </q-page>
</template>


<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import {useSerialStore} from "stores/example-store";

const store = useSerialStore()
const timer = ref(null)
let serialport = null

const sendDataToSerialPort = () => {
  let command = store.getSettingsForSerialPort().join(';') + 'E'
  store.serialport.write(command, (err) => {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
  })
  console.log(command)
}

watch(() => store.settings, () => {
  localStorage.setItem('settings', JSON.stringify(store.settings))
  if (timer.value) clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    sendDataToSerialPort()
    console.log('И нет 1000 запросов')
  }, 400)


}, {deep: true})


onMounted(() => {
  store.settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : store.settings
})
</script>
<style lang="sass">
.actions
  &-container
    padding: 0 16px

</style>
