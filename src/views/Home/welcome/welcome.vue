<script setup lang="ts"></script>

<template>
  <div class="welcome"></div>
</template>

<style scoped lang="scss">
.welcome {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/image/welcome.jfif');

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 105px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      text-align: right;
      font-size: 14px;
      color: #ccc;
    }
  }
}
</style>
