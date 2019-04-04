<template>
<div>
    <van-nav-bar
  title="群组"
  left-text="取消"
  right-text="保存"
  @click-left="gotoGroupList"
  @click-right="saveGroup"
  />


<van-cell-group>
  <van-field label="名称" required v-model="name" placeholder="请输入名称" />
  <van-field label="描述" type="textarea" rows="3" v-model="description" placeholder="请输入描述" />
  <van-field label="权重" type="number" v-model="weighting" placeholder="请输入权重" />
  <van-field label="徽标" type="file" @change="getFile($event)" />
</van-cell-group>

</div>
</template>

<style scoped>

</style>

<script>
export default {
  props: ['id'],
  data () {
    return {
      name: '',
      description: '',
      weighting: 0,
      logo: null,
    }
  },
  methods: {
    gotoGroupList() {
      this.$router.push("GroupList");
    },
    getFile(evt) {
      this.logo = evt.target.files[0];
    },
    saveGroup () {
      console.log('savegroup');
      let vm = this;
      if (vm.id) {
        // TODO: implement edit form
      } else {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('weighting', this.weighting);
        if (vm.logo) {
          formData.append('logo', this.logo);
        }
        vm.$api.kehubu.createGroup(formData).then(function (res) {
          vm.$notify({message: '保存成功', background: '#07c160'});
          vm.$router.push("GroupList");
        }).catch(function (err) {
          console.log(err);
          vm.$notify("保存失败");
        });
      }
    }
  }
  
}
</script>