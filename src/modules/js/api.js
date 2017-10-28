let url = {
    hotLists: '/index/hotLists',
    banner: '/index/banner',
    topLists:'/category/topList',
    subLists: '/category/subList',
    rank: '/category/rank',
    searchList: '/search/list',
    details: '/goods/details',
    deal: '/goods/deal',
    cartAdd:'/cart/add',
    cartLists: '/cart/list',
    cartReduce: '/cart/reduce',
    cartRemove: '/cart/remove',
    cartMremove: '/cart/mremove',
    updata: '/cart/updata',
    addressLists: '/address/list',
    addressAdd:'/address/add',
    addressRemove: '/address/remove',
    addressUpdata: '/address/update',
    addressSetDefault: '/address/setDefaul'


}

let host = 'http://rapapi.org/mockjsdata/24581'

for (var key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key];
        
    }
}  

export default url