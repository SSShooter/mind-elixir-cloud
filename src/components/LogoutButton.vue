<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img :src="userData?.avatarurl" />
      </div>
    </label>
    <ul
      tabindex="0"
      class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52"
    >
      <!-- <li>
        <a class="justify-between">
          Profile
          <span class="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li> -->
      <li @click="logout"><a>Logout</a></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import connect from '@/connect'
import { User } from '@/models/user'
import { inject } from 'vue'

const userData = inject<undefined | User>('userData')
const logout = async () => {
  await connect.get('/logout')
  location.reload()
}
</script>
