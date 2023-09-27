<template>
    <div>
        <router-view></router-view>
        {{ userData }}
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { decryptData } from '../composables'
import Cookies from 'js-cookie'

export default defineComponent({
    setup () {
        
        const userData = ref(decryptData(Cookies.get('auth_user')))

        return { userData }
    }
})
</script>

<style scoped>

</style>