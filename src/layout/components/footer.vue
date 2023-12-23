<template>
  <div class="footer">
    <div class="flex flex-col justify-center">
      <div class="links text-center mt-5">
        <a href="#">关于本网</a>
        <span class="separator">|</span>
        <a href="#">联系我们</a>
        <span class="separator">|</span>
        <a href="#">网站声明</a>
        <span class="separator">|</span>
        <a href="#">网站纠错</a>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex justify-center p-2 mb-3 mt-4">
        <span class="mr-10 text-white">主办单位：xxxxxx</span>
        <span class="mr-10 text-white">版权所有：xxxxx</span>
        <span class="text-white">网站辨识码：xxxxxxx</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  width: 100%;
  background-image: url("/src/assets/images/news/footer.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.links a {
  color: #fff;
}

.links .separator {
  margin: 0 15px;
  color: #fff;
}
</style>
