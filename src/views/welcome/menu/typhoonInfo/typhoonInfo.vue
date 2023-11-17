<template>
  <div class="typhoonInfo-bg">
    <el-drawer
      v-model="showDrawer"
      title="台风监测"
      :before-close="handleDrawerClose"
      size="450"
      modal-class="menu-drawer typhoonInfo"
    >
      <el-date-picker
        v-model="form.year"
        type="year"
        placeholder="请选择台风年份"
        value-format="YYYY"
        :clearable="false"
        class="!w-full"
        @change="onSearch"
        :disabled-date="disabledDate"
      />

      <div class="flex-bc mt-2">
        <el-input
          type="text"
          v-model="form.typhoonNameCn"
          placeholder="请输入台风名称"
          class="!w-[83%]"
          clearable
          @keyup.enter="onSearch"
          @clear="onSearch"
        />
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </div>

      <pure-table
        ref="typhoonInfoRef"
        row-key="typhoonInfoId"
        border
        align-whole="center"
        showOverflowTooltip
        table-layout="auto"
        :loading="loading"
        :data="dataList"
        :columns="columns"
        :pagination="pagination"
        header-cell-class-name="typhoonInfo-header"
        :header-cell-style="{
          background: 'var(--el-table-row-hover-bg-color)',
          color: 'var(--el-text-color-primary)'
        }"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        class="mt-5"
      >
        <template #operation="{ row }">
          <el-button
            class="reset-margin"
            link
            type="primary"
            @click="handleDetail(row)"
          >
            详情
          </el-button>
        </template>
      </pure-table>
      <el-button type="primary" class="design-btn" @click="showDesign"
        >专题制图</el-button
      >
    </el-drawer>
  </div>
  <Detail ref="detailRef" />
  <Design ref="designRef" />
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { message } from "@/utils/message";
import { getTyphoonInfo } from "@/api/home";
import { PaginationProps } from "@pureadmin/table";
import { isNumber } from "@pureadmin/utils";
import dayjs from "dayjs";
import Detail from "./detail.vue";
import Design from "./design.vue";
import {
  createTyphoonHandler,
  drawTyphoon,
  removeDraw,
  setTyphoonLegend
} from "@/views/welcome/menu/typhoonInfo/draw";

const typhoonInfoRef = ref(null);
const showDrawer = ref(false);
const dataList = ref([]);
const loading = ref(true);

const pagination = reactive<PaginationProps>({
  total: 0,
  pageSize: 14,
  currentPage: 1,
  background: true,
  small: true,
  layout: "total,prev,pager,next"
});

const form = reactive({
  year: dayjs().format("YYYY"),
  typhoonNameCn: "",
  pageNum: pagination.currentPage,
  pageSize: pagination.pageSize
});

const disabledDate = time => {
  return time.getTime() > Date.now();
};

const handleDrawerClose = () => {
  showDrawer.value = false;
  detailRef.value.showDrawer = false;
};

const columns: TableColumnList = [
  {
    type: "selection",
    align: "left",
    width: 50,
    reserveSelection: true
  },
  // {
  //   label: "名称",
  //   prop: "typhoonName"
  // },
  {
    label: "中文名",
    prop: "typhoonNameCn"
  },
  {
    label: "开始时间",
    prop: "beginTime",
    formatter: ({ beginTime }) => {
      return `${dayjs(beginTime).format("MM-DD HH")}点`;
    }
  },
  {
    label: "结束时间",
    prop: "endTime",
    formatter: ({ endTime }) => {
      return endTime ? `${dayjs(endTime).format("MM-DD HH")}点` : "";
    }
  },
  {
    label: "操作",
    fixed: "right",
    slot: "operation",
    width: 60
  }
];

const getList = async () => {
  loading.value = true;
  const res = await getTyphoonInfo(form);
  dataList.value = res.data.records;
  pagination.total = res.data.total;
  loading.value = false;
};

const detailRef = ref(null);
const handleDetail = row => {
  detailRef.value.setData(row);
  detailRef.value.showDrawer = true;
};

const handleSizeChange = (val: number) => {
  // console.log(`${val} items per page`);
  if (isNumber(val)) {
    pagination.pageSize = val;
    form.pageSize = pagination.pageSize;
    getList();
  }
};
const handleCurrentChange = (val: number) => {
  // console.log(val);
  // console.log(`current page: ${val}`);
  if (isNumber(val)) {
    pagination.currentPage = val;
    form.pageNum = pagination.currentPage;
    getList();
  }
};

const handleSelectionChange = val => {
  drawTyphoon(val);
};

const clear = () => {
  if (typhoonInfoRef.value) {
    typhoonInfoRef.value.getTableRef().clearSelection();
  }
  removeDraw();
  handleDrawerClose();
};

const onSearch = () => {
  if (form.year) {
    if (typhoonInfoRef.value) {
      typhoonInfoRef.value.getTableRef().clearSelection();
    }
    handleCurrentChange(1);
  } else {
    return message("请选择台风年份", {
      type: "warning"
    });
  }
};

const designRef = ref(null);
const showDesign = () => {
  designRef.value.showDialog = true;
  designRef.value.setData();
};

const setData = () => {
  setTyphoonLegend();
  getList();
  createTyphoonHandler();
};

defineExpose({ showDrawer, setData, clear });
</script>

<style scoped lang="scss">
.design-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>
