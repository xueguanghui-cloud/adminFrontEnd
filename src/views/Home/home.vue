<!-- @format -->

<script setup lang="ts">
import { ref } from 'vue'
import ghHeader from './header/gh-header.vue'

const isCollapse = ref(false)
const changeIsCollapse = (value: boolean) => {
  isCollapse.value = value
}
</script>

<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-aside :width="isCollapse ? `64px` : `200px`">
          <!-- 系统logo -->
          <div class="logo">
            <img src="@/assets/iconfont.ico" alt="" />
            <span v-show="!isCollapse">Codexgh</span>
          </div>
          <!-- 导航菜单 -->
          <el-menu :collapse="isCollapse">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统管理</span>
              </template>
              <el-menu-item index="1-1">用户管理</el-menu-item>
              <el-menu-item index="1-2">菜单管理</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Position /></el-icon>
                <span>审批管理</span>
              </template>
              <el-menu-item index="2-1">休假申请</el-menu-item>
              <el-menu-item index="2-2">待我审批</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <div class="container">
          <gh-header :isCollapse="isCollapse" @changeIsCollapse="changeIsCollapse"></gh-header>

          <el-main><router-view></router-view></el-main>
        </div>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  .common-layout {
    width: 100%;
    height: 100%;
    .el-container {
      width: 100%;
      height: 100%;
      background-color: #f8f8f8;
      .el-aside {
        transition: all 0.5s;
        background-color: #fff;
        box-shadow: 0 0 2px #ccc inset;
        .logo {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          img {
            width: 40px;
            height: 40px;
          }
          span {
            padding-left: 10px;
            font-size: 18px;
            font-weight: 700;
          }
        }
        .el-menu {
          height: calc(100% - 60px);
          overflow-y: auto;
          border: none;
        }
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .el-main {
          width: 100%;
          height: 100%;
          padding: 30px;
        }
      }
    }
  }
}
</style>
