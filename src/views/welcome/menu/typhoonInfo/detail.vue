<template>
  <div class="typhoonInfo-bg">
    <el-drawer
      v-model="showDrawer"
      :title="form.title"
      :before-close="handleDrawerClose"
      size="650"
      append-to-body
      modal-class="menu-drawer typhoonInfoDetail"
    >
      <pure-table
        border
        align-whole="center"
        showOverflowTooltip
        table-layout="auto"
        :loading="loading"
        :data="dataList"
        :columns="columns"
        :header-cell-style="{
          background: 'var(--el-table-row-hover-bg-color)',
          color: 'var(--el-text-color-primary)'
        }"
      />
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { getTyphoonInfoDetail } from "@/api/home";
import dayjs from "dayjs";

const showDrawer = ref(false);
const dataList = ref([]);
const loading = ref(true);

const form = reactive({
  title: "",
  typhoonInfoId: ""
});

const handleDrawerClose = () => {
  showDrawer.value = false;
};

const columns: TableColumnList = [
  {
    label: "时间",
    prop: "collectionTime",
    formatter: ({ collectionTime }) => {
      return `${dayjs(collectionTime).format("MM-DD HH")}点`;
    },
    width: 100
  },
  {
    label: "风速",
    prop: "airSpeed",
    formatter: ({ airSpeed }) => {
      return `${airSpeed}m/s`;
    },
    width: 70
  },
  {
    label: "气压",
    prop: "airSpeed",
    formatter: ({ airPressure }) => {
      return `${airPressure}百帕`;
    },
    width: 90
  },
  {
    label: "移向",
    prop: "moveDirection",
    width: 100
  },
  {
    label: "移向速度",
    prop: "moveSpeed",
    formatter: ({ moveSpeed }) => {
      return `${moveSpeed}km/h`;
    },
    width: 90
  },
  {
    label: "强度",
    prop: "strong"
  }
];

const getList = async () => {
  loading.value = true;
  const res = await getTyphoonInfoDetail(form);
  dataList.value = res.data.typhoonTracks;
  loading.value = false;
};

const setData = row => {
  form.title = `${row.typhoonName} ${row.typhoonNameCn}`;
  form.typhoonInfoId = row.typhoonInfoId;
  getList();
};

defineExpose({ showDrawer, setData });
</script>
