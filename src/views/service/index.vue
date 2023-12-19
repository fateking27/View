<template>
  <div class="flex flex-col items-center">
    <div class="mt-20">
      <div class="mb-10 flex flex-row mt-20">
        <el-image src="/src/assets/images/title/arrow-left.png" />
        <div class="text-3xl ml-2" style="position: relative; width: 90%">
          <text class="ml-10 mt-4 big-title" style="position: absolute"
            >MAPSERVICES</text
          >
          <router-link to="/" style="position: absolute">地图服务</router-link>
        </div>
      </div>

      <el-container>
        <table class="mb-10">
          <thead>
            <tr>
              <th class="border">缩略图</th>
              <th class="border">图层名称</th>
              <th class="border">服务地址</th>
              <th class="border">投影类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border">Indiana</td>
              <td class="border">Indianapolis</td>
              <td class="border">Indiana</td>
              <td class="border">Indianapolis</td>
            </tr>
          </tbody>
        </table>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Service"
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
