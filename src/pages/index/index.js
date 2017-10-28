import Vue from 'vue'
import axios from 'axios'
import { InfiniteScroll } from 'mint-ui' 
import url from 'js/api.js'

import 'css/common.css'
import './index.css'

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swiper.vue'

Vue.use(InfiniteScroll)

let app = new Vue({
    el: '#app',
    data: {
        lists: null,
        bannerLists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false
    },
    created(){
        this.getLists()
        this.getBanner()
    },
    methods: {
       getLists(){
           if(this.allLoaded) return
            this.loading = true
            axios.post(url.hotLists,{
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then((res)=>{
                console.log(res);
                let curLists = res.data.lists
                if(this.pageSize > curLists.length){
                    this.allLoaded = true
                }
                if(this.lists){
                    this.lists = this.lists.concat(curLists)
                }else{
                    this.lists = curLists
                }
                this.loading = false
                this.pageNum++
            })
        },
        getBanner(){
            axios.get(url.banner).then((res)=>{
                console.log(res);
                this.bannerLists = res.data.lists
            })
        }
    },
    components: {
        Foot,
        Swipe
    }
})
