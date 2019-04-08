<<template>
  <div>
    <van-nav-bar
  title="设置"
  left-text="返回"
  @click-left="gotoGroupList"
  />

<van-cell-group>
  <van-cell title="基本信息" is-link :to="{name: 'GroupEdit', params: {id: id}}" />
  <van-cell title="群二维码" is-link :to="{name: 'GroupDetailQRcode', params: {id: id}}" />
</van-cell-group>
  </div>
</template>

<<style lang="css">
  
</style>

<script>
export default {
  props: ['id'],
  methods: {
    gotoGroupList () {
      this.$router.push({name: "GroupDetail", params: {id: this.id}});
    }
  }
}
</script>
