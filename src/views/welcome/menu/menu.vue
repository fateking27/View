<template>
  <div class="menu-bg" :class="{ show: showChild }">
    <div class="m-title">
      <div class="t-line" />
      <div class="t-name">
        <IconifyIconOffline icon="caretRight" class="text-[#29F1FA] mr-3" />
        自然灾害风险评估区划
        <div class="close-icon" />
      </div>
    </div>

    <el-menu :unique-opened="true" @select="selectIndex">
      <template v-for="item of menuData" :key="item.index">
        <el-sub-menu :index="item.index" v-if="item.children">
          <template #title>
            <i class="iconfont mr-2" :class="item.icon" />
            {{ item.name }}
          </template>
          <el-menu-item
            v-for="i of item.children"
            :key="i.index"
            :index="i.index"
          >
            <div class="w-full flex-bc">
              <div class="flex-s">
                <div class="mr-2 flex-ac" v-show="i.showData">
                  <el-checkbox
                    v-model="i.checked"
                    @change="changBearing(i)"
                    :label="i.name"
                  />
                </div>
                <div v-show="!i.showData">{{ i.name }}</div>
              </div>
              <!--<div class="iconfont icon-fenxibaogao" v-if="i.showData" />-->
            </div>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item :index="item.index" v-if="!item.children">
          <i class="iconfont mr-2" :class="item.icon" />{{
            item.name
          }}</el-menu-item
        >
      </template>
    </el-menu>

    <BearingBody ref="bearingBodyRef" />
    <Fishery ref="fisheryRef" />
    <TyphoonInfo ref="typhoonInfoRef" />
    <WindNC ref="windNCRef" />
    <SeaArea ref="seaAreaRef" />
    <!--    <Inshore ref="inshoreRef" />-->
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useCesiumStoreHook } from "@/store/modules/cesium";
import BearingBody from "./bearingBody/index.vue";
import Fishery from "./fishery/fishery.vue";
import TyphoonInfo from "./typhoonInfo/typhoonInfo.vue";
import WindNC from "./windNC/windNC.vue";
import SeaArea from "./seaArea/seaArea.vue";
// import Inshore from "./inshore/inshore.vue";
import { useLegendStoreHook } from "@/store/modules/legend";

defineProps({
  showChild: {
    require: false,
    type: Boolean
  }
});

const bearingBodyRef = ref(null);
const fisheryRef = ref(null);
const typhoonInfoRef = ref(null);
const windNCRef = ref(null);
const seaAreaRef = ref(null);
// const inshoreRef = ref(null);

let bearingBodyActiveArr = []; //已选中承灾体

const selectIndex = (key, keyPath) => {
  detail.index = key;
  detail.parentIndex = keyPath[0];
  reset();
  if (detail.index === "typhoonInfo") {
    typhoonInfoRef.value.showDrawer = true;
    typhoonInfoRef.value.setData();
  } else if (detail.parentIndex === "windNC") {
    windNCRef.value.showDrawer = true;
    windNCRef.value.setData(detail.index);
  }
  if (
    detail.parentIndex !== "bearingBody" ||
    bearingBodyActiveArr.length === 0
  ) {
    useCesiumStoreHook().clear();
  } else {
    if (window.viewer.entities) {
      window.viewer.entities.removeAll();
    }
  }
  if (detail.index === "fishery") {
    fisheryRef.value.getData();
  }
  if (detail.index === "seaArea") {
    seaAreaRef.value.getData();
  }
  // if (detail.index === "inshore") {
  //   inshoreRef.value.getData();
  // }
};

// 重置参数事件
const reset = () => {
  useLegendStoreHook().clear();
  bearingBodyRef.value.clear();
  fisheryRef.value.clear();
  typhoonInfoRef.value.clear();
  windNCRef.value.clear();
  seaAreaRef.value.clear();
  // inshoreRef.value.clear();
  if (detail.parentIndex !== "bearingBody") {
    for (const item of menuData.value) {
      if (item.children) {
        for (const i of item.children as any) {
          i.checked = false;
        }
      }
    }
    bearingBodyActiveArr = [];
  }
};

const changBearing = i => {
  if (i.checked && bearingBodyActiveArr.indexOf(i.index) === -1) {
    bearingBodyActiveArr.push(i.index);
  } else {
    const index = bearingBodyActiveArr.indexOf(i.index);
    bearingBodyActiveArr.splice(index, 1);
  }
  for (const item of bearingBodyActiveArr) {
    bearingBodyRef.value.getData(item, bearingBodyActiveArr);
  }
};

const detail = reactive({
  index: "",
  parentIndex: ""
});

// 菜单配置
const menuData = ref([
  {
    index: "bearingBody",
    name: "自然灾害承灾体",
    icon: "icon-chengzaiti",
    children: [
      {
        name: "学校",
        index: "school",
        showData: true
      },
      {
        name: "星级饭店",
        index: "starHotel",
        showData: true
      },
      {
        name: "医疗卫生机构",
        index: "hospital",
        showData: true
      },
      {
        name: "体育场馆",
        index: "gymnasium",
        showData: true
      },
      {
        name: "大型超市",
        index: "largeComTradingPlace",
        showData: true
      },
      {
        name: "旅游景区",
        index: "touristAttraction",
        showData: true
      },
      {
        name: "公共文化场所",
        index: "publicCulturalPlace",
        showData: true
      },
      {
        name: "宗教活动场所",
        index: "religionPlace",
        showData: true
      },
      {
        name: "救助服务机构",
        index: "salvageServiceAgency",
        showData: true
      }
    ]
  },
  {
    index: "fishery",
    name: "养殖用海",
    icon: "icon-yangzhiyonghai"
  },
  {
    index: "typhoonInfo",
    name: "台风监测",
    icon: "icon-taifengjiance"
  },
  {
    index: "windNC",
    name: "海洋场",
    icon: "icon-a-feng1",
    children: [
      {
        name: "风场",
        index: "wind"
      },
      {
        name: "洋流",
        index: "oceanCurrent"
      },
      {
        name: "波浪",
        index: "wave"
      }
    ]
  },
  {
    index: "seaArea",
    name: "温度场",
    icon: "icon-a-wenduji1"
  }
  // {
  //   index: "inshore",
  //   name: "近岸预报",
  //   icon: "icon-a-wenduji1"
  // }
  // {
  //   index: "temperatureField",
  //   name: "温度场",
  //   icon: "icon-a-wenduji1",
  //   children: [
  //     {
  //       name: "海区预报",
  //       index: "seaArea"
  //     },
  //     {
  //       name: "近岸预报",
  //       index: "inshore"
  //     }
  //   ]
  // }
]);
</script>
<style lang="scss" scoped>
.menu-bg {
  position: fixed;
  top: 60px;
  left: -300px;
  z-index: 9;
  width: 300px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  background: linear-gradient(
    180deg,
    rgb(13 54 110 / 65%) 0%,
    rgb(13 54 110 / 95%) 100%
  );
  transition: all ease 0.8s;

  &.show {
    left: 10px;
  }

  .m-title {
    display: flex;
    margin-bottom: 10px;

    .t-line {
      margin-right: 3px;
      border-right: 4px solid #1b7ef2;
    }

    .t-name {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 34px;
      font-size: 15px;
      font-weight: bold;
      color: rgb(255 255 255 / 87%);
      letter-spacing: 1px;
      background: linear-gradient(90deg, #004c9a 0%, rgb(0 76 154 / 0%) 100%);

      .close-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 28px;
        height: 14px;
        background: url("@/assets/images/menu-close-icon.png") no-repeat;
      }
    }
  }

  :deep(.el-menu) {
    padding: 0 0 0 15px;
    border-right: none;
  }

  :deep(.el-sub-menu__title:hover),
  :deep(.el-menu-item:hover) {
    background: rgb(8 129 252 / 50%);
  }

  :deep(.el-checkbox__inner) {
    border: 1px solid #fff;
  }
}
</style>
