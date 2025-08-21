<script setup lang="ts">
import type { ProductDto } from "~/@type/product";
import { signOut } from "~~/services/firebase";
import { useCartStore } from "~~/store/cart";

const loading = ref(false);
let cartStore: ReturnType<typeof useCartStore>;
const cartItems = ref<ProductDto[]>([]);
const isOpenSlideover = ref(false);

onMounted(() => {
  cartStore = useCartStore();
  cartItems.value = cartStore.cart;
});

const menuItems = ref([
  {
    label: "Meus pedidos",
    path: "/pedidos",
    icon: "i-heroicons-cube",
  },
  {
    label: "Minha conta",
    path: "/minhaConta",
    icon: "i-heroicons-user-circle",
  },
  {
    label: "Sair",
    icon: "i-heroicons-arrow-right-on-rectangle",
  },
]);

const handleCloseSlideover = () => {
  console.log("closeSlideover");
  isOpenSlideover.value = false;
};

const handleLogout = async () => {
  try {
    await signOut();
    navigateTo("/");
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  cartStore = useCartStore();
  cartItems.value = cartStore.cart;
  watch(
    () => cartStore.cart,
    (newCart) => {
      cartItems.value = newCart;
    }
  );
});
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="bg-primary py-4 shadow-sm border-b border-gray-300">
      <UContainer>
        <div class="flex justify-between items-center">
          <img
            key="logo"
            src="/assets/images/logo-white.svg"
            width="77"
            class="cursor-pointer"
            @click="navigateTo('/home')"
          />

          <div class="flex items-center justify-between gap-2">
            <div v-if="!$route.path.startsWith('/pagamento')" class="relative">
              <UButton
                size="lg"
                variant="ghost"
                icon="i-heroicons-shopping-cart"
                @click="isOpenSlideover = true"
                class="text-yellow-500"
              />
              <div
                v-if="cartItems.length > 0"
                class="absolute bottom-0 right-0 bg-yellow-500 text-primary rounded-full w-4 h-4 flex items-center justify-center text-[8px]"
              >
                {{ cartItems.length > 99 ? "99+" : cartItems.length }}
              </div>
            </div>

            <UDropdownMenu
              :items="menuItems"
              :content="{
                align: 'start',
                side: 'bottom',
                sideOffset: 8,
              }"
            >
              <UButton
                icon="i-lucide-menu"
                color="neutral"
                variant="ghost"
                class="bg-transparent border-none hover:bg-transparent text-yellow-500"
              />

              <template #item="{ item }">
                <button
                  class="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left"
                  @click="
                    item.label === 'Sair'
                      ? handleLogout()
                      : navigateTo(item.path)
                  "
                >
                  <UIcon :name="item.icon" class="w-5 h-5" />
                  <span>{{ item.label }}</span>
                </button>
              </template>
            </UDropdownMenu>
          </div>
        </div>
      </UContainer>
    </div>

    <div class="bg-neutral-200 flex-1 py-4" />
    <UContainer>
      <div
        v-if="loading"
        class="w-full flex flex-col justify-center items-center gap-3"
      >
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-gray-200 animate-spin fill-primary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="text-gray-900 font-semibold">Aguarde...</span>
      </div>

      <div v-else class="mb-10">
        <slot />
      </div>
    </UContainer>
    <USlideover v-model:open="isOpenSlideover">
      <template #content>
        <CarrinhoOrder @close-slideover="handleCloseSlideover" />
      </template>
    </USlideover>
  </div>
</template>

<style scoped></style>
