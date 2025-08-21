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

definePageMeta({
  layout: false,
});

const db = getFirestore(app);
const confirmadosCol = collection(db, "rsvp_ale");

const nome = ref("");
const mensagem = ref("");
const erro = ref("");
const loading = ref(false);
const confirmados = ref([]);

// Busca os nomes dos confirmados
async function buscarConfirmados() {
  try {
    const q = query(confirmadosCol, orderBy("data", "asc"));
    const snap = await getDocs(q);
    confirmados.value = Array.isArray(snap.docs)
      ? snap.docs.map((doc) => doc.data())
      : [];
  } catch (e) {
    swalError("Erro ao buscar confirmados!");
    confirmados.value = [];
  }
}

onMounted(() => {
  buscarConfirmados();
});

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
    console.log("object :>> ", { nome: nomeLimpo, data: new Date() });
    const newValuation = await addDoc(collection(db, "rsvp_ale"), {
      nome: nomeLimpo,
      data: String(new Date()),
    });

    console.log("aqui :>> ", newValuation);
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
  <div class="p-4 bg-pink-100">
    <div class="max-w-2xl mx-auto">
      <!-- Main Invitation Card -->
      <div
        class="bg-white rounded-3xl card-shadow decorative-border overflow-hidden"
      >
        <!-- Header Section -->
        <div
          class="bg-gradient-to-r from-pink-100 to-pink-50 p-8 text-center relative"
        >
          <div class="absolute top-4 left-4 text-2xl sparkle">✨</div>
          <div
            class="absolute top-4 right-4 text-2xl sparkle"
            style="animation-delay: 1s"
          >
            ✨
          </div>
          <div class="absolute bottom-4 left-8 text-xl">🎂</div>
          <div class="absolute bottom-4 right-8 text-xl">🥳</div>
          <h1
            class="text-4xl md:text-5xl font-bold gradient-text dancing-script mb-4 flower-decoration"
          >
            Niver da Alê
          </h1>
          <div class="text-6xl mb-4">🎉</div>
          <p class="text-lg text-gray-700 font-medium">
            Estou super animada para celebrar meu aniversário<br />
            e quero vocês comigo!
          </p>
        </div>

        <!-- Content Section -->
        <div class="p-8 space-y-6">
          <!-- Description -->
          <div class="text-center bg-pink-50 rounded-2xl p-6">
            <p class="text-gray-700 text-lg leading-relaxed">
              Vai ser em um
              <span class="font-semibold text-pink-600">bar incrível</span>, com
              <span class="font-semibold text-pink-600">música ao vivo</span>
              para animar a festa! 🎵✨
            </p>
          </div>

          <!-- Event Details -->
          <div class="grid gap-4">
            <!-- Date -->
            <div class="info-item rounded-2xl p-6 flex items-center">
              <div class="bg-pink-100 rounded-full p-3 mr-4">
                <i class="fas fa-calendar-alt text-pink-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 text-lg">Data</h3>
                <p class="text-gray-600 text-lg">Sábado, 23 de agosto</p>
              </div>
            </div>
            <!-- Time -->
            <div class="info-item rounded-2xl p-6 flex items-center">
              <div class="bg-pink-100 rounded-full p-3 mr-4">
                <i class="fas fa-clock text-pink-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800 text-lg">Horário</h3>
                <p class="text-gray-600 text-lg">A partir das 18:00</p>
              </div>
            </div>
            <!-- Location -->
            <div class="info-item rounded-2xl p-6">
              <div class="flex items-center mb-4">
                <div class="bg-pink-100 rounded-full p-3 mr-4">
                  <i class="fas fa-map-marker-alt text-pink-600 text-xl"></i>
                </div>
                <div>
                  <div>
                    <h3 class="font-semibold text-gray-800 text-lg">Local</h3>
                    <p class="text-gray-600 text-lg">
                      Galpão da 10 - Bar e Balada
                    </p>
                  </div>
                  <h3 class="font-semibold text-gray-800 text-lg">
                    Localização
                  </h3>
                  <p class="text-gray-600">
                    Clique no botão abaixo para ver no mapa
                  </p>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/cUqkg9eWPo47HSkn8?g_st=ipc"
                target="_blank"
                class="location-btn text-white font-semibold py-3 px-6 rounded-full inline-flex items-center w-full justify-center"
              >
                <i class="fas fa-map-marked-alt mr-2"></i>
                Ver Localização no Google Maps
              </a>
            </div>
          </div>

          <!-- Party Info -->
          <div
            class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-orange-300"
          >
            <div class="flex items-start">
              <div class="text-2xl mr-3">🍹</div>
              <div>
                <h3 class="font-semibold text-gray-800 text-lg mb-2">
                  O que levar?
                </h3>
                <p class="text-gray-700">
                  A única coisa que vocês precisam trazer é a
                  <strong>vontade de comemorar</strong> e a
                  <strong>grana para as bebidas</strong>! 🥳
                </p>
              </div>
            </div>
          </div>

          <!-- RSVP Section -->
          <div
            class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-300 text-center"
          >
            <div class="text-3xl mb-3">📝</div>
            <h3 class="font-semibold text-gray-800 text-lg mb-2">
              Confirmação de Presença
            </h3>
            <p class="text-gray-700">
              Peço por gentileza confirmar presença até <strong>20/08</strong>
            </p>
            <!-- RSVP BUTTON & INPUT -->
            <form
              class="mt-4 flex flex-col gap-2 items-center"
              @submit.prevent="confirmarPresenca"
            >
              <input
                v-model="nome"
                class="rounded-lg border border-pink-200 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-200 w-48"
                placeholder="Seu nome"
                required
              />
              <UButton
                type="submit"
                class="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-semibold p-3 rounded-full mt-1"
                :label="loading ? 'Confirmando...' : 'Confirmar Presença'"
                disabled
              >
              </UButton>
              <span v-if="mensagem" class="text-green-700 mt-2">{{
                mensagem
              }}</span>
              <span v-if="erro" class="text-red-600 mt-2">{{ erro }}</span>
            </form>
            <!-- Lista de confirmados (opcional) -->
            <div
              v-if="confirmados && confirmados.length > 0"
              class="mt-4 text-left"
            >
              <strong class="block mb-1 text-gray-700">Confirmados:</strong>
              <ul class="text-gray-900 list-disc list-inside">
                <li v-for="(c, i) in confirmados" :key="i">{{ c.nome }}</li>
              </ul>
            </div>
          </div>

          <!-- Final Message -->
          <div class="text-center bg-pink-50 rounded-2xl p-6">
            <p class="text-xl text-gray-700 dancing-script mb-4">
              Vamos nos divertir e brindar juntos!
            </p>
            <div
              class="flex justify-center items-center space-x-2 text-2xl mb-4"
            >
              <span>🎉</span>
              <span>🍹</span>
              <span>🎵</span>
              <span>💃</span>
              <span>🥳</span>
            </div>
            <p class="text-lg gradient-text font-semibold dancing-script">
              Beijos! 💖
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Decoration -->
      <div class="text-center mt-6 space-x-4 text-3xl">
        <span class="sparkle">🌸</span>
        <span class="sparkle" style="animation-delay: 0.5s">✨</span>
        <span class="sparkle" style="animation-delay: 1s">🎀</span>
        <span class="sparkle" style="animation-delay: 1.5s">✨</span>
        <span class="sparkle" style="animation-delay: 2s">🌸</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap");
@import url("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css");

body {
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #fff5f8 100%);
  min-height: 100vh;
}

.gradient-text {
  background: linear-gradient(45deg, #e91e63, #f06292, #ff9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-shadow {
  box-shadow: 0 20px 40px rgba(233, 30, 99, 0.15);
}

.dancing-script {
  font-family: "Dancing Script", cursive;
}

.sparkle {
  animation: sparkle 2s ease-in-out infinite alternate;
}

@keyframes sparkle {
  0% {
    transform: scale(1) rotate(0deg);
  }
  100% {
    transform: scale(1.1) rotate(5deg);
  }
}

.flower-decoration {
  position: relative;
}

.flower-decoration::before {
  content: "🌸";
  position: absolute;
  top: -10px;
  right: -15px;
  font-size: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.location-btn {
  background: linear-gradient(45deg, #e91e63, #f06292);
  transition: all 0.3s ease;
}
.location-btn:hover {
  background: linear-gradient(45deg, #c2185b, #e91e63);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(233, 30, 99, 0.3);
}

.info-item {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(233, 30, 99, 0.2);
}

.decorative-border {
  border: 3px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #e91e63, #f06292, #ff9800) border-box;
}
</style>
