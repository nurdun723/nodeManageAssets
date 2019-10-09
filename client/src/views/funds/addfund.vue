<template>
<el-dialog title="添加资金" :visible.sync="dialog.show">
  <el-form :model="Formdata" ref="formref" :rules="form_rules" label-width="120px" style="margin:10px;width:auto;">
    <el-form-item label="资金类型">
      <el-select v-model="Formdata.type" placeholder="请选择类型">
        <el-option v-for="(optionitem,index) in format_type_list" :key="index" :label="optionitem" :value="optionitem"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="收支描述" prop="discribe" style="margin-buttom:10px;">
      <el-input type="discribe" v-model="Formdata.discribe" ></el-input>
    </el-form-item>
    
    <el-form-item label="收入" prop="incode">
      <el-input type="number" :min="0" v-model="Formdata.incode"></el-input>
    </el-form-item>

    <el-form-item label="支出" prop="excripe">
      <el-input type="number" :min="0" v-model="Formdata.excripe"></el-input>
    </el-form-item>

    <el-form-item label="账户现金" prop="cash" >
      <el-input type="number" :min="0" v-model="Formdata.cash"></el-input>
    </el-form-item>

    <el-form-item label="备注" prop="remark">
      <el-input type="remark" v-model="Formdata.remark"></el-input>
    </el-form-item>
    <el-form-item  class="text_right" style="text-align:right;">
      <el-button @click="cancleAdd()">取 消</el-button>
      <el-button type="primary" @click="addFormdata('formref')">确 定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<script>
export default {
    props:{
      dialog:Object,
      Formdata:Object,
    },
    data(){
      return {
        format_type_list: [
          "提现",
          "提现手续费",
          "充值",
          "优惠券",
          "充值礼券",
          "转账"
        ],
        form_rules:{
          discribe:[
            {required:true,message:"收支描述不能为空",trigger:"blur"}
          ],
          incode:[
            {required:true,message:"收入数量不能为空",trigger:"blur"}
          ],
          excripe:[
            {required:true,message:"支出数量不能为空",trigger:"blur"}
          ],
          cash:[
            {required:true,message:"账户现金不能为空",trigger:"blur"}
          ],
          remark:[
            {required:true,message:"资金备注不能为空",trigger:"blur"}
          ],
        }      
      }
    },
    name:"addfunds",
    components: {},
    methods:{
      addFormdata(ref){
        this.$refs[ref].validate((value)=>{
          if(value){
            try{
              this.$axios.post('/api/profile/addprofile',this.Formdata).then(addresult=>{
                if(addresult){
                  if(addresult.code == 200){
                    this.$message({
                      message: "保存成功！",
                      type: "success"
                    });
                    this.$emit("update");
                    this.cancleAdd()
                  }
                }                
              })
            }catch(e){
              this.$message({
                message: "添加失败！",
                type: "error"
              });
              this.cancleAdd()
            }
          }else{
            this.$message({
              message: "请填写完内容",
              type: "error"
            });
          }
        })
      },
      cancleAdd(){
        this.Formdata.type = ''
        this.Formdata.discribe = ''
        this.Formdata.incode = null
        this.Formdata.excripe = null
        this.Formdata.cash = ''
        this.Formdata.remark = ''
        this.dialog.show = false;
      }
    }

}
</script>
<style scoped>
</style>