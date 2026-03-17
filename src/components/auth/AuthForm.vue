<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue'
const authStore = useAuthStore()
const router = useRouter();

const email = ref('')
const password = ref('')

const submitForm = async () => {
    authStore.login(email.value, password.value)
}

</script>

<template>
    <form @submit.prevent="submitForm" class="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 m-10">
    <fieldset class="fieldset">
        <label class="label">Email</label>
        <input type="email" class="input validator" placeholder="Email" required />
        <p class="validator-hint hidden">Required</p>
    </fieldset>

    <label class="fieldset">
        <span class="label">Password</span>
        <input type="password" class="input validator" placeholder="Password" required />
        <span class="validator-hint hidden">Required</span>
    </label>

    <button class="btn btn-neutral mt-4" type="submit">Login</button>
    </form>
</template>