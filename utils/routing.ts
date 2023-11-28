import { useMainStore, useSizeStore } from "~/stores/main";

export function reroute(path: string): string | null {
  if (path !== "/" && !canAccessSizePage()) {
    return "/";
  } else if (path === "/measure" && !canAccessMeasurePage()) {
    return "/size";
  }

  return null;
}

export const canAccessSizePage = () => {
  const mainStore = useMainStore();
  return mainStore.bitmap !== null;
};

export const canAccessMeasurePage = () => {
  const sizeStore = useSizeStore();
  return sizeStore.changed && sizeStore.size !== null && sizeStore.size > 0;
};
