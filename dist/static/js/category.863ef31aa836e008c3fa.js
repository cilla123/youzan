webpackJsonp([2],{1:function(t,n,a){"use strict";var i={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank"};for(var s in i)i.hasOwnProperty(s)&&(i[s]="http://rapapi.org/mockjsdata/24170"+i[s]);n.a=i},10:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"bottom-nav"},[a("ul",[a("li",{staticClass:"active"},[a("a",{attrs:{href:"index.html"}},[a("i",{staticClass:"icon-home"}),t._v(" "),a("div",[t._v("有赞")])])]),t._v(" "),a("li",[a("a",{attrs:{href:""}},[a("i",{staticClass:"icon-category"}),t._v(" "),a("div",[t._v("分类")])])]),t._v(" "),a("li",[a("a",{attrs:{href:""}},[a("i",{staticClass:"icon-cart"}),t._v(" "),a("div",[t._v("购物车")])])]),t._v(" "),a("li",[a("a",{attrs:{href:""}},[a("i",{staticClass:"icon-user"}),t._v(" "),a("div",[t._v("我")])])])])])}]}},17:function(t,n){},2:function(t,n){},3:function(t,n,a){function i(t){a(8)}var s=a(9)(a(7),a(10),i,null,null);t.exports=s.exports},39:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=a(2),s=(a.n(i),a(17)),e=(a.n(s),a(4)),o=a(5),c=a.n(o),r=a(1),u=a(3),l=a.n(u);new e.default({el:"#app",data:{topLists:null,topIndex:0,subData:null,rankData:null},created:function(){this.getTopList(),this.getSubList(0)},methods:{getTopList:function(){var t=this;c.a.post(r.a.topList).then(function(n){t.topLists=n.data.lists}).catch(function(t){})},getSubList:function(t,n){var a=this;this.topIndex=t,0===t?this.getRank():c.a.post(r.a.subList,{id:n}).then(function(t){a.subData=t.data.data}).catch(function(t){})},getRank:function(){var t=this;c.a.post(r.a.rank).then(function(n){console.log(n.data.data),t.rankData=n.data.data}).catch(function(t){})}},components:{Foot:l.a},filters:{number:function(t){return t+".00"}}})},7:function(t,n){},8:function(t,n){}},[39]);
//# sourceMappingURL=category.863ef31aa836e008c3fa.js.map