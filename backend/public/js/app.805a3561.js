(function(e){function t(t){for(var o,s,a=t[0],c=t[1],u=t[2],l=0,m=[];l<a.length;l++)s=a[l],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&m.push(r[s][0]),r[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);d&&d(t);while(m.length)m.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},i=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var o=n("85ec"),r=n.n(o);r.a},3294:function(e,t,n){},"40db":function(e,t,n){},4384:function(e,t,n){"use strict";var o=n("d2ec"),r=n.n(o);r.a},4862:function(e,t,n){"use strict";var o=n("40db"),r=n.n(o);r.a},"4caa":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("99af"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isConnected?n("div",{attrs:{id:"app"}},[n("Name"),n("GameStatus"),n("Board"),n("Players")],1):e._e()},i=[],s=n("2f62"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["board",e.winner?"":"board--active"]},e._l(e.tiles,(function(t,o){return n("button",{key:o,class:["tile",t.color?"tile--"+t.color:"",t.uncovered?"":"tile--covered"],on:{click:function(t){return e.click(o)}}},[e._v(" "+e._s(t.word)+" ")])})),0)},c=[],u={name:"board",computed:{tiles:function(){return this.$store.state.game.tiles},uncovered:function(){return this.$store.state.game.uncovered},winner:function(){return this.$store.state.game.winner}},methods:{click:function(e){this.winner||this.$store.dispatch("makeMove",e)}}},d=u,l=(n("7b0e"),n("2877")),m=Object(l["a"])(d,a,c,!1,null,"56942d48",null),p=m.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.showName?n("div",{attrs:{id:"container"}},[n("div",{attrs:{id:"form"}},[n("h2",[e._v("He! Wat is je naam?")]),n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[e._v("Naam")]),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})])]),n("button",{on:{click:e.save}},[e._v("Go!")]),e.showNameForm?n("button",{on:{click:e.cancel}},[e._v("No!")]):e._e()])]):e._e()},v=[],b=(n("b0c0"),{name:"App",data:function(){return{name:this.$store.state.user.name,code:this.$store.state.user.code}},computed:{showName:function(){return!this.$store.state.user.name||this.$store.state.showNameForm},showNameForm:function(){return this.$store.state.showNameForm}},methods:{save:function(){this.$store.dispatch("updateName",this.name),this.$store.dispatch("setCode",this.code),this.$store.commit("setNameForm",!1)},cancel:function(){this.$store.commit("setNameForm",!1)}}}),_=b,h=(n("4384"),Object(l["a"])(_,f,v,!1,null,"493556bd",null)),g=h.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",e._l(e.players,(function(t){return n("li",{key:t.user.uuid},[e._v(" "+e._s(t.user.name)+" ("),t.isAdmin?n("span",[e._v("💂")]):e._e(),t.isSpyMaster?n("span",{on:{click:function(n){return e.toggleSpyMaster(t.user.uuid)}}},[e._v("🕵️‍♀️")]):e._e(),t.isSpyMaster?e._e():n("span",{on:{click:function(n){return e.toggleSpyMaster(t.user.uuid)}}},[e._v("🤡")]),t.user.uuid==e.uuid?n("span",{on:{click:e.toggleNameForm}},[e._v("✏️")]):e._e(),e._v(" ) ")])})),0)])},y=[],O={name:"App",computed:Object(s["b"])({players:function(e){return e.game.players},uuid:function(e){return e.user.uuid}}),methods:{toggleSpyMaster:function(e){this.$store.dispatch("toggleSpyMaster",e)},toggleNameForm:function(){this.$store.commit("setNameForm",!0)}}},N=O,k=(n("d0ff"),Object(l["a"])(N,w,y,!1,null,"5bd2611f",null)),E=k.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"flexcontainer"},[n("div",{class:{current:"blue"==e.turn,blue:!0,team:!0,winner:"blue"==e.winner}},[e._v(" Blauw: "+e._s(e.tilesLeft.blue)+" ")]),n("div",{class:{current:"red"==e.turn,red:!0,team:!0,winner:"red"==e.winner}},[e._v(" Rood: "+e._s(e.tilesLeft.red)+" ")]),n("button",{on:{click:e.skipTurn}},[e._v("Pas 👋")]),e.isAdmin||e.winner?n("button",{on:{click:e.newGame}},[e._v("Nieuw spel 🤡")]):e._e()])])},$=[],j={name:"App",computed:Object(s["b"])({turn:function(e){return e.game.turn},tilesLeft:function(e){return e.game.tileCount},winner:function(e){return e.game.winner},isAdmin:function(e){return e.isAdmin}}),methods:{skipTurn:function(){this.$store.dispatch("skipTurn")},newGame:function(){this.$store.dispatch("newGame")}}},C=j,A=(n("4862"),Object(l["a"])(C,S,$,!1,null,null,null)),T=A.exports,M={name:"App",components:{Board:p,Name:g,Players:E,GameStatus:T},computed:Object(s["b"])({isConnected:function(e){return e.socket.isConnected},identityNegotiated:function(e){return e.socket.identityNegotiated},turn:function(e){return e.game.turn},isAdmin:function(e){return e.isAdmin}})},P=M,x=(n("034f"),Object(l["a"])(P,r,i,!1,null,null,null)),R=x.exports,F=n("b408"),G=n.n(F),U=n("bfa9");o["a"].use(s["a"]);var K=new U["a"]({storage:window.localStorage,reducer:function(e){return{user:e.user}}}),L=new s["a"].Store({state:{user:{uuid:0,name:"name",code:void 0},isAdmin:!1,showNameForm:!1,socket:{isConnected:!1,identityNegotiated:!1,message:"",reconnectError:!1},game:{players:[],board:[],uncovered:[],winner:void 0,tileCount:{red:0,blue:0}}},mutations:{SOCKET_ONOPEN:function(e,t){o["a"].prototype.$socket=t.currentTarget,e.socket.isConnected=!0,e.socket.identityNegotiated=!1,o["a"].prototype.$socket.sendObj({action:"proposeUser",data:e.user})},SOCKET_ONCLOSE:function(e){e.socket.isConnected=!1},SOCKET_ONERROR:function(){},SOCKET_ONMESSAGE:function(e,t){e.socket.message=t},SOCKET_RECONNECT:function(){},SOCKET_RECONNECT_ERROR:function(e){e.socket.reconnectError=!0},setUser:function(e,t){e.user=t,e.socket.identityNegotiated=!0},setAdmin:function(e,t){e.isAdmin=t},setGame:function(e,t){e.game=t},setNameForm:function(e,t){e.showNameForm=t}},actions:{SOCKET_setUser:function(e,t){var n=e.commit;n("setUser",t.payload.user),n("setAdmin",t.payload.isAdmin)},SOCKET_setGame:function(e,t){var n=e.commit;n("setGame",t.payload)},updateName:function(e,t){o["a"].prototype.$socket.sendObj({action:"setName",data:t})},makeMove:function(e,t){o["a"].prototype.$socket.sendObj({action:"makeMove",data:t})},newGame:function(){o["a"].prototype.$socket.sendObj({action:"newGame"})},skipTurn:function(){o["a"].prototype.$socket.sendObj({action:"skipTurn"})},setCode:function(e,t){o["a"].prototype.$socket.sendObj({action:"setCode",data:t})},toggleSpyMaster:function(e,t){o["a"].prototype.$socket.sendObj({action:"toggleSpyMaster",data:t})}},plugins:[K.plugin]});o["a"].config.productionTip=!1;var B="https:"===window.location.protocol?"wss":"ws",V=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_WS_URL?Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_WS_URL:"".concat(B,"://").concat(window.location.hostname,":").concat(window.location.port,"/");o["a"].use(G.a,V,{reconnection:!0,store:L,format:"json"}),new o["a"]({render:function(e){return e(R)},store:L}).$mount("#app")},"7b0e":function(e,t,n){"use strict";var o=n("3294"),r=n.n(o);r.a},"85ec":function(e,t,n){},d0ff:function(e,t,n){"use strict";var o=n("4caa"),r=n.n(o);r.a},d2ec:function(e,t,n){}});
//# sourceMappingURL=app.805a3561.js.map