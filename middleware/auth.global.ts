import { isAuthenticated } from "../services/firebase";

const publicPaths = [
  "/",
  "/cadastro",
  "/cadastro/informacoesServicos",
  "/cadastro/addressWorkshop",
  "/cadastro/userData",
];

export default defineNuxtRouteMiddleware(async (to) => {
  const authenticated = await isAuthenticated();

  if (!authenticated && !publicPaths.includes(to.path)) {
    return navigateTo("/home");
  }
});
