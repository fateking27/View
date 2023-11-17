import { defineStore } from "pinia";
import { store } from "@/store";

export const useCesiumStore = defineStore({
  id: "cesium",
  state: () => ({
    defaultCenter: {}
  }),
  actions: {
    // 设置初始化点位
    setDefaultCenter(value) {
      this.defaultCenter = value;
    },
    // 清除渲染数据
    clear() {
      if (window.viewer.entities) {
        window.viewer.entities.removeAll();
      }
      if (window.viewer.dataSources) {
        window.viewer.dataSources.removeAll();
      }
      window.viewer.scene.camera.setView(this.defaultCenter);
    }
  }
});

export function useCesiumStoreHook() {
  return useCesiumStore(store);
}
