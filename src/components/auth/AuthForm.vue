<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const submitForm = async () => {
  isLoading.value = true
  await authStore.login(email.value, password.value)
  isLoading.value = false
}
</script>

<template>
  <form @submit.prevent="submitForm"
    class="bg-base-200 border border-base-content/5 rounded-2xl p-8 shadow-xl shadow-black/20">

    <div class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-base-content/70 mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          required
          class="input input-bordered w-full bg-base-300/50 border-base-content/10 focus:border-primary focus:outline-none placeholder:text-base-content/30"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-base-content/70 mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
          class="input input-bordered w-full bg-base-300/50 border-base-content/10 focus:border-primary focus:outline-none placeholder:text-base-content/30"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary w-full mt-2"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
        <span v-else>Sign in</span>
      </button>
    </div>

    <div class="divider text-base-content/30 text-xs mt-6">OR</div>

    <p class="text-center text-sm text-base-content/50">
      Don't have an account?
      <a class="text-primary hover:text-primary/80 font-medium cursor-pointer">Sign up</a>
    </p>
  </form>
</template>
