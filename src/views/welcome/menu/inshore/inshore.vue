<template>
  <el-drawer
    v-model="detail.show"
    :title="detail.title"
    :before-close="detailClose"
    size="450"
    modal-class="menu-drawer"
  >
    <PureDescriptions
      align="left"
      :column="1"
      border
      :data="[item]"
      :columns="detailColumns"
      v-for="(item, index) of detail.data"
      :key="index"
      class="mb-2"
    />
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import {
  getInshoreLandParcelInfo,
  getInshoreSstForecastById
} from "@/api/home";
import { ElLoading } from "element-plus";
import { setEntity } from "@/views/welcome/menu/components/setEntity";
import { message } from "@/utils/message";

let dataSourceEntities;
let mouseHandler; //鼠标事件
const detail = reactive({
  show: false,
  title: "",
  data: []
});

const detailClose = () => {
  detail.show = false;
};

let loading;
const getData = () => {
  setHandler();
  loading = ElLoading.service({
    lock: true,
    text: "加载中",
    background: "rgba(0, 0, 0, 0.7)"
  });
  getInshoreLandParcelInfo()
    .then(res => {
      // 区域接口回调
      const resData = JSON.parse(res.data);
      if (resData?.crs) {
        delete resData.crs;
      }
      setEntity(resData, "inshore", res => {
        dataSourceEntities = res.entities.values;
        loading.close();
      });
    })
    .catch(() => {
      loading.close();
    });
};

const setHandler = () => {
  if (!mouseHandler) {
    mouseHandler = new Cesium.ScreenSpaceEventHandler(
      window.viewer.scene.canvas
    );
    mouseHandler.setInputAction(movement => {
      const pickedObject = window.viewer.scene.pick(movement.position);
      if (pickedObject?.id) {
        showAreaDetail(pickedObject.id);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    mouseHandler.setInputAction(movement => {
      const pickedObject = window.viewer.scene.pick(movement.endPosition);
      if (pickedObject?.id) {
        dataSourceEntities.forEach(entity => {
          if (entity.polygon.material.getValue().color.alpha > 0.65) {
            entity.label.show = true;
          } else {
            entity.label.show = entity === pickedObject.id;
          }
        });
      } else {
        if (dataSourceEntities) {
          dataSourceEntities.forEach(entity => {
            entity.label.show =
              entity.polygon.material.getValue().color.alpha > 0.65;
          });
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
};

const clear = () => {
  if (mouseHandler) {
    mouseHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    mouseHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    mouseHandler = null;
  }
  detailClose();
};

// 区域详情
const showAreaDetail = entityIn => {
  dataSourceEntities.forEach(entity => {
    entity.label.show = entity === entityIn;
    if (entity === entityIn) {
      entity.polygon.material =
        // 透明度用于判断鼠标事件，谨改
        Cesium.Color.fromCssColorString("#FFB526").withAlpha(0.66);
    } else {
      if (entity.properties?.tempColor) {
        entity.polygon.material = Cesium.Color.fromCssColorString(
          entity.properties?.tempColor
        ).withAlpha(0.65);
      } else {
        entity.polygon.material =
          Cesium.Color.fromCssColorString("#3A78FF").withAlpha(0.65);
      }
    }
  });
  getDetail(entityIn);
};

// 区域详情接口
const getDetail = async entity => {
  if (entity) {
    detailClose();
    let res;
    let errMsg;
    if (entity?.properties?.code.getValue()) {
      res = await getInshoreSstForecastById({
        inshoreSstLandParcelId: entity?.properties?.code.getValue()
      });
      if (entity?.properties?.city) {
        detail.title = `${entity?.properties?.city.getValue()}近岸海域预报信息`;
      } else {
        detail.title = "";
      }
      errMsg = `暂无${entity?.properties?.city.getValue()}近岸海域预报信息`;
    }

    if (res?.data?.length === 0) {
      return message(errMsg, {
        type: "warning"
      });
    } else {
      detail.data = res.data;
      detail.show = true;
    }
  }
};

const detailColumns = [
  {
    label: "范围",
    prop: "aging",
    labelClassName: "menu-descriptions-label",
    cellRenderer: ({ value }) => {
      return `${value}小时预报`;
    }
  },
  {
    label: "浪高",
    labelClassName: "menu-descriptions-label",
    cellRenderer: row => {
      const data = row.props.data[0];
      return `${data.minWaveHeight}-${data.maxWaveHeight}米`;
    }
  },
  {
    label: "海温",
    labelClassName: "menu-descriptions-label",
    cellRenderer: row => {
      const data = row.props.data[0];
      return `${data.minSeaTemp}-${data.maxSeaTemp}°C`;
    }
  },
  {
    label: "低潮",
    labelClassName: "menu-descriptions-label",
    cellRenderer: row => {
      const data = row.props.data[0];
      return `${data.minTideHeight}cm/${data.minTideHeightDate}`;
    }
  },
  {
    label: "高潮",
    labelClassName: "menu-descriptions-label",
    cellRenderer: row => {
      const data = row.props.data[0];
      return `${data.maxTideHeight}cm/${data.maxTideHeightDate}`;
    }
  },
  {
    label: "更新时间",
    prop: "updateDate",
    labelClassName: "menu-descriptions-label"
  }
];

defineExpose({ getData, clear });
</script>
