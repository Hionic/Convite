# AGENTS.md – Convite

Este documento descreve o contexto completo do projeto, a arquitetura, estrutura do código, componentes disponíveis, padrões de uso e convenções que os agentes (e desenvolvedores) devem seguir.

---

## 1. Visão Geral do Projeto

**Convite** é uma aplicação web de **convite digital de aniversário** com confirmação de presença (RSVP), hospedada no Firebase Hosting. A página exibe informações da festa (data, horário, local) e permite que convidados confirmem presença em tempo real via Firestore.

| Tecnologia | Versão | Uso |
|---|---|---|
| Nuxt | 3.17.x | Framework full-stack (SSR/SSG) |
| Vue | 3.x | Biblioteca de UI (via Nuxt) |
| TypeScript | 5.8.x | Tipagem estática |
| Nuxt UI | 3.x | Componentes de UI (baseado em Tailwind) |
| Tailwind CSS | 4.x | Estilização via utilitários (integrado ao Nuxt UI) |
| Firebase | 11.x | Auth, Firestore, Storage, Hosting |
| Pinia | 3.x | Gerenciamento de estado |
| pinia-plugin-persistedstate | 4.x | Persistência de estado no localStorage |
| Axios | 1.x | Requisições HTTP (API externa) |
| SweetAlert2 | 11.x | Alertas e notificações toast |
| Zod | 3.x | Validação de schemas |
| Maska | 3.x | Máscaras de input |
| Chart.js + vue-chartjs | 4.x / 5.x | Gráficos |
| Swiper | 11.x | Carousel/Slider |
| date-fns | 4.x | Manipulação de datas |
| @nuxt/content | 3.x | Módulo de conteúdo (instalado) |
| @nuxt/fonts | 0.11.x | Carregamento de fontes |
| @nuxt/icon | 1.x | Ícones |
| @nuxt/image | 1.x | Otimização de imagens |
| vue-html2pdf | 1.x | Geração de PDF (client-side) |
| ESLint | 9.x | Linting |

**Alias de importação:**
- `~` ou `@` aponta para `app/` (estrutura Nuxt 4 compatibility)
- `~~` ou `@@` aponta para a raiz do projeto

**Build:** Nuxt 3 com `future.compatibilityVersion: 4`. O diretório principal de código é `app/`.

**Deploy:** Firebase Hosting (projeto `conviteaniversario-ead9e`, site `pagodinho-da-rose`).

---

## 2. Estrutura de Pastas

```
Convite/
├── app/                         # Diretório principal (Nuxt 4 compat)
│   ├── @type/                   # Tipos TypeScript
│   │   └── product.ts           # ProductDto, SearchCarDto
│   ├── app.vue                  # Componente raiz (NuxtLayout + UApp + NuxtPage)
│   ├── app.config.ts            # Configuração do Nuxt UI (cores, botões)
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css         # Estilos globais (Tailwind + Nuxt UI + cores customizadas)
│   │   └── images/              # Imagens estáticas (logos, banners, ícones sociais)
│   ├── components/
│   │   └── Loading.vue          # Componente de loading animado
│   ├── layouts/
│   │   └── Default.vue          # Layout padrão (navbar, carrinho, menu — herança e-commerce)
│   ├── pages/
│   │   └── index.vue            # Página principal: convite de aniversário + RSVP
│   └── plugins/
│       ├── maska.ts             # Plugin de máscaras de input (v-maska)
│       ├── pinia.client.ts      # Plugin Pinia com persistência (client-side)
│       └── vue-html2pdf.js      # Plugin de geração de PDF
├── middleware/
│   └── auth.global.ts           # Middleware global de autenticação Firebase
├── plugins/
│   └── pinia-persist.ts         # Plugin Pinia com persistência (raiz)
├── public/
│   ├── favicon2.ico             # Favicon
│   └── favicon2.png             # Favicon PNG
├── server/
│   └── tsconfig.json            # Configuração TypeScript do servidor
├── services/
│   ├── api.ts                   # Cliente Axios configurado com token Firebase
│   ├── firebase.ts              # Inicialização Firebase + funções de auth/storage
│   ├── interceptors.ts          # Interceptors Axios (request/response)
│   └── zipCodeService.ts        # Busca de endereço por CEP (ViaCEP)
├── store/
│   └── cart.ts                  # Store Pinia do carrinho (herança e-commerce)
├── utils/
│   ├── constants.ts             # Constantes (produtos, pedidos, cartões — herança e-commerce)
│   ├── dateFormat.js            # Formatação de datas (DD/MM/YYYY, data longa)
│   ├── file.ts                  # Utilitário para extrair nome de arquivo de URL
│   ├── firebase.ts              # Tradução de erros Firebase para português
│   ├── formatCurrency.ts        # Formatação monetária (R$) e conversão numérica
│   ├── formatDocument.ts        # Formatação CPF/CNPJ
│   ├── formatedNameFiles.ts     # Formatação de nomes de arquivos de URLs
│   ├── months.ts                # Lista de meses em português
│   ├── phoneFormat.js           # Formatação de telefone
│   ├── states.ts                # Lista de estados brasileiros (UF + nome)
│   └── swalAlerts.js            # Wrappers SweetAlert2 (swalSuccess, swalError, swalWarning)
├── nuxt.config.ts               # Configuração Nuxt (módulos, CSS, plugins, runtimeConfig)
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configuração TypeScript
├── eslint.config.mjs            # Configuração ESLint
├── firebase.json                # Configuração Firebase Hosting
└── .firebaserc                  # Projeto Firebase (conviteaniversario-ead9e)
```

---

## 3. Página Principal (index.vue)

A página principal (`app/pages/index.vue`) é o **convite digital** de aniversário:

- **Layout:** Desabilita o layout padrão (`layout: false`) e usa design próprio
- **Background:** Gradiente rosa/laranja com padrão decorativo
- **Card branco** com borda decorativa gradiente
- **Header:** Imagem de capa + logo
- **Conteúdo:**
  - Mensagem de convite
  - Data: Sábado, 28 de Fevereiro
  - Horário: A partir das 12:00
  - Local: Chácara do Serrana (link Google Maps)
  - Instruções (o que levar)
- **RSVP:** Formulário de confirmação de presença
  - Input de nome do convidado
  - Botão de confirmação com estado de loading
  - Lista em tempo real dos confirmados
- **Firebase Firestore:** Coleção `rsvp_ale` para armazenar confirmações

```vue
<!-- Padrão de interação com Firestore -->
<script setup>
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { app } from "~~/services/firebase";

const db = getFirestore(app);
const confirmadosCol = collection(db, "rsvp_ale");
// ...buscar e adicionar documentos
</script>
```

---

## 4. Serviços

### 4.1 Firebase (`services/firebase.ts`)

Serviço central do projeto. Inicializa o Firebase e exporta funções:

| Função | Uso |
|---|---|
| `app` | Instância inicializada do Firebase |
| `auth` | Instância do Firebase Auth |
| `storage` | Instância do Firebase Storage |
| `isAuthenticated()` | Verifica se usuário está autenticado (Promise) |
| `getToken(forceRefresh?)` | Obtém token JWT do usuário |
| `singIn({ email, password })` | Login com email/senha |
| `signOut()` | Logout |
| `recoveryPassword(email)` | Envio de email de recuperação de senha |
| `signInWithGoogle()` | Login com Google (popup) |
| `signUpWithEmail({ email, password })` | Registro de novo usuário |
| `uploadPdfToStorage(file, name, cnpj)` | Upload de PDF para Storage |
| `uploadFilesToStorage(cnpj, name, file)` | Upload genérico para Storage |
| `uploadFileToStorage({ path, file })` | Upload por path completo |
| `deleteFile(cnpj, name)` | Deleta arquivo do Storage |
| `downloadFile(cnpj)` | Download de arquivos de uma pasta |

### 4.2 API (`services/api.ts`)

Cliente Axios configurado com `baseURL` do `runtimeConfig` e interceptor de autenticação (Bearer token Firebase):

```typescript
import axios from "axios";
import { getToken } from "./firebase";

const config = useRuntimeConfig();
const api = axios.create({ baseURL: config.public.baseUrl });

// Interceptor adiciona token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return { ...config, headers };
});
```

### 4.3 Busca de CEP (`services/zipCodeService.ts`)

```typescript
import { fetchAddressByZipCode } from "~~/services/zipCodeService";
const address = await fetchAddressByZipCode("77000000");
```

---

## 5. Alertas (SweetAlert2)

O projeto usa **SweetAlert2** para notificações toast (NÃO react-toastify):

```typescript
import { swalSuccess, swalError, swalWarning } from "~~/utils/swalAlerts";

swalSuccess("Título", "Mensagem de sucesso");
swalError("Título", "Mensagem de erro");
swalWarning("Título", "Mensagem de aviso");
```

Os alertas são exibidos como **toast no canto superior direito** com auto-dismiss de 2 segundos e barra de progresso.

---

## 6. Estado (Pinia)

### 6.1 Cart Store (`store/cart.ts`)

Store do carrinho (herança de projeto e-commerce anterior):

```typescript
import { useCartStore } from "~~/store/cart";

const cartStore = useCartStore();
cartStore.addToCart(product);
cartStore.removeFromCart(id);
cartStore.updateCart(product);
cartStore.clearCart();
```

### 6.2 Persistência

O Pinia é configurado com `pinia-plugin-persistedstate` para persistir estado no `localStorage`. Há dois plugins que fazem o mesmo (em `app/plugins/pinia.client.ts` e `plugins/pinia-persist.ts`).

---

## 7. Middleware

### auth.global.ts

Middleware global de autenticação. Verifica se o usuário está autenticado via Firebase. Rotas públicas (sem necessidade de login):

- `/` (página principal / convite)
- `/cadastro`
- `/cadastro/informacoesServicos`
- `/cadastro/addressWorkshop`
- `/cadastro/userData`

Se não autenticado e rota não pública, redireciona para `/home`.

---

## 8. Utilitários

| Utilitário | Import | Uso |
|---|---|---|
| `swalSuccess` / `swalError` / `swalWarning` | `~~/utils/swalAlerts` | Alertas toast via SweetAlert2 |
| `formatDate` / `formatDateLong` | `~~/utils/dateFormat` | Formata datas (DD/MM/YYYY ou "2 de Mar. de 2025") |
| `formatCurrency` / `transformToNumber` | `~~/utils/formatCurrency` | Formata valores monetários (R$) |
| `formatDocument` | `~~/utils/formatDocument` | Formata CPF (000.000.000-00) e CNPJ (00.000.000/0000-00) |
| `phoneMask` | `~~/utils/phoneFormat` | Formata telefone ((00) 00000-0000) |
| `getFileName` | `~~/utils/file` | Extrai nome de arquivo de URL |
| `formattedName` / `formattedNameList` | `~~/utils/formatedNameFiles` | Formata nomes de arquivos de URLs |
| `monthsList` | `~~/utils/months` | Lista de meses em português |
| `states` | `~~/utils/states` | Lista de estados brasileiros {value, label} |
| `firebaseErrorsTranslation` | `~~/utils/firebase` | Tradução de erros Firebase para português |

---

## 9. Plugins

| Plugin | Arquivo | Modo | Uso |
|---|---|---|---|
| Maska | `app/plugins/maska.ts` | universal | Diretiva `v-maska` para máscaras de input |
| Pinia | `app/plugins/pinia.client.ts` | client | Inicializa Pinia com persistência |
| vue-html2pdf | `app/plugins/vue-html2pdf.js` | client | Geração de PDF no navegador |

---

## 10. Estilização

### Tailwind CSS + Nuxt UI

A estilização principal é feita via **Tailwind CSS** integrado ao **Nuxt UI**. O arquivo `app/assets/css/main.css` define:

- Import do Tailwind e Nuxt UI
- Cores customizadas via `@theme static`:
  - **Primary:** Azul (#017acb) com escala 100-900
  - **Secondary:** Azul escuro (#2f6991) com escala 100-900
  - **Yellow:** Amarelo (#fac101) com escala 100-950
- Estilos globais para `label` e `body`

### Configuração de Tema (app.config.ts)

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
  },
});
```

> **Nota:** O `colorMode` está desabilitado em `nuxt.config.ts` (`ui: { colorMode: false }`).

### Fontes

A página de convite usa fontes via Google Fonts importadas no `<style scoped>`:
- **Poppins** (texto geral)
- **Dancing Script** (decorativo)

---

## 11. Configuração do Nuxt

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/content", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],
  ui: { colorMode: false },
  css: ["~/assets/css/main.css"],
  plugins: [{ src: "@/plugins/vue-html2pdf", mode: "client" }],
  future: { compatibilityVersion: 4 },
  runtimeConfig: {
    app: { baseUrl: process.env.BASE_URL, subventionBaseUrl: process.env.SUBVENTION_BASE_URL },
    public: { baseUrl: process.env.BASE_URL, dev: process.env.NODE_ENV, subventionBaseUrl: process.env.SUBVENTION_BASE_URL },
  },
});
```

**Módulos ativos:**
- `@nuxt/ui` — Componentes UI (botões, modais, containers, ícones)
- `@nuxt/eslint` — Linting
- `@nuxt/content` — Conteúdo estático
- `@nuxt/fonts` — Carregamento otimizado de fontes
- `@nuxt/icon` — Ícones (Heroicons, Lucide, etc.)
- `@nuxt/image` — Otimização de imagens

---

## 12. Deploy (Firebase Hosting)

```json
// firebase.json
{
  "hosting": {
    "site": "pagodinho-da-rose",
    "public": ".output/public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

**Comandos:**
- `npm run generate` — Gera o site estático em `.output/public/`
- `firebase deploy --only hosting` — Deploya para Firebase Hosting

---

## 13. Tipos TypeScript

### ProductDto (`app/@type/product.ts`)

```typescript
type ProductDto = {
  id: number;
  name: string;
  brand: string;
  code: string;
  isPromotion: boolean;
  price: number;
  oldPrice?: number;
  paymentMethods: string;
  imagens: string[];
  quantity: number;
  description?: string;
  deliveryTime?: string;
  deliveryTimeOld?: string;
  subtotal?: number;
  technicalSpecifications?: { type?; position?; side?; material?; weight?; dimensions?; guarantee?; application? };
};

type SearchCarDto = {
  carPlate?: string;
  partName: string;
  car?: string;
  partCode?: string;
};
```

> **Nota:** Esses tipos são herança do projeto e-commerce anterior e podem ser removidos/adaptados conforme necessário.

---

## 14. Código Legado (Herança E-commerce)

O projeto contém código de um projeto e-commerce anterior que **não é utilizado pela página de convite atual**:

- `app/layouts/Default.vue` — Layout com navbar, carrinho e menu de e-commerce
- `app/@type/product.ts` — Tipos de produto e busca
- `store/cart.ts` — Store do carrinho de compras
- `utils/constants.ts` — Listas de produtos, pedidos, cartões de crédito
- `services/interceptors.ts` — Interceptors Axios genéricos
- Diversas páginas referenciadas no middleware (`/cadastro`, `/home`, etc.) que não existem

Este código pode ser mantido como referência ou removido durante limpeza.

---

## 15. Convenções Obrigatórias

### 15.1 Framework

- **Nuxt 3** com compatibilidade Nuxt 4 (`future.compatibilityVersion: 4`)
- Diretório principal é `app/` (NÃO `src/`)
- **NÃO** é React, Vite puro ou Next.js
- Usar APIs do Nuxt: `definePageMeta`, `navigateTo`, `useRuntimeConfig`, `defineNuxtPlugin`, `defineNuxtRouteMiddleware`

### 15.2 Roteamento

- Roteamento **file-based** do Nuxt (pasta `app/pages/`)
- Navegação programática via `navigateTo("/rota")`
- **NÃO** usar `useRouter` do vue-router diretamente; preferir `navigateTo()`

### 15.3 Componentes UI

- Usar componentes do **Nuxt UI** (`UButton`, `UContainer`, `UDropdownMenu`, `UIcon`, `USlideover`, `UApp`, etc.)
- Estilizar com classes **Tailwind CSS**

### 15.4 Tipagem

- Definir interfaces/types TypeScript para props, payloads e dados
- Evitar `any` sempre que possível
- Tipos ficam em `app/@type/`

### 15.5 Alertas e Notificações

- Usar `swalSuccess`, `swalError`, `swalWarning` de `~~/utils/swalAlerts`
- Mensagens em **português brasileiro**

### 15.6 Firebase

- Toda interação com Firebase deve usar as funções já exportadas de `~~/services/firebase`
- Firestore para dados em tempo real
- Storage para uploads de arquivos
- Auth para autenticação

### 15.7 Estado

- Usar **Pinia** para estado global
- Stores ficam em `store/`
- Usar `persist: true` quando necessário manter estado entre recarregamentos

### 15.8 Nomenclatura

- **Componentes Vue:** PascalCase (ex.: `Loading.vue`, `Default.vue`)
- **Pages:** kebab-case ou camelCase conforme padrão Nuxt
- **Utils:** camelCase (ex.: `formatCurrency.ts`, `swalAlerts.js`)
- **Services:** camelCase (ex.: `firebase.ts`, `api.ts`)
- **Types:** PascalCase com sufixo `Dto` ou `Type` (ex.: `ProductDto`)

### 15.9 Idioma

- Mensagens ao usuário em **português brasileiro**
- Erros Firebase traduzidos via `firebaseErrorsTranslation`

---

## 16. Resumo Rápido para o Agente

1. **Framework:** Nuxt 3 (NÃO React, NÃO Vite puro). Código principal em `app/`.
2. **Propósito:** Convite digital de aniversário com RSVP via Firestore.
3. **UI:** Nuxt UI + Tailwind CSS. Componentes prefixados com `U` (UButton, UContainer, etc.).
4. **Backend:** Firebase (Auth + Firestore + Storage + Hosting).
5. **Estado:** Pinia com persistência.
6. **Alertas:** SweetAlert2 via `swalSuccess`/`swalError`/`swalWarning`.
7. **Validação:** Zod para schemas.
8. **Máscaras:** Maska via diretiva `v-maska`.
9. **Imports:** `~` para `app/`, `~~` para raiz do projeto.
10. **Deploy:** `npm run generate` + `firebase deploy --only hosting`.
11. **Navegação:** `navigateTo("/rota")` (Nuxt) — NÃO usar APIs do React Router.
12. **Idioma:** Mensagens em português brasileiro.
13. **Código legado:** Há código de e-commerce que pode ser ignorado/removido.
