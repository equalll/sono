<template>
  <div class="fold_text">
    {{fold}}
    <span v-if="ifMore" class="more" @click="toggleFlag" v-html="moreText"></span>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
          return{
              flag:true
          }
        },
        props:{
          content:{
              type:String
          }
        },
        methods:{
          isFull (pChar) {
            for (let i = 0; i < pChar.strLen ; i++ ) {
              if ((pChar.charCodeAt(i) > 128)) {
                return true;
              } else {
                return false;
              }
            }
          },
          cutString(pStr, pLen) {
            let _this = this
            let _strLen = pStr.length;

            let _tmpCode;

            let _cutString;

            let _cutFlag = "1";

            let _lenCount = 0;

            let _ret = false;

            if (_strLen <= pLen/2) {
              _cutString = pStr;
              _ret = true;
            }

            if (!_ret) {
              for (let i = 0; i < _strLen ; i++ ) {
                if (_this.isFull(pStr.charAt(i))) {
                  _lenCount += 2;
                } else {
                  _lenCount += 1;
                }

                if (_lenCount > pLen) {
                  _cutString = pStr.substring(0, i);
                  _ret = true;
                  break;
                } else if (_lenCount == pLen) {
                  _cutString = pStr.substring(0, i + 1);
                  _ret = true;
                  break;
                }
              }
            }

            if (!_ret) {
              _cutString = pStr;
              _ret = true;
            }

            if (_cutString.length == _strLen) {
              _cutFlag = "0";
            }

            return {"cutstring":_cutString, "cutflag":_cutFlag};
          },
          toggleFlag () {
              this.flag = !this.flag
          },
          autoAddEllipsis(pStr, pLen) {

            let _ret = this.cutString(pStr, pLen);
            let _cutFlag = _ret.cutflag;
            let _cutStringn = _ret.cutstring;

            return {"string":_cutStringn, "cutflag":_cutFlag};

          },
        },
        computed:{
          moreText () {
              if(this.flag){
                  return "&#8595;更多"
              }else{
                return "&#8593;收起"
              }
          },
          ifMore () {
            if(this.content.length>50){
                return true
            }else {
                return false
            }
          },
          fold () {
              let _this = this
              if(!_this.ifMore){return this.content;}
              if(this.flag){
                return _this.autoAddEllipsis(_this.content,50).string
              }else{
                return this.content
              }
          }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
