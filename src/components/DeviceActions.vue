<template>
  <q-page class="flex flex-center">
    <q-list bordered padding class="rounded-borders" style="width: 350px">
      <q-toggle v-model="store.settings.is_const_speed" label="Постоянная скорость"/>

      <div v-if="store.settings.is_const_speed" class="actions-container">
        <q-slider

          v-model="store.settings.const_speed"
          :max="50"
          color="green"
        />
        {{ store.settings.const_speed }}
      </div>

      <div v-else class="actions-container">
        <p>Температура:</p>
        <p class="actions__info">
          <span>Минимальная: {{ store.settings.first_slider.min }}</span>
          <span>Максимальная: {{ store.settings.first_slider.max }}</span>
        </p>
        <q-range
          v-model="store.settings.first_slider"
          :min="0"
          :max="50"
          color="green"
          label="Температура"
        />

        <p>Скорость вентиляторов:</p>
        <p class="actions__info">
          <span>Минимальная: {{ store.settings.second_slider.min }}</span>
          <span>Максимальная: {{ store.settings.second_slider.max }}</span>
        </p>
        <q-range
          v-model="store.settings.second_slider"
          :min="0"
          :max="50"
          color="green"
          label="Скорость"
        />

      </div>

    </q-list>
  </q-page>
</template>


<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import {useSerialStore} from "stores/example-store";

const store = useSerialStore()


const timer = ref(null)


watch(() => store.settings, () => {
  localStorage.setItem('settings', JSON.stringify(store.settings))
  if (timer.value) clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    // Функция отправки на Ардуино
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
    padding: 16px

  &__info
    display: flex
    width: 100%
    justify-content: space-between
</style>
