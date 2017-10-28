<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item " 
        v-for="list in lists"
        :key="list.id"
        :class="{'address-item-default':list.isDefault}"
        @click="toEdit(list)"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit" >修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form',query:{type:'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<script>
    import Address from 'js/addressService.js'
    export default {
        data(){
            return{
                lists: null,
                checkIndex: 0
            }
        },
        created(){
            Address.list().then(res=>{
                console.log(res);
                this.lists = res.data.list
            })
        },
        methods:{
            toEdit(list){
                this.$router.push({
                    name: 'form',
                    query:{
                        type:'edit',
                        instance: list
                    }
                })
            },
        }
    }
</script>
