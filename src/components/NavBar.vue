<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li index="/demo">
            <a>{{ t('menu.public') }}</a>
          </li>
          <li index="/folder">
            <a>{{ t('menu.folder') }}</a>
          </li>
          <li index="/about">
            <a>{{ t('menu.about') }}</a>
          </li>
          <!-- <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li> -->
        </ul>
      </div>
      <router-link class="btn btn-ghost normal-case text-xl" to="/">
        <img src="@/assets/logo2.png" class="h-full" />
        Mind Elixir
      </router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <router-link to="/list/public">{{ t('menu.public') }}</router-link>
        </li>
        <li>
          <router-link to="/list/map">{{ t('menu.folder') }}</router-link>
        </li>
        <li>
          <router-link to="/about">{{ t('menu.about') }}</router-link>
        </li>
        <!-- <li tabindex="0">
          <details>
            <summary>Parent</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li><a>Item 3</a></li> -->
      </ul>
    </div>
    <div class="navbar-end">
      <!-- teleport dest -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
