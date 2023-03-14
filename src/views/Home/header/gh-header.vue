<script setup lang="ts">
import router from '@/router'
import { userStore } from '@/stores/user'
import { Bell, Expand } from '@element-plus/icons-vue'
import breadCrumb from '../breadCrumb/breadCrumb.vue'

const storeUser = userStore()

const emits = defineEmits(['changeIsCollapse'])
const props = withDefaults(defineProps<{ isCollapse: boolean }>(), {})

const changeIsCollapse = () => {
  emits('changeIsCollapse', !props.isCollapse)
}

const handleLogout = (key: string) => {
  if (key === 'email') return
  // 清空用户信息,并退出登录
  storeUser.setUserInfo(null)
  router.push('/login')
}
</script>

<template>
  <el-header>
    <div class="header-left">
      <div class="menu-fold">
        <el-icon style="vertical-align: middle" @click="changeIsCollapse">
          <Fold v-show="!isCollapse" />
          <Expand v-show="isCollapse" />
        </el-icon>
      </div>
      <bread-crumb></bread-crumb>
    </div>
    <div class="user-info">
      <el-badge :is-dot="true" class="item">
        <el-icon size="18px" style="vertical-align: middle">
          <Bell />
        </el-icon>
      </el-badge>
      <el-dropdown trigger="hover" @command="handleLogout">
        <span class="user-link"> {{ storeUser.userInfo?.userName }} </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="email">
              邮箱: {{ storeUser.userInfo?.userEmail }}
            </el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style scoped lang="scss">
.el-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 2px #ccc inset;
  .header-left {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    .menu-fold {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      cursor: pointer;
    }
  }
  .user-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    :deep(.el-dropdown) {
      font-size: 18px;
      margin-left: 10px;
      .user-link {
        cursor: pointer;
        color: #409eff;
      }
      span:focus-visible {
        outline: none;
      }
    }
  }
}
</style>
