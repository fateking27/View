<template>
  <div class="flex flex-col items-center">
    <div
      class="bg-[url('/src/assets/images/news/introduce-bg.png')] bg-imge mb-8"
    >
      <div class="mt-10">
        <div class="mb-10 flex flex-row mt-10">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >REPAIRPROGRESS</text
            >
            <router-link to="/fix" style="position: absolute"
              >修复进度</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside width="450px" height="250px">
            <el-image :src="imgUrl" :fit="fit" />
          </el-aside>
          <el-main class="ml-10 no-padding">
            <div class="container mx-auto">
              <el-text v-for="(item, index) of dataList.data" :key="index">
                {{ item.content }}
              </el-text>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
    <router-link to="/display">
      <el-image
        style="width: 1200px; height: 200px; margin-top: 20px"
        src="src/assets/images/news/results.png"
      />
    </router-link>

    <div class="bg-[url('/src/assets/images/news/result-bg.png')] bg-imge mt-8">
      <div class="mt-10">
        <div class="mb-10 flex flex-row mt-10">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >CURRENTRESULTS</text
            >
            <router-link to="/" style="position: absolute"
              >当前成果</router-link
            >
          </div>
        </div>
        <el-container>
          <el-header>
            <el-container>
              <el-text> 红树林/盐生态现状： </el-text>
              <el-text>
                生态系统稳定、红树林植被、生物群落和环境要素等方面整体稳定，可自我维持
              </el-text>
            </el-container>

            <el-container>
              <el-text> 红树林/盐生态分级： </el-text>
              <el-text> I级 </el-text>
            </el-container>

            <el-container>
              <el-text> 红树林/盐沼减灾功能： </el-text>
              <el-text> 优 </el-text>
            </el-container>
          </el-header>
          <el-main>
            <el-container style="width: 1200px; height: 300px">
              <el-image :src="imgUrl" />
              <el-image :src="imgUrl" />
              <el-image :src="imgUrl" />
            </el-container>
          </el-main>
        </el-container>
      </div>
    </div>

    <div class="bg-[url('/src/assets/images/news/display.png')] bg-imge">
      <div class="my-10">
        <div class="mb-10 flex flex-row mt-10">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >STAGEPRESENTATION</text
            >
            <router-link to="/" style="position: absolute"
              >阶段展示</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside width="80px" class="mr-10 mt-10">
            <div v-for="(item, index) of stage" :key="index">
              <el-text class="stageFont">{{ item.title }}</el-text>
            </div>
          </el-aside>
          <el-main>
            <div class="block text-center" style="width: 750px; height: 500px">
              <el-carousel>
                <el-carousel-item v-for="(item, index) of urls" :key="index">
                  <el-image :src="item" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { listResults } from "@/api/new";

defineOptions({
  name: "Results"
});
const imgUrl =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

const urls = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg"
];

const stage = [{ title: "阶段一二" }, { title: "阶段二" }, { title: "阶段三" }];

const dataList = reactive({
  data: []
});

const loading = ref(true);

const form = reactive({
  releaseStatus: "1"
});

async function showNews() {
  loading.value = true;
  const { rows } = await listResults(form);
  dataList.data = rows;
  loading.value = false;
  console.log(dataList);
  // progress.value = classifyNews("修复进度");
}
// const progress = ref([]);

// const classifyNews = (newType) => {
//   return dataList.data.filter((news) => news.type=== newType);
// };

onMounted(async () => {
  await showNews();
});
</script>

<style scoped>
.container {
  width: 680px;
  height: 300px;
}

.bg-imge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.stageFont {
  font-size: 20px;
  line-height: 3;
}
</style>
