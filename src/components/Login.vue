<script setup>
import { reactive } from 'vue'
import { login } from '../api'

const emit = defineEmits(['login'])
const formValue = reactive({
  email: null,
  password: null
})

const handleSubmit = async () => {
  if (formValue.email && formValue.password) {
    try {
      const res = await login({
        identifier: formValue.email,
        password: formValue.password,
      })
      emit('login', res)
    } catch (error) {
      alert('Login failed')
      console.error(error);
    }
    return
  }

  alert('Please fill the form')
}
</script>
<template>
  <form class="relative" @submit.prevent="handleSubmit">
    <div class="relative mb-4">
      <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
      <input
        v-model="formValue.email"
        type="email"
        id="email"
        name="email"
        required
        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
    </div>
    <div class="relative mb-4">
      <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
      <input
        v-model="formValue.password"
        type="password"
        id="password"
        name="password"
        required
        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
    </div>
    <button
      type="submit"
      class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      Login
    </button>
  </form>
</template>