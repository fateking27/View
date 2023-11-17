import { defineStore } from "pinia";
import { store } from "@/store";
export const useLegendStore = defineStore({
  id: "legend",
  state: () => ({
    legendData: []
  }),
  actions: {
    // 设置图例数据
    setLegend(value) {
      this.legendData = value;
    },
    // 清除图例数据
    clear() {
      this.legendData = [];
    }
  }
});

export function useLegendStoreHook() {
  return useLegendStore(store);
}
