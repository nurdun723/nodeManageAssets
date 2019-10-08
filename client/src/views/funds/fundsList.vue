<template>
   <div class="fundslistpage">
       <div class="pagetop">
           <el-row type="flex" class="row-bg">
               <el-col :span="14">
                   <el-date-picker
                        v-model="starttime"
                        type="date"
                        placeholder="选择开始日期"
                        format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                    <span style="margin:0 10px;">---</span>
                    <el-date-picker
                        v-model="endtime"
                        type="date"
                        placeholder="选择结束日期"
                        format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                    <el-button type="primary" style="margin-left:10px;">搜索</el-button>
               </el-col>
               <el-col :span="4"></el-col>
               <el-col :span="6" style="text-align:right;">
                   <!-- <el-button type="primary" @click="dialogFormVisible = true">添加</el-button> -->
                   <el-form :inline="true" ref="add_data">
                       <el-form-item>
                           <el-button type="primary" @click="addHandle()">添加</el-button>
                       </el-form-item>
                   </el-form>
               </el-col>
           </el-row>
       </div>
       <dialog-form :dialog="dialog" :Formdata="Formdata"></dialog-form>
   </div>
</template>

<script>
import dialogForm from './addfund'
export default {
    name:"index",
    data(){
        return {
            starttime:undefined,
            endtime:undefined,
            dialog:{
                show:false,
            },
            Formdata:{
                type: "",
                describe: "",
                income: "",
                expend: "",
                cash: "",
                remark: "",
                id: ""
            },
        }
    },
    methods:{
        addHandle(){
            this.dialog.show = true;
        }
    },
    components: {
        dialogForm
  }
}
</script>
<style scoped>
.fundslistpage{
    height: 100%;
    padding: 0 20px;
}
.fundslistpage .pagetop{
    margin: 20px 0;
    margin-top: 35px;
}
</style>