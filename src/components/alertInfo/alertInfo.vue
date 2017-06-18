<template>
  <div class="alertInfo">
    <div class="alertCon">
      <img v-if="alertData.img" src="http://sonotemp.b0.upaiyun.com/sono2.0/static/img/check.png" alt="">
      <h1>{{alertData.title}}</h1>
      <p>{{alertData.desc}}</p>
      <div class="btnGroup">
          <template v-for="item in alertData.btn">
            <div @click="item.callback" class="btn" v-if="item.callback">{{item.name}}</div>
            <div @click="CLOSEALERT" class="btn" v-else>{{item.name}}</div>
          </template>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import { mapState,mapMutations } from 'vuex'
    export default {
        computed: mapState({
          alertData : state => state.alertData,
        }),
        methods:{
          ...mapMutations([
            'CLOSEALERT' // 映射 this.increment() 为 this.$store.commit('increment')
          ]),
        }
    }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
.alertInfo{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  z-index: 10000;
  background-color: rgba(0,0,0,0.8);
  text-align: center;
  &.fade-enter-active, &.fade-leave-active {
    transition: opacity .5s
  }
  &.fade-enter, &.fade-leave-active {
    opacity: 0
  }
  .alertCon{
    position: absolute;
    left: 0.3rem;
    right: 0.3rem;
    bottom: 50%;
    padding: 0.5rem 0;
    background-color: #fff;
    border-radius: 0.1rem;
    img{
      width: 1.4rem;
      display: block;
      margin:  0 auto 0.2rem;
    }
    h1{
      font-size: 0.3rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
      color: #ff434c;
    }
    p{
      font-size: 0.28rem;
      color: #333;
      padding: 0 0.3rem;
      line-height: 1.6em;
    }
    .btnGroup{
      display: flex;
      height: 0.5rem;
      text-align: center;
      padding: 0 0.3rem;
      line-height: 0.5rem;
      margin-top: 0.1rem;
      justify-content: space-around;
      .btn{
        flex: 0;
        flex-basis:2.6rem;
        color: #fff;
        background-color: #ff434c;
        margin: 0 0.2rem;
        border-radius: 10px;
      }
    }
  }
}
</style>
