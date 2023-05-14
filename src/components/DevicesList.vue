<template>
  <q-page class="flex flex-center ">

    <q-list bordered padding class="rounded-borders" style="width: 500px; margin: 10px;">
      <div v-if="store.is_devices" class="devices-list">
        Zero Devices Connected
      </div>
      <q-item v-for="port in store.serialList" :key="port.path" class="q-my-sm" clickable v-ripple
              @click="setDevice(port)">
        <q-item-section avatar>
          <q-avatar icon="memory" color="blue" text-color="white"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ port.manufacturer }}</q-item-label>
          <q-item-label caption lines="1">{{ port.path }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

  </q-page>
</template>

<style></style>

<script setup>
import {useSerialStore} from "stores/example-store"
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'

const store = useSerialStore()
const router = useRouter();

const setDevice = (port) => {
  store.port.path = port
  router.push({
    name: "device"
  });
}

onMounted(() => {
  store.listSerialPorts()
})

</script>
<style lang="sass">
.devices-list
  padding: 16px
</style>
