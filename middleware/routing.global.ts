import { reroute } from "../utils/routing";

export default defineNuxtRouteMiddleware((to, from) => {
  const newRoute = reroute(to.path);
  if (newRoute !== null) {
    return navigateTo(newRoute);
  }
});
