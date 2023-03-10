<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const breadList = computed(() => {
  return route.matched
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="bread in breadList" :key="bread.path">
      <router-link to="/welcome" v-if="bread.path === '/'">
        {{ bread.meta.title }}
      </router-link>
      <span v-else>{{ bread.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.el-breadcrumb {
  margin-left: 15px;
}
</style>
