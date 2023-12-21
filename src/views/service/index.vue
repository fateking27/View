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
              <td class="border">
                <!-- Indiana -->
                <el-image
                  style="width: 100px; height: 100px"
                  src="http://localhost/maps/13Image/13/6675/3577/tile.png"
                />
              </td>
              <td class="border">
                <!-- Indianapolis -->
                影像底图
              </td>
              <td class="border">
                <!-- Indiana -->
                <el-link
                  href="http://192.168.1.109/TDT_map.html"
                  target="_blank"
                  >http://192.168.1.109/TDT_map.html</el-link
                >
              </td>
              <td class="border">经纬度投影</td>
            </tr>
            <tr>
              <td class="border">
                <el-image
                  style="width: 100px; height: 100px"
                  src="http://localhost/maps/13Image/13/6675/3577/tile.png"
                />
              </td>
              <td class="border">影像底图</td>
              <td class="border">
                <!-- Indiana -->

                <el-link
                  href="https://map.tianditu.gov.cn/2020/"
                  target="_blank"
                  >https://map.tianditu.gov.cn/2020/</el-link
                >
              </td>
              <td class="border">
                <!-- Indianapolis -->
                经纬度投影
              </td>
            </tr>
            <tr>
              <td class="border">
                <el-image
                  style="width: 100px; height: 100px"
                  src="http://localhost/maps/13Image/13/6675/3577/tile.png"
                />
              </td>
              <td class="border">三维地形图</td>
              <td class="border">
                <!-- Indiana -->

                <el-link
                  href="http://192.168.1.109/Cesium_map.html"
                  target="_blank"
                  >http://192.168.1.109/Cesium_map.html</el-link
                >
              </td>
              <td class="border">
                <!-- Indianapolis -->
                球面墨卡托投影
              </td>
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
