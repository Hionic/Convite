import VueHtml2pdf from "vue-html2pdf";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueHtml2pdf);
});

export const teste = "alow";
