<template>
  <div>dddd</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import connect from "@/connect";
import { useRoute } from "vue-router";

const route = useRoute();
onMounted(async () => {
  const { token } = await connect.get<never, { token: string }>("token");
  console.log(token);
  const port = route.query.port;
  console.log(port);
  const response = await fetch(
    `http://127.0.0.1:${port}/login?token=${token}`,
    {
      method: "POST",
    }
  );
  const data = await response.text();
  console.log(data);
});
</script>
