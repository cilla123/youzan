import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'

import 'css/common.css'
import './search.css'

let {keyword,id} = qs.parse(location.search.substr(1))
new Vue({
    el: '.container',
    
    data: {
        searchLists: null,
        keyword,
        isShow: false,
    },
    created() {
        this.getSearchList()
    },
    methods: {
        getSearchList(){
            axios.post(url.searchList,{keyword,id}).then(res=>{
                console.log(res)
                this.searchLists = res.data.lists
            })
        },
    },
    mixins:[mixin]
})