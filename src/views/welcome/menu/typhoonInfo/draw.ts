import { getTyphoonInfoDetail } from "@/api/home";
import typhoonIcon from "@/assets/images/typhoon-icon.png";
import { message } from "@/utils/message";
import dayjs from "dayjs";
import { useLegendStoreHook } from "@/store/modules/legend";

const typhoonColor = {
  "6": "#fff",
  "7": "#eed139",
  "9": "#0000ff",
  "11": "#0f8000",
  "13": "#fe9c45",
  "15": "#fe00fe",
  "17": "#fe0000"
};

const typhoonName = {
  "6": "其他",
  "7": "热带低压(TD)",
  "9": "热带风暴(TS)",
  "11": "强热带风暴(STS)",
  "13": "台风(TY)",
  "15": "强台风(STY)",
  "17": "超强台风(SuperTY)"
};

// 图例
const legendArr = [
  {
    name: typhoonName["7"],
    color: typhoonColor["7"]
  },
  {
    name: typhoonName["9"],
    color: typhoonColor["9"]
  },
  {
    name: typhoonName["11"],
    color: typhoonColor["11"]
  },
  {
    name: typhoonName["13"],
    color: typhoonColor["13"]
  },
  {
    name: typhoonName["15"],
    color: typhoonColor["15"]
  },
  {
    name: typhoonName["17"],
    color: typhoonColor["17"]
  },
  {
    name: typhoonName["6"],
    color: typhoonColor["6"]
  }
];

export const setTyphoonLegend = () => {
  useLegendStoreHook().setLegend(legendArr);
};

let activeIds = []; // 已渲染ID
let activeIdsArr = []; // 已渲染ID点集合

export const drawTyphoon = data => {
  const ids = [];
  for (const item of data) {
    ids.push(item.typhoonInfoId);
    const index = activeIds.indexOf(item.typhoonInfoId);
    if (index === -1) {
      // 绘制台风路径
      nextDraw(item);
    }
  }

  // 删除台风路径
  const diff = activeIds.filter(value => !ids.includes(value));
  for (const item of diff) {
    for (const a of activeIdsArr) {
      if (a.id === item) {
        for (const b of a.arr) {
          window.viewer.entities.removeById(`rang${b}`);
          window.viewer.entities.removeById(`point${b}`);
          window.viewer.entities.removeById(`line${b}`);
          window.viewer.entities.removeById(`lastPosition${b}`);
          window.viewer.entities.removeById(`firstPosition${b}`);
          window.viewer.entities.removeById(`rang7-${b}`);
          window.viewer.entities.removeById(`rang10-${b}`);
          window.viewer.entities.removeById(`rang12-${b}`);
        }
      }
    }
    const index = activeIds.indexOf(item);
    activeIds.splice(index, 1);
  }
};

const nextDraw = async parentItem => {
  const res = await getTyphoonInfoDetail({
    typhoonInfoId: parentItem.typhoonInfoId
  });

  const detailData = res.data.typhoonTracks;

  if (!detailData || detailData?.length === 0) {
    return message(
      `暂无${parentItem?.typhoonNameCn} ${parentItem?.typhoonName}详情数据`,
      {
        type: "warning"
      }
    );
  }

  // 开始绘制折线
  const positions = [];
  const positionsArr = [];
  for (const item of detailData) {
    positionsArr.push(item.typhoonTrackId);
    const i = Cesium.Cartesian3.fromDegrees(
      item.longitude,
      item.latitude,
      1000
    );
    positions.push(i);
  }
  for (let i = 0; i < positions.length; i++) {
    const properties = detailData[i];
    properties.name = `${parentItem.typhoonNameCn} ${parentItem.typhoonName}`;
    window.viewer.entities.add({
      id: `point${detailData[i]["typhoonTrackId"]}`,
      position: positions[i],
      point: {
        pixelSize: 12,
        color: Cesium.Color.fromCssColorString(
          typhoonColor[detailData[i].power]
        )
      },
      properties: properties
    });

    // 如果不是第一个点，则使用PolylineGraphics将上一个点与当前点连接起来
    if (i > 0) {
      const prevPos = positions[i - 1];
      const curPos = positions[i];

      // 创建当前段折线
      // 将折线添加到当前点的Entity中
      // entity.polyline = new Cesium.PolylineGraphics({
      //   positions: [prevPos, curPos],
      //   material: Cesium.Color.fromCssColorString(
      //     typhoonColor[detailData[i].power]
      //   ),
      //   width: 2
      // });
      window.viewer.entities.add({
        id: `line${detailData[i]["typhoonTrackId"]}`,
        polyline: {
          positions: [prevPos, curPos],
          width: 2,
          material: Cesium.Color.fromCssColorString(
            typhoonColor[detailData[i].power]
          )
        }
      });
    }
  }

  // 第一点添加台风名称
  const firstPosition = positions[0];
  window.viewer.entities.add({
    id: `firstPosition${detailData[0].typhoonTrackId}`,
    position: firstPosition,
    label: {
      text: parentItem.typhoonNameCn,
      font: "17px sans-serif",
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.RED,
      outlineWidth: 1,
      pixelOffset: new Cesium.Cartesian2(0, 25)
    }
  });

  // 添加最后一个点的旋转图片
  const lastPosition = positions[positions.length - 1];
  const billboardEntity = window.viewer.entities.add({
    id: `lastPosition${detailData[detailData.length - 1].typhoonTrackId}`,
    position: lastPosition,
    billboard: {
      image: typhoonIcon,
      scale: 0.9,
      width: 40,
      height: 40
    }
  });

  // 创建旋转动画
  let rotationAmount = 0;
  const rotationRate = 0.1; // 每秒旋转0.1弧度
  window.viewer.clock.onTick.addEventListener(() => {
    rotationAmount += rotationRate;
    billboardEntity.billboard.rotation = rotationAmount;
  });

  // 添加最后一个点的预测路径
  for (const forecastsData of detailData[detailData.length - 1]
    .countryTyphoonForecasts) {
    if (!forecastsData || forecastsData?.length === 0) {
      return;
    }
    const lastPositions = [];
    for (const item of forecastsData) {
      positionsArr.push(item.typhoonForecastId);
      const i = Cesium.Cartesian3.fromDegrees(
        item.longitude,
        item.latitude,
        1000
      );
      lastPositions.push(i);
    }
    for (let i = 0; i < lastPositions.length; i++) {
      const properties = forecastsData[i];
      properties.name = `${parentItem.typhoonNameCn} ${parentItem.typhoonName}`;
      const entity = window.viewer.entities.add({
        id: `point${forecastsData[i]["typhoonForecastId"]}`,
        position: lastPositions[i],
        point: {
          pixelSize: 12,
          color: Cesium.Color.fromCssColorString(
            typhoonColor[forecastsData[i].power]
          )
        },
        properties: properties
      });

      if (i === 0) {
        entity.polyline = new Cesium.PolylineGraphics({
          positions: [lastPosition, lastPositions[i]],
          material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.fromCssColorString(
              typhoonColor[detailData[detailData.length - 1].power]
            )
          }),
          width: 2
        });
      }

      // 如果不是第一个点，则使用PolylineGraphics将上一个点与当前点连接起来
      if (i > 0) {
        // 创建当前段折线
        // 将折线添加到当前点的Entity中
        const prevPos = lastPositions[i - 1];
        const curPos = lastPositions[i];
        window.viewer.entities.add({
          id: `line${forecastsData[i]["typhoonForecastId"]}`,
          polyline: {
            positions: [prevPos, curPos],
            material: new Cesium.PolylineDashMaterialProperty({
              color: Cesium.Color.fromCssColorString(
                typhoonColor[forecastsData[i].power]
              )
            }),
            width: 2
          }
        });
        // entity.polyline = new Cesium.PolylineGraphics({
        //   positions: [prevPos, curPos],
        //   material: new Cesium.PolylineDashMaterialProperty({
        //     color: Cesium.Color.fromCssColorString(
        //       typhoonColor[forecastsData[i].power]
        //     )
        //   }),
        //   width: 2
        // });
      }
    }
  }

  // 添加台风范围形状
  const lastPositionRanges = detailData[detailData.length - 1]?.typhoonRanges;
  if (lastPositionRanges?.length > 0) {
    drawRange(detailData[detailData.length - 1]);
  }

  // 已渲染ID
  activeIds.push(parentItem.typhoonInfoId);
  activeIdsArr.push({
    id: parentItem.typhoonInfoId,
    arr: positionsArr
  });

  window.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      detailData[detailData.length - 1].longitude,
      detailData[detailData.length - 1].latitude,
      5000000
    ), //设置位置
    duration: 1,
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0),
      roll: Cesium.Math.toRadians(0.0)
    }
  });
};

// 创建鼠标移动事件
let typhoonHandler;
export const createTyphoonHandler = () => {
  const infobox = document.getElementById("infobox");
  typhoonHandler = new Cesium.ScreenSpaceEventHandler(
    window.viewer.scene.canvas
  );
  typhoonHandler.setInputAction(movement => {
    // 获取鼠标指针下的点位
    const pickedObject = window.viewer.scene.pick(movement.endPosition);
    // 判断选中的实体是否是点位
    if (Cesium.defined(pickedObject) && pickedObject?.id?.properties) {
      const entity = pickedObject.id;
      const position = entity.position.getValue();
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

        const name = `<div class="t-name">${properties?.name?.getValue()}</div>`;
        const time = `<div class="t-block">过去时间：${dayjs(
          properties?.collectionTime?.getValue()
        ).format("MM月DD日 HH时")}</div>`;
        const center = `<div class="t-block">中心位置：${properties?.latitude?.getValue()}N/${properties?.longitude?.getValue()}E</div>`;
        const airSpeed = `<div class="t-block">最大风速：${properties?.airSpeed?.getValue()}米/秒</div>`;

        const airPressure = `<div class="t-block">中心气压：${properties?.airPressure?.getValue()}百帕</div>`;

        let moveDirection = "";
        if (properties?.moveDirection?.getValue()) {
          moveDirection = `<div class="t-block">移动方向：${properties?.moveDirection?.getValue()}</div>`;
        }
        let moveSpeed = "";
        if (properties?.moveSpeed?.getValue()) {
          moveSpeed = `<div class="t-block">移动速度：${properties?.moveSpeed?.getValue()}公里/小时</div>`;
        }

        let forecastCountry = "";
        if (properties?.forecastCountry?.getValue()) {
          forecastCountry = `<div class="t-block">预报机构：${properties?.forecastCountry?.getValue()}</div>`;
        }

        let strong = "";
        if (properties?.strong?.getValue() && !forecastCountry) {
          strong = `<div class="t-block">强度级别：${properties?.strong?.getValue()}</div>`;
        }

        let typhoonRanges = "";
        const typhoonRangesData = properties?.typhoonRanges?.getValue();
        if (typhoonRangesData?.length > 0) {
          let typhoonRangesDiv = "";
          const windForce = `<div class="t-block">风圈风力：${typhoonRangesData[0]?.windForce}级</div>`;
          for (const item of typhoonRangesData) {
            typhoonRangesDiv += `${item.directionDescribe}(${item.scope}) `;
          }
          typhoonRanges = `<div class="t-block">风圈半径(KM)：${typhoonRangesDiv}</div>${windForce}`;
        }

        infobox.innerHTML =
          name +
          forecastCountry +
          time +
          center +
          airSpeed +
          strong +
          airPressure +
          moveDirection +
          moveSpeed +
          typhoonRanges;
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
  if (typhoonHandler) {
    typhoonHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
  activeIds = [];
  activeIdsArr = [];
};

const drawRange = item => {
  const ranges = item.typhoonRanges;
  const center = [item.longitude, item.latitude];
  const sortSeven = []; //7级风向排序数组
  const sortTen = [];
  const sortTwelve = [];
  for (let i = 0; i < ranges.length; i++) {
    if (ranges[i].windForce === 7) {
      sortRange(ranges[i].direction, ranges[i].scope, sortSeven);
    } else if (ranges[i].windForce === 10) {
      sortRange(ranges[i].direction, ranges[i].scope, sortTen);
    } else if (ranges[i].windForce === 12) {
      sortRange(ranges[i].direction, ranges[i].scope, sortTwelve);
    }
  }

  if (sortSeven.length !== 0) {
    fillWindRing(center, sortSeven, 7);
  }
  if (sortTen.length !== 0) {
    fillWindRing(center, sortTen, 10);
  }
  if (sortTwelve.length !== 0) {
    fillWindRing(center, sortTwelve, 12);
  }

  function fillWindRing(center, sort, rangNum) {
    let points = []; //风圈弧线点数组
    for (let i = 0; i < 4; i++) {
      points = getPoints(center, sort[i], i * 90, points);
    }
    window.viewer.entities.add({
      id: `rang${rangNum}-${item.typhoonTrackId}`,
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(points),
        material: Cesium.Color.YELLOW.withAlpha(0.4),
        outline: true,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 10,
        height: 0,
        extrudedHeight: 1
      }
    });
  }

  function sortRange(direction, range, sort) {
    if (direction == "NE") {
      sort[0] = range;
    } else if (direction == "SE") {
      sort[1] = range;
    } else if (direction == "SW") {
      sort[2] = range;
    } else if (direction == "NW") {
      sort[3] = range;
    }
  }

  function getPoints(center, radius, startAngle, points) {
    const pointNum = 90;
    const endAngle = startAngle + 90;
    let sin;
    let cos;
    let x;
    let y;
    let angle;

    for (let i = 0; i <= pointNum; i++) {
      angle = startAngle + ((endAngle - startAngle) * i) / pointNum;
      sin = Math.sin((angle * Math.PI) / 180);
      cos = Math.cos((angle * Math.PI) / 180);
      x = center[0] + (radius / 100) * sin;
      y = center[1] + (radius / 100) * cos;
      points.push(Cesium.Cartesian3.fromDegrees(x, y));
    }
    if (startAngle == 270) {
      points[points.length] = points[0]; //首尾连接
    }
    return points;
  }
};
