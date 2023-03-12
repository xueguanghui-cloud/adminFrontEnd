<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getUserList, userDelete, getDeptList, getRoleList } from '@/api/index'
import { ElMessage, type FormInstance } from 'element-plus'

interface User {
  userId: number
  userName: string
  userEmail: string
  role: number
  state: number
  createTime: string
  lastLoginTime: string
}
const formRef = ref<FormInstance>()

// 选中员工id
const checkedUserIds = ref<number[]>([])
const columns = reactive([
  { label: '员工ID', prop: 'userId' },
  { label: '员工姓名', prop: 'userName' },
  { label: '员工邮箱', prop: 'userEmail' },
  {
    label: '员工角色',
    prop: 'role',
    formatter(row: User, column: any, value: number) {
      /* 0: 管理员, 1:普通员工 */
      return {
        0: '管理员',
        1: '普通员工'
      }[value]
    }
  },
  {
    label: '员工状态',
    prop: 'state',
    formatter(row: User, column: any, value: number) {
      /* 0: '在职' 1: '离职' 3: '试用期' */
      return {
        1: '在职',
        2: '离职',
        3: '试用期'
      }[value]
    }
  },
  { label: '创建时间', prop: 'createTime' },
  { label: '最后一次登录时间', prop: 'lastLoginTime' }
])
const user = reactive({
  userId: '',
  userName: '',
  state: 0
})
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const userList = ref<User[]>([])

// 获取员工列表数据
const getUerListData = () => {
  getUserList({ ...user, ...pager }).then((res) => {
    userList.value = res.list
    pager.total = res.page.total
  })
}
// 加载员工列表数据
getUerListData()

// 查询
const handleQuery = () => {
  getUerListData()
}

// 重置
const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  getUerListData()
}

// 批量删除
const handlePatchDelete = () => {
  if (checkedUserIds.value.length === 0) {
    return ElMessage.warning('请选择要删除的员工')
  }

  // 批量删除
  userDelete(checkedUserIds.value).then((res) => {
    console.log(res)
    if (res.nModified > 0) {
      ElMessage.success(`成功删除${res.nModified}条`)
      getUerListData()
    } else {
      ElMessage.success('删除失败')
    }
  })
}

// 员工选中操作
const handleSelectionChange = (val: User[]) => {
  // 首先将之前选中删除
  checkedUserIds.value.length = 0
  val.forEach((user) => {
    checkedUserIds.value.push(user.userId)
  })
}

// 编辑
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}

// 删除
const handleDelete = (row: User) => {
  userDelete([row.userId]).then((res) => {
    if (res.nModified > 0) {
      ElMessage.success(`成功删除${res.nModified}条`)
      getUerListData()
    } else {
      ElMessage.success('删除失败')
    }
  })
}

// 分页
const handleCurrentChange = (val: number) => {
  pager.pageNum = val
  getUerListData()
}

// 新增员工
interface IDept {
  children: IDept[]
  createTime: string

  deptName: string
  parentId: string[]
  updateTime: string
  userEmail: string
  userId: string
  userName: string
  __v: number
  _id: string
}
const dialogFormVisible = ref(false)
const roleList = ref<{ _id: string; roleName: string }[]>([])
const deptIdList = ref<IDept[]>([])
const userForm = ref({
  userName: '',
  userEmail: '',
  mobile: '',
  job: '',
  state: 1,
  roleList: [],
  deptId: []
})
const addUserForm = ref<FormInstance>()
// 定义新增员工表单校验规则
const rules = reactive({
  userName: [{ required: true, message: '请输入员工名称', trigger: 'blur' }],
  userEmail: [
    { required: true, message: '请输入员工邮箱', trigger: 'blur' },
    {
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: '请输入合法邮箱',
      trigger: 'blur'
    }
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
      message: '请输入合法手机号',
      trigger: 'blur'
    }
  ],
  deptId: [{ required: true, message: '请选择部门', trigger: 'blur' }]
})
// 获取角色列表
getRoleList().then((res) => {
  console.log(res)
  roleList.value = res
})
// 获取部门列表
getDeptList().then((res) => {
  console.log(res)
  deptIdList.value = res
})

// 打开新增员工dialog
const handleCreate = () => {
  dialogFormVisible.value = true
}

// 取消
const cancel = () => {
  addUserForm.value?.resetFields()
  dialogFormVisible.value = false
}

// 确认
const confirm = () => {
  addUserForm.value?.resetFields()
  dialogFormVisible.value = false
}
</script>

<template>
  <div class="user-manger">
    <div class="query-form">
      <el-form inline ref="formRef" :model="user" label-width="120px" class="demo-dynamic">
        <el-form-item prop="userId" label="员工ID">
          <el-input v-model="user.userId" placeholder="请输入员工ID" />
        </el-form-item>
        <el-form-item prop="userName" label="员工名">
          <el-input v-model="user.userName" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item prop="state" label="员工状态">
          <el-select v-model="user.state" multiple style="width: 100%">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button type="danger" @click="handleReset(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDelete">批量删除</el-button>
      </div>
      <el-table
        ref="multipleTableRef"
        :data="userList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :formatter="item.formatter"
        />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :total="pager.total"
        :page-size="pager.pageSize"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="新增员工" v-model="dialogFormVisible">
      <el-form ref="addUserForm" :model="userForm" label-width="100px" :rules="rules">
        <el-form-item label="员工姓名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入员工姓名" />
        </el-form-item>
        <el-form-item label="员工邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" placeholder="请输入员工邮箱">
            <template #append> @163.com </template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="员工岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入员工岗位" />
        </el-form-item>
        <el-form-item label="员工状态" prop="state" style="width: 100%">
          <el-select v-model="userForm.state" style="width: 100%">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList" style="width: 100%">
          <el-select style="width: 100%" v-model="userForm.roleList" placeholder="请选择员工角色">
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId" style="width: 100%">
          <el-cascader
            style="width: 100%"
            :options="deptIdList"
            placeholder="请选择所属部门"
            show-all-levels
            v-model="userForm.deptId"
            clearable
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.user-manger {
  width: 100%;
  height: 100%;
  .query-form {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .el-form--inline .el-form-item {
      margin-bottom: 0;
    }
  }
  .base-table {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #fff;
    margin-top: 30px;
    padding: 10px 0;
    box-sizing: border-box;
    .action {
      height: 60px;
      text-align: left;
      margin-top: 20px;
      padding: 0 10px;
    }
    .el-table {
      border-top: 1px solid #e6e3e3;
    }

    .el-pagination {
      padding: 10px;
      justify-content: end;
    }
  }
}
</style>
