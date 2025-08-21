<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps({
  loading: Boolean,
  label: String,
});

const loadingAction = ref(false);
loadingAction.value = props.loading;
</script>

<template>
  <div
    v-if="loadingAction"
    class="w-full flex flex-col justify-center items-center gap-6"
  >
    <span class="loader" />

    <p class="text-primary font-semibold">{{ props.label }}</p>
  </div>
</template>

<style>
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: "";
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #017acb;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
