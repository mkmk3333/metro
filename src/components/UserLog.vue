<template>

    <el-button text @click="dialogFormVisible = true">
      <p>登录/注册</p>
    </el-button>
  
    <el-dialog v-model="dialogFormVisible" title="登录">
      <el-form :model="form">
        <el-form-item label="账户" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.key" autocomplete="off" />

        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false"><p>关闭</p></el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            <p>确认</p>
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script>
  import { reactive,ref } from 'vue';
  export default{
    name:'UserLog',
    setup(){

      const dialogFormVisible = ref(false)
      const formLabelWidth = '140px'

      const form = reactive({
            name: '',
            key:'',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
          })
      return{
        dialogFormVisible,
        formLabelWidth,
        form
      }
  
    } 
  }
  </script>

  <style scoped>
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  </style>