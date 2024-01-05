<template>
  <div class="flex flex-col items-center">
    <!-- <div class="mt-20"> -->
    <el-container>
      <el-header class="flex justify-start items-center">
        <el-text>当前位置：</el-text>
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/service' }"
            >对外服务</el-breadcrumb-item
          >
          <el-breadcrumb-item>地图服务</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <table class="mb-10" style="text-align: center">
          <thead>
            <tr>
              <th class="border">缩略图</th>
              <th class="border">图层名称</th>
              <th class="border">服务地址</th>
              <th class="border">投影类型</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataList.data" :key="item.id">
              <td class="border">
                <el-image style="width: 100px; height: 100px" :src="item.url" />
              </td>
              <td class="border">
                {{ item.title }}
              </td>
              <td class="border">
                <el-link
                  :href="item.content"
                  target="_blank"
                  @click="onClick(item.id)"
                  >{{ item.content }}</el-link
                >
              </td>
              <td class="border">{{ item.type }}</td>
            </tr>
          </tbody>
        </table>
      </el-main>
    </el-container>
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { mapServiceList, mapDitail } from "@/api/service";
defineOptions({
  name: "mapService"
});
const dataList = reactive({
  data: []
});

const onClick = async id => {
  await mapDitail(id);
};

const showMapService = async () => {
  const res = await mapServiceList();
  dataList.data = res.rows;
};

onMounted(() => {
  showMapService();
});
</script>

<style scoped>
table {
  width: 100%;
  min-width: 1000px; /* 设置最小宽度 */
  border-collapse: collapse;
}

th,
td {
  min-height: 500px; /* 设置最小高度 */
  padding: 8px;
  border: 1px solid;
}

thead {
  color: white;
  background-color: #1064b2;
}
</style>
