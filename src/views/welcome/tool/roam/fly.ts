let onTickCallback;
export const fly = flyData => {
  const flyArr = [];

  for (const item of flyData) {
    const e = {
      position: item,
      point: {
        color: Cesium.Color.FUCHSIA,
        pixelSize: 6
      }
    };
    const vertexEntity = window.viewer.entities.add(e);
    flyArr.push({
      vertexEntity: vertexEntity,
      position: item
    });
  }

  const startTime = Cesium.JulianDate.fromDate(new Date());
  const speed = 100; //无速度值时的 默认速度100  公里/小时  km/
  let allTimes = 0; //总时长,秒
  // var alllen = 0; //总长度,公里

  let lastPoint;
  for (let i = 0; i < flyArr.length; i++) {
    const item = flyArr[i].position;
    if (i == 0) {
      //起点
      item.time = startTime;
      item.stepTime = 0;
      lastPoint = item;
    } else {
      const len = Cesium.Cartesian3.distance(item, lastPoint) / 1000; //公里
      const stepTime = (len / speed) * 3600; //秒
      allTimes += stepTime;
      // alllen += len;
      const sTime = Cesium.JulianDate.addSeconds(
        startTime,
        allTimes,
        new Cesium.JulianDate()
      );
      item.time = sTime;
      item.stepTime = stepTime; //与上一节点之间的用时
    }
  }

  const stop = Cesium.JulianDate.addSeconds(
    startTime,
    allTimes,
    new Cesium.JulianDate()
  ); //飞行结束时间
  window.viewer.clock.startTime = startTime.clone();
  window.viewer.clock.stopTime = stop.clone();
  window.viewer.clock.currentTime = startTime.clone();
  window.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
  window.viewer.clock.multiplier = 1;
  window.viewer.clock.shouldAnimate = true;

  const position = new Cesium.SampledPositionProperty();
  for (let i = 0; i < flyArr.length; i++) {
    const item = flyArr[i].position;
    position.addSample(item.time, item);
  }
  window.viewer.scene.globe.depthTestAgainstTerrain = false; //关闭深度检测

  const orientation = new Cesium.VelocityOrientationProperty(position);
  onTickCallback = function () {
    if (window.viewer.clock.shouldAnimate === true) {
      const ori = orientation.getValue(window.viewer.clock.currentTime); //获取偏向角
      const center = position.getValue(window.viewer.clock.currentTime); //获取位置
      const transform = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromQuaternion(ori),
        center
      ); //将偏向角转为3*3矩阵，利用实时点位转为4*4矩阵
      window.viewer.camera.lookAtTransform(
        transform,
        new Cesium.Cartesian3(-100, 0, 50)
      ); //将相机向后面放一点
    }
  };

  window.viewer.clock.onTick.addEventListener(onTickCallback);
};

export const clearFlyData = () => {
  // 视角解锁
  window.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  // 删除视角追随
  if (onTickCallback != undefined) {
    window.viewer.clock.onTick.removeEventListener(onTickCallback);
    onTickCallback = undefined;
  }
};
