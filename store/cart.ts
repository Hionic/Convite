import { ref } from "vue";
import { defineStore } from "pinia";
import type { ProductDto } from "~/@type/product";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref<ProductDto[]>(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")!)
        : []
    );

    function addToCart(product: ProductDto) {
      const item = cart.value.find((item) => item.id === product.id);
      if (item) {
        removeFromCart(product.id);
        cart.value.push(product);
      } else {
        cart.value.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart.value));
    }

    function removeFromCart(id: number) {
      cart.value = cart.value.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }

    function updateCart(product: ProductDto) {
      removeFromCart(product.id);
      addToCart(product);
    }

    function clearCart() {
      cart.value = [];
      localStorage.removeItem("cart");
    }

    return { cart, addToCart, removeFromCart, updateCart, clearCart };
  },
  {
    persist: true,
  }
);
