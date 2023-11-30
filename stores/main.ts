import { defineStore } from "pinia";
import type { Marker } from "~/utils/data2d";

export type MainStoreType = {
  bitmap: ImageBitmap | null;
  width: number;
  height: number;
};

export const useMainStore = defineStore("main", {
  state: (): MainStoreType => {
    return { bitmap: null, width: 0, height: 0 };
  },
  actions: {
    update(bitmap: ImageBitmap) {
      function getDimensionDenominator(value: number, max: number) {
        if (value <= max) return 1;
        return value / max;
      }

      const shouldClearStores = bitmap !== this.bitmap;

      const maxSizeDenominator = 1.4;

      const maxWidth = window.innerWidth / maxSizeDenominator;
      const maxHeight =
        window.innerHeight / maxSizeDenominator -
        // Topbar height
        50;

      const xDenominator = getDimensionDenominator(bitmap.width, maxWidth);
      const yDenominator = getDimensionDenominator(bitmap.height, maxHeight);
      const maxDenominator = Math.max(xDenominator, yDenominator);
      this.width = bitmap.width / maxDenominator;
      this.height = bitmap.height / maxDenominator;
      this.bitmap = bitmap;

      if (shouldClearStores) {
        useSizeStore().$reset();
        useMeasureStore().$reset();
      }
    },
  },
});

export type SizeStoreType = {
  marker1: Marker;
  marker2: Marker;
  size: number | null;
  unit: string | null;
};

export const useSizeStore = defineStore("size", {
  state: (): SizeStoreType => {
    return {
      marker1: { x: 0.25, y: 0.5 } as Marker,
      marker2: { x: 0.75, y: 0.5 } as Marker,
      size: null,
      unit: null,
    };
  },

  getters: {
    changed(): boolean {
      return (
        this.marker1.x !== 0.25 ||
        this.marker1.y !== 0.5 ||
        this.marker2.x !== 0.75 ||
        this.marker2.y !== 0.5
      );
    },

    denominator(): number {
      const mainStore = useMainStore();
      const marker1 = this.marker1;
      const marker2 = this.marker2;
      const x = Math.abs(marker1.x - marker2.x) * mainStore.width;
      const y = Math.abs(marker1.y - marker2.y) * mainStore.height;
      const pixelDist = distance({ x: 0, y: 0 }, { x, y });

      return pixelDist / this.size!;
    },
  },
});

export type MeasureStoreType = {
  areas: Area[];
  currentAreaIndex: number;
};

export type Area = {
  id: number;
  markers: Marker[];
  intersectingLines: Set<number>;
  size: number | null;
};

let nextMarkerId = 0;
let nextAreaId = 0;
const createArea = () => ({
  id: nextAreaId++,
  markers: [],
  intersectingLines: new Set<number>(),
  size: null,
});

export const useMeasureStore = defineStore("measure", {
  state: (): MeasureStoreType => {
    return { areas: [createArea()], currentAreaIndex: 0 };
  },

  getters: {
    area(): Area {
      return this.areas[this.currentAreaIndex];
    },

    markers(): Marker[] {
      return this.area.markers;
    },
  },

  actions: {
    deleteArea(index: number) {
      this.areas.splice(index, 1);

      if (this.areas.length === 0) {
        this.areas.push(createArea());
      } else if (this.currentAreaIndex === this.areas.length) {
        this.currentAreaIndex--;
      }
    },

    setCurrentArea(index: number) {
      this.currentAreaIndex = index;
    },

    addArea() {
      this.areas.push(createArea());
      this.currentAreaIndex = this.areas.length - 1;
    },

    addMarker(x: number, y: number) {
      this.areas[this.currentAreaIndex].markers.push({
        x,
        y,
        id: nextMarkerId++,
      });
    },
  },
});
