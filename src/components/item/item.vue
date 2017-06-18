<template>
  <li class="item">
    <router-link :to="{path:'/detail',query:{id:itemData.id}}">
      <div class="imgCon" :style="{backgroundImage:'url('+itemData.image+')'}"></div>
      <p class="name">{{itemData.title}}</p>
      <p class="price">¥ {{itemData.prize}}</p>
    </router-link>
  </li>
</template>

<script type="text/ecmascript-6">
    export default {
      props:{
        itemData:{}
      }
    }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  li.item{
    padding: 0.3rem;
    width: 50%;
    display: inline-block;
    box-sizing: border-box;
    border-bottom: 1px solid #d9d9d9;
    text-align: center;
    &.slide-enter-active, &.slide-leave-active {
      transform: translateY(0);
      transition: all 1s ease;
    }
    &.slide-enter, &.slide-leave-active {
      opacity: 0;
      transform: translateY(30px);
    }
    a{
      display: block;
    }
    .imgCon{
      width: 2.3rem;
      height: 2.3rem;
      background-color: #d9d9d9;
      margin: 0 auto;
      background-size: cover;
      background-image: url(http://sonotemp.b0.upaiyun.com/sono2.0/static/images/default.jpg);
      &[lazy=loading]{
        background-image: url(http://sonotemp.b0.upaiyun.com/sono2.0/static/images/default.jpg);
      }
      &[lazy=error]{
        background-image: url(http://sonotemp.b0.upaiyun.com/sono2.0/static/images/default.jpg);
      }
    }
    .name{
      font-size: 0.24rem;
      height: 0.24rem;
      margin-top: 0.15rem;
      line-height: 1em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price{
      color: #b4272d;
      line-height: 1em;
      font-size: 0.2rem;
      margin-top: 0.12rem;
      font-weight: bold;
    }
  }
</style>
