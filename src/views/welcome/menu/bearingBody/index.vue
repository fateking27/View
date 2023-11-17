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
  <Search ref="searchRef" @searchDetail="getDetail" />
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { getBearingBody } from "@/api/home";
import { setPoint } from "./setPoint";
import Search from "@/views/welcome/menu/components/search/search.vue";

let mouseHandler; //鼠标事件
const detail = reactive({
  show: false,
  title: "",
  data: []
});
const searchRef = ref(null);

const detailClose = () => {
  detail.show = false;
};

const getData = async (index, bearingBodyActiveArr) => {
  setHandler();
  const res = await getBearingBody(index);
  // 点接口回调
  const records = res.data.records;
  if (records?.length > 0) {
    setPoint(records, index, bearingBodyActiveArr, () => {
      searchRef.value.setData("bearingBody");
      searchRef.value.showBlock = true;
    });
  }
};

const setHandler = () => {
  if (!mouseHandler) {
    mouseHandler = new Cesium.ScreenSpaceEventHandler(
      window.viewer.scene.canvas
    );
    mouseHandler.setInputAction(movement => {
      const pickedObject = window.viewer.scene.pick(movement.position);
      if (pickedObject?.id) {
        getDetail(pickedObject.id);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
};

const clear = () => {
  if (mouseHandler) {
    mouseHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    mouseHandler = null;
  }
  detailClose();
  searchRef.value.showBlock = false;
};

// 承灾体详情
const getDetail = entityIn => {
  const properties = entityIn.properties;
  detail.title = properties?.name?.getValue();
  detail.data = [
    {
      location: properties.location.getValue(),
      securityPersonCount: properties.securityPersonCount.getValue(),
      emergencyPower: properties.emergencyPower.getValue(),
      waterSupplyMode: properties.waterSupplyMode.getValue(),
      heatingSystem: properties.heatingSystem.getValue(),
      emergencyCommunicationMode:
        properties.emergencyCommunicationMode.getValue(),
      historyDisasterType: properties.historyDisasterType.getValue(),
      hasDisasterType: properties.hasDisasterType.getValue(),
      creator: properties.creator.getValue(),
      updater: properties.updater.getValue(),
      dataSource: properties.dataSource.getValue(),
      qualityCheckResult: properties.qualityCheckResult.getValue(),
      checkResult: properties.checkResult.getValue(),
      dataState: properties.dataState.getValue(),
      dataFlowLevel: properties.dataFlowLevel.getValue(),
      updateDate: properties.updateTime.getValue()
    }
  ];
  detail.show = true;

  const entities = window.viewer.entities.values;
  entities.forEach(entity => {
    entity.label.show = entity === entityIn;
  });
};

const detailColumns = [
  {
    label: "地址",
    labelClassName: "menu-descriptions-label-long",
    prop: "location"
  },
  {
    label: "安全保卫人员数量",
    labelClassName: "menu-descriptions-label-long",
    prop: "securityPersonCount"
  },
  {
    label: "应急供电能力",
    labelClassName: "menu-descriptions-label-long",
    prop: "emergencyPower"
  },
  {
    label: "供水方式",
    labelClassName: "menu-descriptions-label-long",
    prop: "waterSupplyMode"
  },
  {
    label: "供暖方式",
    labelClassName: "menu-descriptions-label-long",
    prop: "heatingSystem"
  },
  {
    label: "应急通信保障方式",
    labelClassName: "menu-descriptions-label-long",
    prop: "emergencyCommunicationMode"
  },
  {
    label: "曾经遭受过的自然灾害类型",
    labelClassName: "menu-descriptions-label-long",
    prop: "historyDisasterType"
  },
  {
    label: "已有自然灾害应急预案类型",
    labelClassName: "menu-descriptions-label-long",
    prop: "hasDisasterType"
  },
  {
    label: "数据来源",
    labelClassName: "menu-descriptions-label-long",
    prop: "dataSource"
  },
  {
    label: "质检结果",
    labelClassName: "menu-descriptions-label-long",
    prop: "qualityCheckResult"
  },
  {
    label: "核查结果",
    labelClassName: "menu-descriptions-label-long",
    prop: "checkResult"
  },
  {
    label: "数据状态",
    labelClassName: "menu-descriptions-label-long",
    prop: "dataState"
  },
  {
    label: "数据流转级别",
    labelClassName: "menu-descriptions-label-long",
    prop: "dataFlowLevel"
  },
  {
    label: "创建人",
    labelClassName: "menu-descriptions-label-long",
    prop: "creator"
  },
  {
    label: "更新人",
    labelClassName: "menu-descriptions-label-long",
    prop: "updater"
  },

  {
    label: "更新时间",
    prop: "updateDate",
    labelClassName: "menu-descriptions-label"
  }
];

defineExpose({ getData, clear });
</script>
