 
 import './cart_base.css'
 import './cart_trade.css'
 import './cart.css'

 import Vue from 'vue'
 import axios from 'axios'
 import url from 'js/api.js'
 import mixin from 'js/mixin.js'
 import velocity from 'velocity-animate'
 import Cart from 'js/cartService.js'

 new Vue({
     el: '.container',
     data:{
        cartLists: null,
        total: 0,
        editingShop: [],
        editingIndex: -1,
        removePopup:false,
        removeDta: null,
        removeMsg: ''
        
     },
     computed:{
        selectAll: {
            get(){
                if(this.cartLists&&this.cartLists.length){
                    return this.cartLists.every(shop=>{
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                this.cartLists.forEach(shop=>{
                    shop.checked = newVal
                    shop.goodsList.forEach(good=>{
                        good.checked = newVal
                    }) 
                })
            }
        },
        allRemoveSelected:{
            get(){
                if(!(this.editingIndex===-1)){
                    return this.editingShop.removeChecked
                }
            },
            set(newVal){
                if(!(this.editingIndex===-1)){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good=>{
                        good.removeChecked = newVal
                    })
                }
            }
        },
        selectLists() {
            if(this.cartLists&&this.cartLists.length){
                let arr = []
                let total = 0
                this.cartLists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good)
                            total += good.price *good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        },
        removeList(){
            if(!(this.editingIndex ===-1)){
                let arr = []
                this.editingShop.goodsList.forEach(good=>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr 
            }
            return []
        }

        
     },
     created(){
        this.getLists()
     },
     methods: {
        getLists(){
            axios.post(url.cartLists).then(res=>{
                let lists = res.data.cartList
                lists.forEach(shop=>{
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                        good.removeChecked = false
                    })
                })
                this.cartLists = lists
            })
        },
        selectGood(shop,good){
            let attr = this.editingIndex === -1? 'checked':'removeChecked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good=>{
                return good[attr]
            })
        },
        selcetShop(shop){
            let attr = this.editingIndex === -1? 'checked':'removeChecked'            
            shop[attr] = !shop[attr] 
            shop.goodsList.forEach(good=>{
                 good[attr] = shop[attr]
            })
        },
        allSelected() {
            let attr = this.editingIndex === -1? 'selectAll':'allRemoveSelected' 
            this[attr]= !this[attr]

        },
        edit(shop,shopIndex,goodIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成':'编辑'
            this.cartLists.forEach((item,index)=>{
                if(shopIndex !==index ){
                    item.editng = false
                    item.editingMsg = shop.editing ? '':'编辑'
                }
            })
            this.editingShop = shop.editing ? shop :null
            this.editingIndex = shop.editing ? shopIndex : -1
            
            
        },
        reduce(good){
            if(good.number ===1) return 
            Cart.reduce(good.id).then(res=>{
                good.number--
            })

        },
        add(good){
            Cart.add(good.id).then(res=>{
                good.number++
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            this.removePopup = true
            this.removeData = {shop,shopIndex,good,goodIndex}
            this.removeMsg = '确定要删除该商品吗?'
        },
        removeLists(){
            
            this.removePopup = true
            this.removeMsg = `确定将所选的${this.removeList.length}个商品删除？`
        },
        removeConfirm(){
            if(this.removeMsg === '确定要删除该商品吗?'){
                let {shop,shopIndex,good,goodIndex} = this.removeData
                Cart.cartRemove(good.id).then(res=>{
                    console.log(res);
                    shop.goodsList.splice(goodIndex,1)
                    this.removePopup = false
                    if(!shop.goodsList.length){
                        this.cartLists.splice(shopIndex,1)  
                        this.removeShop()  
                    }
                    
                })
                // this.$refs[`goods-${shopIndex}-${goodIndex}`][0].style.left = '0px'
            }else{
                let ids =[]
                this.removeList.forEach(good=>{
                    ids.push(good.id)
                })
                Cart.cartMremove(ids).then(res=>{
                    let arr = []
                    this.removePopup = false
                    this.editingShop.goodsList.forEach(good=>{
                        let index = this.removeList.findIndex(item=>{
                            return item.id == good.id
                        })
                        if(index === -1){
                            arr.push(good)
                        }
                    })
                    if(arr.length){
                        this.editingShop.goodsList = arr
                    }else{
                        this.cartLists.splice(this.editingIndex,1) 
                        this.removeShop()
                    }
                    
                })
            }
        },
        removeShop(){
            this.editingShop = null
            this.editingIndex = -1
            this.cartLists.forEach(shop=>{
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        updata(good,e){
            if(good.number<1||(/[^\d]/g.test(good.number))){
                good.number = 1
            }
            Cart.updata(good.id,good.number).then(res=>{
                console.log(res.statusText);
                
            })
        },
        start(e,good){
            good.startX = e.changedTouches[0].clientX
        },
        end(e,shopIndex,good,goodIndex){
            let endX = e.changedTouches[0].clientX
            let left = '0'
            if(this.editingIndex===-1){
                if(good.startX -endX>100){
                    left = '-60px'
                }
                if(endX - good.startX>100){
                    left = '0px'
                }
                velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{left})
            }
            
        }
     },
     mixins: [mixin]
 })