export interface IUser {
  userId: number
  userName: string
  userEmail: string
  role: number
  state: number
  job: string
  deptId: string[]
  roleList: string[]
  mobile: string
  token?: string
  createTime?: string
  lastLoginTime?: string
}
