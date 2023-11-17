import { getImageryProvider } from "@/utils/tdt/tianditu";

let moveActive = false;
let splitViewHandler;

export const splitView = () => {
  window.viewer.imageryLayers.addImageryProvider(
    getImageryProvider("vec")
  ).splitDirection = Cesium.SplitDirection.RIGHT;

  window.viewer.imageryLayers.addImageryProvider(
    getImageryProvider("ibo")
  ).splitDirection = Cesium.SplitDirection.RIGHT;

  window.viewer.imageryLayers.addImageryProvider(
    getImageryProvider("cia")
  ).splitDirection = Cesium.SplitDirection.RIGHT;

  const slider: any = document.getElementById("splitViewSlider");

  window.viewer.scene.splitPosition =
    slider.offsetLeft / slider.parentElement.offsetWidth;
  splitViewHandler = new Cesium.ScreenSpaceEventHandler(slider);
  function move(movement) {
    if (!moveActive) {
      return;
    }
    const relativeOffset = movement.endPosition.x;
    const splitPosition =
      (slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
    slider.style.left = `${100.0 * splitPosition}%`;
    window.viewer.scene.splitPosition = splitPosition;
  }
  splitViewHandler.setInputAction(() => {
    moveActive = true;
  }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
  splitViewHandler.setInputAction(() => {
    moveActive = true;
  }, Cesium.ScreenSpaceEventType.PINCH_START);

  splitViewHandler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  splitViewHandler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

  splitViewHandler.setInputAction(() => {
    moveActive = false;
  }, Cesium.ScreenSpaceEventType.LEFT_UP);
  splitViewHandler.setInputAction(() => {
    moveActive = false;
  }, Cesium.ScreenSpaceEventType.PINCH_END);
};

export const clearSplitView = () => {
  const imageryLayers = window.viewer.imageryLayers;
  const layerCount = imageryLayers.length;
  if (layerCount > 0) {
    imageryLayers.remove(imageryLayers.get(layerCount - 1));
    imageryLayers.remove(imageryLayers.get(layerCount - 2));
    imageryLayers.remove(imageryLayers.get(layerCount - 3));
  }
  moveActive = false;
  splitViewHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
  splitViewHandler.removeInputAction(Cesium.ScreenSpaceEventType.PINCH_START);
  splitViewHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  splitViewHandler.removeInputAction(Cesium.ScreenSpaceEventType.PINCH_MOVE);
  splitViewHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
  splitViewHandler.removeInputAction(Cesium.ScreenSpaceEventType.PINCH_END);
  splitViewHandler = null;
};
