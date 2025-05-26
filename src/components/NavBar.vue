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
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
        >
          <li>
            <router-link to="/list/public">{{ t('menu.public') }}</router-link>
          </li>
          <li>
            <router-link to="/list/map">{{ t('menu.folder') }}</router-link>
          </li>
          <li>
            <router-link to="/about">{{ t('menu.about') }}</router-link>
          </li>
          <li tabindex="0">
            <details>
              <summary>i18n</summary>
              <ul class="p-2">
                <li
                  v-for="locale in availableLocales"
                  @click="changeLocale(locale)"
                >
                  <a>{{ locale }}</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <router-link class="btn btn-ghost normal-case text-xl !pl-0" to="/">
        <img src="/logo2.png" class="h-full" />
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
        <li tabindex="0">
          <details>
            <summary>i18n</summary>
            <ul class="p-2">
              <li
                v-for="locale in availableLocales"
                @click="changeLocale(locale)"
              >
                <a>{{ locale }}</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <!-- teleport dest -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, availableLocales, locale } = useI18n()
console.log(availableLocales)

const changeLocale = (newLocale: string) => {
  console.log(newLocale)
  locale.value = newLocale
   localStorage.setItem('lang',newLocale)
}
</script>
