<template>
  <div class="flex flex-col items-center">
    <div class="mt-20">
      <el-image
        style="width: 1200px; height: 200px"
        src="src/assets/images/news/results.png"
      />
      <el-container style="width: 1200px; height: 150px">
        <el-text>
          基于生态环境的李生映射，通过接入水环境，土壤环境，气候环境等监测数据气候环境等监测数据气候环境等监测数据气候环境等监测数据气候环境等监测数据，土壤环境，气候环境等监测数据气候环境，土壤环境，
          气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，
          气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，
          土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气候环境，土壤环境，气候环境等监测数据气
        </el-text>
      </el-container>
      <el-image style="width: 1200px; height: 680px" :src="url" :fit="fit" />
      <el-container class="justify-center">
        <el-text> 图片说明 </el-text>
      </el-container>

      <el-image style="width: 1200px; height: 680px" :src="url" :fit="fit" />
      <el-container class="justify-center">
        <el-text> 视频说明 </el-text>
      </el-container>

      <el-image style="width: 1200px; height: 680px" :src="url" :fit="fit" />
      <el-container class="justify-center">
        <el-text> 视频说明 </el-text>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Display"
});
const url =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
</script>
