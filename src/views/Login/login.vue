<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'
import { User, MoreFilled } from '@element-plus/icons-vue'
import { login } from '@/api/index'
import { ElMessage } from 'element-plus'

const router = useRouter()
const storeUser = userStore()
const userName = ref('admin')
const userPwd = ref('Kd@curry555')
const userNameFocus = ref(false)
const userPwdFocus = ref(false)
const animateControl = ref(false)
onMounted(() => {
  animateControl.value = true
})
// 校验账号和密码
const validate = () => {
  const userNameReg = /^[\w-]{4,16}$/
  const userPwdReg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/

  if (userName.value.trim() === '' || userPwd.value.trim() === '') {
    ElMessage.error('账号或密码不能为空')
    return false
  } else if (!userNameReg.test(userName.value)) {
    ElMessage.error('用户名必须是4-16位字母、数字、下划线')
    return false
  } else if (!userPwdReg.test(userPwd.value)) {
    ElMessage.error('密码格式正确，应该是6-16位大小写字母、数字、下划线、符号，，如Kd@curry555')
    return false
  }
  return true
}

const loginHandler = () => {
  if (!validate()) return
  login({ userName: userName.value, userPwd: userPwd.value }).then((res) => {
    animateControl.value = false
    storeUser.setUserInfo(res)
    router.push('/welcome')
  })
}
</script>

<template>
  <div class="login-wrapper">
    <div class="bigCircle"></div>
    <div class="smallCircle"></div>
    <transition
      name="custom-classes"
      enter-active-class="animate__animated animate__zoomInLeft"
      leave-active-class="animate__animated animate__zoomOutLeft"
    >
      <div v-show="animateControl" class="loginImage">
        <img src="@/assets/image/login_logo.png" alt="" />
      </div>
    </transition>

    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__zoomInRight"
      leave-active-class="animate__animated animate__zoomOutRight"
    >
      <div v-show="animateControl" class="loginForm">
        <h1>欢迎来到 我的用户中心~</h1>
        <div class="form">
          <div class="userName">
            <el-form-item prop="pass">
              <span class="label" :class="{ actived: userName || userNameFocus }"
                >请输入您的账号</span
              >
              <el-input
                v-model="userName"
                type="text"
                autocomplete="off"
                :prefix-icon="User"
                @focus="userNameFocus = true"
                @blur="userNameFocus = false"
              />
            </el-form-item>
          </div>
          <div class="userPwd">
            <el-form-item prop="pass">
              <span class="label" :class="{ actived: userPwd || userPwdFocus }"
                >请输入您的密码</span
              >
              <el-input
                show-password
                v-model="userPwd"
                type="password"
                autocomplete="off"
                :prefix-icon="MoreFilled"
                @focus="userPwdFocus = true"
                @blur="userPwdFocus = false"
              />
            </el-form-item>
          </div>
          <div class="buttonGroup">
            <el-button round @click="loginHandler">登录</el-button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.login-wrapper {
  width: 100%;
  height: 100%;
  background-color: #15191f;
  position: relative;
  user-select: none;

  .bigCircle {
    position: absolute;
    top: 120px;
    left: 1600px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #25282e;
  }
  .smallCircle {
    position: absolute;
    top: 800px;
    left: 140px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #25282e;
  }
  .loginImage {
    width: 740px;
    position: absolute;
    top: 120px;
    left: 0;
    img {
      width: 100%;
    }
  }
  .loginForm {
    position: absolute;
    top: 150px;
    left: 1000px;
    width: 570px;
    height: 560px;
    padding: 10px;
    box-shadow: 0 0 10px #8a8a8b;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    h1 {
      position: absolute;
      top: 30px;
      left: 10px;
      left: calc(50% - 175px);
      color: #fff;
      font-weight: 500;
    }
    .form {
      width: 80%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .userName,
      .userPwd {
        width: 75%;
        height: 60px;
        color: #fff;
        margin-top: 30px;
        :deep(.el-form-item) {
          width: 100%;
          display: flex;
          text-align: left;

          span.label {
            position: absolute;
            font-size: 12px;
            color: #8a8a8b;
            z-index: 10;
            text-indent: 30px;
            transform: translateY(0px);
            transition: all 0.2s ease-in-out;
            cursor: text;
            &:focus-within {
              font-size: 14px;
              transform: translateY(-35px);
            }
          }

          span.actived {
            text-indent: 10px;
            font-size: 14px;
            transform: translateY(-35px);
          }
          .el-form-item__content {
            width: 100%;
            .el-input__wrapper {
              height: 40px;
            }
          }
        }
      }
      .buttonGroup {
        width: 100%;
        margin-top: 40px;
        :deep(.el-button) {
          width: 75%;
          height: 50px;
          font-size: 18px;
          font-weight: 600;
          color: #15191f;
          letter-spacing: 10px;
          text-align: center;
          background-color: #fed504;
        }
      }
    }
  }
}
</style>
