import windSpeed1 from "@/assets/images/wind/wind-speed-1.png";
import windSpeed9 from "@/assets/images/wind/wind-speed-9.png";
import windSpeed29 from "@/assets/images/wind/wind-speed-29.png";
import windSpeed50 from "@/assets/images/wind/wind-speed-50.png";
import windSpeed69 from "@/assets/images/wind/wind-speed-69.png";
import windSpeed90 from "@/assets/images/wind/wind-speed-90.png";
import windSpeed109 from "@/assets/images/wind/wind-speed-109.png";
import windSpeed130 from "@/assets/images/wind/wind-speed-130.png";
import windSpeed149 from "@/assets/images/wind/wind-speed-149.png";
import windSpeed170 from "@/assets/images/wind/wind-speed-170.png";
import windSpeed189 from "@/assets/images/wind/wind-speed-189.png";
import windSpeed210 from "@/assets/images/wind/wind-speed-210.png";
import windSpeed229 from "@/assets/images/wind/wind-speed-229.png";
import windSpeed250 from "@/assets/images/wind/wind-speed-250.png";
import windSpeed269 from "@/assets/images/wind/wind-speed-269.png";
import windSpeed290 from "@/assets/images/wind/wind-speed-290.png";
import windSpeed309 from "@/assets/images/wind/wind-speed-309.png";
import windSpeed330 from "@/assets/images/wind/wind-speed-330.png";
import windSpeed349 from "@/assets/images/wind/wind-speed-349.png";
import windSpeed370 from "@/assets/images/wind/wind-speed-370.png";
import windSpeed389 from "@/assets/images/wind/wind-speed-389.png";
import windSpeed410 from "@/assets/images/wind/wind-speed-410.png";
import windSpeed429 from "@/assets/images/wind/wind-speed-429.png";
import windSpeed450 from "@/assets/images/wind/wind-speed-450.png";
import windSpeed469 from "@/assets/images/wind/wind-speed-469.png";
import windSpeed490 from "@/assets/images/wind/wind-speed-490.png";
import windSpeed509 from "@/assets/images/wind/wind-speed-509.png";
import windSpeed530 from "@/assets/images/wind/wind-speed-530.png";

//根据风速大小，返回具体的风图片名称
const getImage = val => {
  val = val * 10;
  if (val || val == 0) {
    if (0 <= val && val <= 1) {
      return windSpeed1;
    } else if (1 < val && val <= 9) {
      return windSpeed9;
    } else if (9 < val && val <= 29) {
      return windSpeed29;
    } else if (29 < val && val <= 50) {
      return windSpeed50;
    } else if (50 < val && val <= 69) {
      return windSpeed69;
    } else if (69 < val && val <= 90) {
      return windSpeed90;
    } else if (90 < val && val <= 109) {
      return windSpeed109;
    } else if (109 < val && val <= 130) {
      return windSpeed130;
    } else if (130 < val && val <= 149) {
      return windSpeed149;
    } else if (149 < val && val <= 170) {
      return windSpeed170;
    } else if (170 < val && val <= 189) {
      return windSpeed189;
    } else if (189 < val && val <= 210) {
      return windSpeed210;
    } else if (210 < val && val <= 229) {
      return windSpeed229;
    } else if (229 < val && val <= 250) {
      return windSpeed250;
    } else if (250 < val && val <= 269) {
      return windSpeed269;
    } else if (269 < val && val <= 290) {
      return windSpeed290;
    } else if (290 < val && val <= 309) {
      return windSpeed309;
    } else if (309 < val && val <= 330) {
      return windSpeed330;
    } else if (330 < val && val <= 349) {
      return windSpeed349;
    } else if (349 < val && val <= 370) {
      return windSpeed370;
    } else if (370 < val && val <= 389) {
      return windSpeed389;
    } else if (389 < val && val <= 410) {
      return windSpeed410;
    } else if (410 < val && val <= 429) {
      return windSpeed429;
    } else if (429 < val && val <= 450) {
      return windSpeed450;
    } else if (450 < val && val <= 469) {
      return windSpeed469;
    } else if (469 < val && val <= 490) {
      return windSpeed490;
    } else if (490 < val && val <= 509) {
      return windSpeed509;
    } else if (509 < val && val <= 530) {
      return windSpeed530;
    } else {
      return "";
    }
  } else {
    return "";
  }
};

//根据风向得到角度值
const getAngle = key => {
  let angle;
  if (key) {
    switch (key) {
      case "N":
        angle = 360;
        break;
      case "NNE":
        angle = 337.5;
        break;
      case "NE":
        angle = 315;
        break;
      case "ENE":
        angle = 292.5;
        break;
      case "E":
        angle = 270;
        break;
      case "ESE":
        angle = 247.5;
        break;
      case "SE":
        angle = 225;
        break;
      case "SSE":
        angle = 202.5;
        break;
      case "S":
        angle = 180;
        break;
      case "SSW":
        angle = 157.5;
        break;
      case "SW":
        angle = 135;
        break;
      case "WSW":
        angle = 112.5;
        break;
      case "W":
        angle = 90;
        break;
      case "WNW":
        angle = 67.5;
        break;
      case "NW":
        angle = 45;
        break;
      case "NNW":
        angle = 22.5;
        break;
    }
  }
  // console.log(key, angle, angle - 90)
  return angle ? angle - 90 : "";
};

let windPointIdArr = [];
// 绘制风场点
export const drawWindPoint = (resData, callBack) => {
  // 清除已绘制风场点
  if (windPointIdArr.length > 0) {
    for (const item of windPointIdArr) {
      window.viewer.entities.removeById(`windPointId${item}`);
    }
    windPointIdArr = [];
  }

  const entities = window.viewer.entities;
  // console.log(window.viewer.scene.imageryLayers.get(4));
  resData.forEach(res => {
    windPointIdArr.push(res.windPointId);
    entities.add({
      id: `windPointId${res.windPointId}`,
      position: Cesium.Cartesian3.fromDegrees(res.lon, res.lat, 1000),
      billboard: {
        image: getImage(res.maxFreqWindSpeed),
        scale: 0.8,
        rotation: getAngle(res.maxFreqWindDirection)
      },
      properties: res,
      layer: window.viewer.scene.imageryLayers.get(4)
    });
  });
  callBack();
};

// 创建鼠标移动事件
let windPointHandler;
export const createWindPointHandler = () => {
  const infobox = document.getElementById("infobox");
  windPointHandler = new Cesium.ScreenSpaceEventHandler(
    window.viewer.scene.canvas
  );
  windPointHandler.setInputAction(movement => {
    // 获取鼠标指针下的点位
    const pickedObject = window.viewer.scene.pick(movement.endPosition);
    // 判断选中的实体是否是点位
    if (
      Cesium.defined(pickedObject) &&
      pickedObject?.id?.properties?.year &&
      pickedObject?.id?.position?.getValue()
    ) {
      const entity = pickedObject.id;

      const position = entity.position?.getValue();
      const screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        window.viewer.scene,
        position
      );

      if (Cesium.defined(screenPosition)) {
        const properties = entity.properties;

        document.body.style.cursor = "pointer";
        infobox.style.top = `${screenPosition.y}px`;
        infobox.style.left = `${screenPosition.x + 10}px`;
        infobox.style.display = "block";

        const name = `<div class="t-name">${properties?.year?.getValue()}年</div>`;
        let airPress = "";
        if (properties?.airPress?.getValue()) {
          airPress = `<div class="t-block">气压：${properties?.airPress?.getValue()}百帕</div>`;
        }
        let relHum = "";
        if (properties?.relHum?.getValue()) {
          relHum = `<div class="t-block">相对湿度：${properties?.relHum?.getValue()}%</div>`;
        }
        let seaTemp = "";
        if (properties?.seaTemp?.getValue()) {
          seaTemp = `<div class="t-block">海面温度：${properties?.seaTemp?.getValue()}℃</div>`;
        }
        let maxFreqWindSpeed = "";
        if (properties?.maxFreqWindSpeed?.getValue()) {
          maxFreqWindSpeed = `${properties?.maxFreqWindSpeed?.getValue()}米/秒`;
        }

        let maxFreqWindDirection = "";
        if (properties?.maxFreqWindDirection?.getValue()) {
          maxFreqWindDirection = `<div class="t-block">高频风向(风速)：${properties?.maxFreqWindDirection?.getValue()}(${maxFreqWindSpeed})</div>`;
        }
        infobox.innerHTML =
          name + airPress + relHum + seaTemp + maxFreqWindDirection;
      } else {
        document.body.style.cursor = "default";
        infobox.style.display = "none";
      }
    } else {
      document.body.style.cursor = "default";
      infobox.style.display = "none";
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};

// 清除
export const removeDraw = () => {
  // 卸载 handleMouseMove 事件
  if (windPointHandler) {
    windPointHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
};
