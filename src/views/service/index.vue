<template>
  <div class="flex flex-col items-center">
    <div class="mt-6">
      <div class="mb-10 flex flex-row mt-20">
        <el-image src="/src/assets/images/title/arrow-left.png" />

        <div class="text-3xl ml-2" style="position: relative; width: 90%">
          <text class="ml-10 mt-4 big-title" style="position: absolute"
            >MAPSERVICES</text
          >
          <router-link to="/mapService" style="position: absolute"
            >地图服务</router-link
          >
        </div>
      </div>

      <el-container>
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
            <tr v-for="item in dataList.data.slice(0, 2)" :key="item.id">
              <td class="border">
                <!-- Indiana -->
                <el-image
                  style="width: 100px; height: 100px"
                  :src="`${VITE_API_PATH}/static/` + item.url"
                />
              </td>
              <td class="border">
                <!-- Indianapolis -->
                {{ item.title }}
              </td>
              <td
                class="border"
                style="
                  max-width: 400px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                <!-- Indiana -->
                <el-link
                  :href="item.content"
                  target="_blank"
                  @click="onClick(item.id)"
                  >{{ item.content }}</el-link
                >
              </td>
              <td class="border">{{ item.type }}</td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="border"
                style="color: rgb(7 116 211); border: none"
              >
                <router-link to="/mapService">查看更多...</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { mapServiceList, mapDitail } from "@/api/service";
defineOptions({
  name: "Service"
});

const { VITE_API_PATH } = import.meta.env;

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

.newsTitle {
  padding-left: 5px;
  border-left: 5px solid #5587eb;
}

.big-title {
  font-size: 44px;
  color: #ecf2ff;
}
</style>
