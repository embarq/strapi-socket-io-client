<script setup>
import { ref, computed, onMounted } from 'vue'
import { connect } from './api-io'
import Login from './components/Login.vue'

const token = ref(localStorage.getItem('token'))
const profile = ref()
const connected = ref(false)
const socket = ref()
const isLoggedIn = computed(() => token.value != null)

const wsConnect = async () => {
  try {
    socket.value = await connect(token.value)
    connected.value = true

    socket.value.on('notification', event => {
      console.log('[notification]', event)
    })
  } catch (error) {
    console.error(error);
    alert('Unable to connect to socket server. See devtools')
  }
}

const handleLogin = (payload) => {
  token.value = payload.jwt
  profile.value = payload.user
  localStorage.setItem('token', payload.jwt)
  wsConnect()
}

const logout = () => {
  token.value = null
  profile.value = null
  localStorage.removeItem('token')
  socket.value.disconnect()
  connected.value = false
}

onMounted(async () => {
  if (!isLoggedIn.value) {
    return
  }

  wsConnect()
})
</script>

<template>
  <div class="mt-5"></div>
  <section v-if="!isLoggedIn" class="max-w-sm mx-auto p-2">
    <Login @login="handleLogin" />
  </section>
  <section v-if="isLoggedIn" class="max-w-sm mx-auto p-2">
    <p>Current Token:</p>
    <textarea
      :value="token"
      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      name=""
      readonly
      id=""
      rows="2">
    </textarea>
    <button
      @click="logout"
      type="button"
      class="text-white bg-indigo-500 border-0 mt-2 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">
      Logout
    </button>
    <hr class="my-4">
    <p class="text-white rounded px-4" :class="connected ? 'bg-green-600' : 'bg-gray-400'">
      {{ connected ? 'Connected to socket server' : 'Not connected to socket server' }}
    </p>
  </section>
</template>

