<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4"
  >
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 animate-pulse"
        style="animation-delay: 1s"
      ></div>
    </div>

    <!-- 主要内容卡片 -->
    <div class="relative w-full max-w-md">
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 backdrop-blur-sm"
      >
        <!-- Logo和标题 -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <img src="@/assets/mind-elixir-desktop.svg" class="w-16 h-16" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Mind Elixir
          </h1>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            {{ t("misc.loggingIn") }}
          </p>
        </div>

        <!-- 加载动画和进度 -->
        <div class="space-y-6">
          <!-- 主要加载指示器 -->
          <div class="flex justify-center">
            <div class="relative">
              <div
                class="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-500 dark:border-t-blue-400"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div
                  class="w-8 h-8 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"
                ></div>
              </div>
            </div>
          </div>

          <!-- 进度条 -->
          <div
            class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
          >
            <div
              class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"
              :style="{ width: progressWidth + '%' }"
            ></div>
          </div>

          <!-- 状态文本 -->
          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {{ currentStatus }}
            </p>
            <div class="flex justify-center space-x-1">
              <div
                class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              ></div>
              <div
                class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style="animation-delay: 0.1s"
              ></div>
              <div
                class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style="animation-delay: 0.2s"
              ></div>
            </div>
          </div>

          <!-- 提示信息 -->
          <div
            class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
          >
            <div class="flex items-start space-x-3">
              <svg
                class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <p class="text-sm text-blue-800 dark:text-blue-200 font-medium">
                  {{ t("misc.connectingDesktop") }}
                </p>
                <p class="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  {{ t("misc.ensureDesktopRunning") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="text-center mt-6">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ t("misc.secureConnection") }} • {{ t("misc.autoRedirect") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import connect from "@/connect";
import { useRoute } from "vue-router";
// @ts-ignore
import { useI18n } from "vue-i18n";
// import logo from "@/assets/mind-elixir-desktop.svg";

const { t } = useI18n();
const route = useRoute();

// 响应式状态
const progressWidth = ref(0);
const currentStatus = ref(t("misc.gettingToken"));

// 模拟进度更新
const updateProgress = (width: number, status: string) => {
  progressWidth.value = width;
  currentStatus.value = status;
};

onMounted(async () => {
  try {
    updateProgress(20, t("misc.gettingToken"));

    const { token } = await connect.get<never, { token: string }>("token");
    console.log(token);

    updateProgress(50, t("misc.connectingApp"));

    const port = route.query.port;
    console.log(port);

    updateProgress(80, t("misc.verifyingIdentity"));

    const response = await fetch(
      `http://127.0.0.1:${port}/login?token=${token}`,
      {
        method: "POST",
      }
    );

    updateProgress(100, t("misc.loginSuccess"));

    const data = await response.text();
    console.log(data);

    // 短暂延迟显示成功状态
    setTimeout(() => {
      currentStatus.value = t("misc.completed");
    }, 1000);
  } catch (error) {
    console.error("登录过程中出现错误:", error);
    updateProgress(0, t("misc.connectionFailed"));
    currentStatus.value = t("misc.checkDesktopApp");
  }
});
</script>
