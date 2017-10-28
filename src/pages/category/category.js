import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import 'css/common.css'
import './category.css'

import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'

let app = new Vue({
    el: '#app',
    data:{
        topLists: null,
        topIndex: 0,
        subLists: null,
        rankData: null
    },
    created(){
        this.getTopList()
        this.getRank()
    },
    methods:{
        getTopList(){
            axios.post(url.topLists).then((res)=>{
                this.topLists = res.data[0].lists
            })
        },

        getSubList(id,index){
            this.topIndex = index
            if(index === 0){
                this.getRank()
            }else{
                axios.post(url.subLists,{id}).then((res)=>{
                    this.subLists = res.data[0]
                })
            }
        },
        getRank(){
            axios.post(url.rank).then((res)=>{
                this.rankData = res.data[0].data
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    components:{
        Foot
    },
    mixins:[mixin]
})