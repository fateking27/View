// 气温颜色
import { useLegendStoreHook } from "@/store/modules/legend";

const tempColor = {
  "8": "#A8FF65",
  "12": "#F1EE3C",
  "16": "#FFDD51",
  "20": "#FFCD72",
  "24": "#FFBC92",
  "28": "#FFA3A3",
  "32": "#FF6565"
};

const getTempColor = temp => {
  if (temp <= 2) {
    return tempColor["8"];
  } else if (temp <= 3) {
    return tempColor["12"];
  } else if (temp <= 4) {
    return tempColor["16"];
  } else if (temp <= 5) {
    return tempColor["20"];
  } else if (temp <= 6) {
    return tempColor["24"];
  } else if (temp <= 7) {
    return tempColor["28"];
  } else if (temp <= 8) {
    return tempColor["32"];
  }
};

// 图例
const legendArr = [
  {
    name: "小于等于2℃",
    color: tempColor["8"]
  },
  {
    name: "小于等于3℃",
    color: tempColor["12"]
  },
  {
    name: "小于等于4℃",
    color: tempColor["16"]
  },
  {
    name: "小于等于5℃",
    color: tempColor["20"]
  },
  {
    name: "小于等于6℃",
    color: tempColor["24"]
  },
  {
    name: "小于等于7℃",
    color: tempColor["28"]
  },
  {
    name: "小于等于8℃",
    color: tempColor["32"]
  }
];

// 绘制块区域
export const setEntity = (resData, dataSourceName, callBack?) => {
  Cesium.GeoJsonDataSource.load(resData, {
    clampToGround: true
  }).then(dataSource => {
    dataSource.name = dataSourceName;
    window.viewer.dataSources.add(dataSource);
    const dataSourceEntities = dataSource.entities.values;

    for (const entity of dataSourceEntities as any) {
      // 温度场
      const centerSeaTemp = entity.properties?.centerSeaTemp?.getValue();
      if (centerSeaTemp) {
        useLegendStoreHook().setLegend(legendArr);
        entity.properties.tempColor = getTempColor(centerSeaTemp);
        entity.polygon.material = Cesium.Color.fromCssColorString(
          getTempColor(centerSeaTemp)
        ).withAlpha(0.65);
      } else {
        entity.polygon.material =
          Cesium.Color.fromCssColorString("#3A78FF").withAlpha(0.65);
      }

      // entity.id = Cesium.createGuid();
      entity.polygon.outline = true;
      entity.polygon.outlineColor = Cesium.Color.fromCssColorString("#999");
      entity.polygon.outlineWidth = 10;
      entity.polygon.height = 1000;

      entity.position = Cesium.BoundingSphere.fromPoints(
        entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
      ).center;

      entity.label = {
        show: false,
        text: entity.name || entity?.properties?.city?.getValue(), // 标签显示的文本
        font: "14px sans-serif",
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        height: 1500
      };
    }

    window.viewer.scene.postProcessStages.fxaa.enabled = false; //去锯齿 是文字清晰
    window.viewer
      .flyTo(dataSourceEntities, {
        duration: 0.1, // 以秒为单位的飞行持续时间。
        offset: {
          heading: Cesium.Math.toRadians(0.0), // 以弧度为单位的航向角。
          pitch: Cesium.Math.toRadians(-90), // 以弧度为单位的俯仰角。
          range: 0 // 到中心的距离，以米为单位。
        }
      })
      .then(() => {
        if (callBack) {
          callBack(dataSource);
        }
      });
  });
};
