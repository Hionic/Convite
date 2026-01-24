<script setup>
import { ref, onMounted } from "vue";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { swalError } from "~~/utils/swalAlerts";
import { app } from "~~/services/firebase";

definePageMeta({ layout: false });

const db = getFirestore(app);
const confirmadosCol = collection(db, "rsvp_ale");

const nome = ref("");
const mensagem = ref("");
const erro = ref("");
const loading = ref(false);
const confirmados = ref([]);

async function buscarConfirmados() {
  try {
    const q = query(confirmadosCol, orderBy("data", "asc"));
    const snap = await getDocs(q);
    confirmados.value = snap.docs.map((doc) => doc.data());
  } catch (e) {
    swalError("Erro ao buscar confirmados!");
    confirmados.value = [];
  }
}

onMounted(buscarConfirmados);

async function confirmarPresenca() {
  mensagem.value = "";
  erro.value = "";
  loading.value = true;

  const nomeLimpo = nome.value.trim();
  if (nomeLimpo.length < 2) {
    erro.value = "Digite um nome válido!";
    loading.value = false;
    return;
  }

  try {
    await addDoc(confirmadosCol, {
      nome: nomeLimpo,
      data: String(new Date()),
    });

    mensagem.value = "Confirmação registrada! Obrigada 🎉";
    nome.value = "";
    buscarConfirmados();
  } catch (e) {
    erro.value = "Erro ao confirmar! Tente novamente.";
  }

  loading.value = false;
}
</script>

<template>
  <!-- FUNDO NOVO -->
  <div class="p-4 flyer-bg">
    <div class="max-w-2xl mx-auto">
      <div
        class="bg-white rounded-3xl card-shadow decorative-border overflow-hidden"
      >
        <!-- HEADER -->
        <div
          class="bg-[url('~/assets/images/image-title.png')] bg-cover bg-[center] p-1 text-center relative h-[250px] flex items-center justify-center"
        >
          <img src="~/assets/images/logo.png" alt="" class="ml-0" />
        </div>

        <!-- CONTENT -->
        <div class="p-8 space-y-6">
          <div class="bg-orange-50 rounded-2xl p-6">
            <p class="text-gray-700 text-lg leading-relaxed text-center">
              Depois de um certo tempo entendemos que fazer a vida valer, é está
              do lado de quem amamos, por isso vamos comemorar juntos meu
              aniversário!
            </p>
          </div>

          <div class="grid gap-4">
            <div
              class="rounded-2xl p-6 flex items-center border border-orange-100"
            >
              <div class="bg-orange-100 rounded-full p-2 mr-4" />

              <div>
                <h3 class="font-semibold text-gray-800 text-lg">Data</h3>
                <p class="text-gray-600 text-lg">Sábado, 28 de Fevereiro</p>
              </div>
            </div>

            <div
              class="rounded-2xl p-6 flex items-center border border-orange-100"
            >
              <div class="bg-orange-100 rounded-full p-2 mr-4" />
              <div>
                <h3 class="font-semibold text-gray-800 text-lg">Horário</h3>
                <p class="text-gray-600 text-lg">A partir das 12:00</p>
                <p class="text-gray-600 text-sm">
                  Chegue cedo para aproveitar ao máximo!
                </p>
              </div>
            </div>

            <div class="rounded-2xl p-6 border border-[#fef3be]">
              <h3 class="font-semibold text-gray-800 text-lg mb-1">Local</h3>
              <p class="text-gray-600 text-lg">Chácara do Serrana</p>

              <a
                href="https://www.google.com/maps?q=-10.267514,-48.278286"
                target="_blank"
                class="location-btn bg-orange-100 mt-4 text-orange-600 font-semibold py-3 px-6 rounded-full flex justify-center text-sm"
              >
                Localização
              </a>

              <div class="mt-2 flex flex-col">
                <p class="font-semibold text-gray-800 text-sm">Observação:</p>
                <p class="text-gray-600 text-sm ml-2">
                  Ir pela Católica Campus II
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-100"
          >
            🍹 <strong>O que levar?</strong><br />
            <p class="">Apenas sua bebida alcoólica 😎</p>
            <div class="mt-0 flex flex-col">
              <p class="font-semibold text-gray-800 text-sm">Observação:</p>
              <p class="text-gray-600 text-sm ml-2">
                O local tem freezer para bebidas, caso precise!
              </p>
            </div>
          </div>

          <!-- RSVP -->
          <div class="bg-orange-50 rounded-2xl p-6 text-center">
            <h3 class="font-semibold text-gray-800 text-lg mb-2">
              Confirmação de Presença
            </h3>
            <p class="text-gray-700">
              Peço por gentileza confirmar presença até
              <strong>13/02/2026</strong>
            </p>

            <form
              class="mt-4 flex flex-col gap-2 items-center"
              @submit.prevent="confirmarPresenca"
            >
              <input
                v-model="nome"
                placeholder="Seu nome"
                class="rounded-lg border border-pink-200 px-4 py-2 text-lg w-full"
              />

              <button
                type="submit"
                :disabled="loading"
                class="bg-orange-100 text-orange-600 font-semibold px-6 py-3 rounded-full w-full"
              >
                {{ loading ? "Confirmando..." : "Confirmar Presença" }}
              </button>
            </form>

            <p v-if="mensagem" class="text-green-700 mt-2">{{ mensagem }}</p>
            <p v-if="erro" class="text-red-600 mt-2">{{ erro }}</p>

            <ul v-if="confirmados.length" class="mt-4 list-disc list-inside">
              <li v-for="(c, i) in confirmados" :key="i">{{ c.nome }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap");
@import url("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css");

* {
  font-family: "Poppins", sans-serif;
}

/* ===== FUNDO MODERNO ===== */
.flyer-bg {
  min-height: 100vh;
  background: linear-gradient(160deg, #ff2f92, #ff8c1a);
  position: relative;
  overflow: hidden;
}

.flyer-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.06) 1px,
    transparent 1px,
    transparent 6px
  );
  z-index: 0;
}

.flyer-bg > * {
  position: relative;
  z-index: 1;
}

/* ===== SEU CSS ORIGINAL ===== */
.gradient-text {
  background: linear-gradient(45deg, #e91e63, #f06292, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-shadow {
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
}

.sparkle {
  animation: sparkle 2s ease-in-out infinite alternate;
}

@keyframes sparkle {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.info-item {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.decorative-border {
  border: 3px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #e91e63, #f06292, #ff9800) border-box;
}
</style>
