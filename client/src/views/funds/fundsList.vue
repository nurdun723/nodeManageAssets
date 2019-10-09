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
                   <el-form :inline="true" ref="add_data">
                       <el-form-item>
                           <el-button type="primary" @click="addHandle()">添加</el-button>
                       </el-form-item>
                   </el-form>
               </el-col>
           </el-row>
       </div>

       <div>
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column label="创建时间" sortable prop="date">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ formatedate(scope.row.date) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="收支类型" >
                <template slot-scope="scope">
                    <span>{{scope.row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column label="收支描述" >
                <template slot-scope="scope">
                    <span>{{scope.row.discribe}}</span>
                </template>
            </el-table-column>
            <el-table-column label="收入" >
                <template slot-scope="scope">
                    <span style="color:#00d053">+{{scope.row.incode}}</span>
                </template>
            </el-table-column>
            <el-table-column label="支出" >
                <template slot-scope="scope">
                    <span style="color:#f56767">-{{scope.row.excripe}}</span>
                </template>
            </el-table-column>
            <el-table-column label="账户现金" >
                <template slot-scope="scope">
                    <span style="color:#4db3ff">{{scope.row.cash}}</span>
                </template>
            </el-table-column>
            <el-table-column label="备注" >
                <template slot-scope="scope">
                    <span>{{scope.row.remark}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
       </div>
       <dialog-form :dialog="dialog" :Formdata="Formdata" @update="reloaddata()"></dialog-form>
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
                discribe: "",
                incode: null,
                excripe: null,
                cash: null,
                remark: "",
                id: ""
            },
            tableData:[],
        }
    },
    methods:{
        addHandle(){
            this.dialog.show = true;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            let id = row._id;
            this.$axios.post('/api/profile/deleteprofilebyid',{id:id}).then(res=>{
                if(res.code == 200){
                    this.$message({
                      message: "删除成功！",
                      type: "success"
                    });
                    this.getAllData();
                }else{
                    this.$message({
                      message: "删除失败！",
                      type: "error"
                    });
                }
            })
        },
        //查询所有数据
        getAllData(){
            this.$axios.post('/api/profile/selecttallprofile').then(res=>{
                this.tableData = []
                if(res.code == 200){
                    this.tableData = res.data;
                }else{
                    this.$message({
                      message: "查询失败！",
                      type: "error"
                    });
                }
            })
        },
        //格式化时间格式
        formatedate(time){
            const date = new Date(time);
            let year = date.getFullYear();
            let mounth = date.getMonth()+1;
            let day = date.getDay();
            let hour = date.getHours();
            let minit = date.getMinutes();
            let secend = date.getSeconds();
            
            mounth = mounth < 10 ? `0${mounth}` : mounth;
            day = day < 10 ? `0${day}` : day;
            hour = hour < 10 ? `0${hour}` : hour;
            minit = minit < 10 ? `0${minit}` : minit;
            secend = secend < 10 ? `0${secend}` : secend;

            return `${year}-${mounth}-${day} ${hour}:${minit}:${secend}`
        },
        //重新加载数据
        reloaddata(){
            this.getAllData();
        }
    },
    created() {
        this.getAllData()
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