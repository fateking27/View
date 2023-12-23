<template>
  <div class="flex flex-col items-center">
    <div class="bg-[url('/src/assets/images/news/introduce-bg.png')] bg-imge">
      <div class="mt-10">
        <div class="mb-10 flex flex-row mt-10">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >PROJECTSOURCE</text
            >
            <router-link to="/detail" style="position: absolute"
              >项目来源</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside width="450px">
            <el-image width="450px" height="250px" :src="url" :fit="fit" />
          </el-aside>
          <el-main class="ml-8">
            <div class="container mx-auto">
              <el-text v-for="(item, index) of source" :key="index">
                {{ item.content }}
              </el-text>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>

    <div class="bg-[url('/src/assets/images/news/means-bg.png')] bg-imge">
      <div class="mt-10">
        <div class="mb-10 flex flex-row mt-10">
          <el-image src="/src/assets/images/title/arrow-left.png" />
          <div class="text-3xl ml-2" style="position: relative; width: 90%">
            <text class="ml-10 mt-4 big-title" style="position: absolute"
              >CONSTRUCTIONSIGNIFICANCE</text
            >
            <router-link to="/meaning" style="position: absolute"
              >建设意义</router-link
            >
          </div>
        </div>
        <el-container>
          <el-aside width="450px">
            <el-image width="450px" height="250px" :src="url" :fit="fit" />
          </el-aside>
          <el-main class="ml-8 no-padding">
            <div class="container">
              <el-text v-for="(item, index) of meaning" :key="index">
                {{ item.content }}
              </el-text>
            </div>
          </el-main>
        </el-container>
      </div>

      <div class="my-10">
        <!--      <div class="text-3xl mb-10 mr-8 flex items-center justify-end">-->
        <!--        <router-link to="/">预期成果</router-link>-->
        <!--      </div>-->
        <div class="mb-10 flex flex-row justify-end mt-10">
          <div class="text-3xl ml-2" style="position: relative; width: 15%">
            <text class="-ml-80 mt-4 big-title" style="position: absolute"
              >EXPECTEDRESULTS</text
            >
            <router-link
              to="/expectation"
              class="ml-10"
              style="position: absolute"
              >预期成果</router-link
            >
          </div>
          <el-image src="/src/assets/images/title/arrow-right.png" />
        </div>
        <el-container>
          <el-main class="mr-8 mb-5 no-padding">
            <div class="container mx-auto">
              <el-text v-for="(item, index) of expectation" :key="index">
                {{ item.content }}
              </el-text>
            </div>
          </el-main>
          <el-aside width="450px">
            <el-image width="450px" height="250px" :src="url" :fit="fit" />
          </el-aside>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { listIntroduce } from "@/api/new";

defineOptions({
  name: "Introduce"
});
const url =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

const dataList = reactive({
  data: []
});

const loading = ref(true);

const form = reactive({
  releaseStatus: "1"
});

async function showNews() {
  loading.value = true;
  const { rows } = await listIntroduce(form);
  dataList.data = rows;
  loading.value = false;
  // console.log(dataList.data[0].type)
  meaning.value = classifyNews("建设意义");
  expectation.value = classifyNews("预期成果");
  source.value = classifyNews("项目来源");

  console.log(source);
}
const meaning = ref([]);
const expectation = ref([]);
const source = ref([]);
// const publishNews = (status) => {
//   return dataList.data.filter((news) => news.release_status === status);
// };

const classifyNews = newType => {
  return dataList.data.filter(news => news.type === newType);
};

onMounted(async () => {
  await showNews();
});
</script>

<style scoped>
.container {
  width: 600px;
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
</style>
