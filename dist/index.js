(()=>{"use strict";class e{constructor(){this.log=!1,this.observe=!1,this.slowerTime=0,this.port="",this.slowerPort="",this.slowerSend=!1,this.baseFlag=!1,this.ipData={},this.performanceTime={},this.navigationTime={}}_mark(e){e&&performance.mark&&performance.mark(e)}_getEntries(){return performance.getEntries?performance.getEntries():[]}_getEntriesByType(e){return performance.getEntriesByType?performance.getEntriesByType(e):[]}_clearMarks(e){performance.clearMarks&&performance.clearMarks(e)}_getEntriesByName(e){return performance.getEntriesByName?performance.getEntriesByName(e):[]}_toJSON(){performance.toJSON&&performance.toJSON()}_initObject(e){const t=Object.create({},{c:{value:{time:null,name:"重定向耗时："},writable:!1,enumerable:!0},d:{value:{time:null,name:"DNS查询耗时："},writable:!1,enumerable:!0},e:{value:{time:null,name:"TLS连接耗时："},writable:!1,enumerable:!0},f:{value:{time:null,name:"TCP连接耗时："},writable:!1,enumerable:!0},g:{value:{time:null,name:"HTTP请求耗时："},writable:!1,enumerable:!0},h:{value:{time:null,name:"第一个请求响应后为准计算的白屏时间："},writable:!1,enumerable:!0},i:{value:{time:null,name:"纯DOM结构解析完成为准计算的白屏时间："},writable:!1,enumerable:!0},j:{value:{time:null,name:"dom结构耗时："},writable:!1,enumerable:!0},k:{value:{time:null,name:"DOMContentLoaded时间："},writable:!1,enumerable:!0},l:{value:{time:null,name:"文档解析完成时间："},writable:!1,enumerable:!0},m:{value:{time:null,name:"所有资源加载完毕耗时："},writable:!1,enumerable:!0}});try{return Object.assign(t,e)}catch(e){throw new TypeError("基础数据不可覆盖————",e)}}_performanceTime(e){const t=performance.timing,n=this._initObject();this._addEventListen(this.performanceTime,n,t,"#1890FF",e)}_navigationTime(e){const t=window.PerformanceNavigationTiming?this._getEntriesByType("navigation")[0]:[];t.navigationStart=t.startTime;const n=this._initObject();this._addEventListen(this.navigationTime,n,t,"#266fe2",e),setTimeout((()=>{t.name&&(n.a={time:t.name,name:"解析地址"}),window.PerformancePaintTiming&&this._getEntriesByType("paint").length&&(n.b={time:this.handleFixed(this._getEntriesByType("paint")[0].startTime),name:"谷歌计算的白屏时间："})}),0)}_addEventListen(e,t,n,o,i){this._timeCompute1(e,t,n,o);const r=()=>{setTimeout((()=>{this._timeCompute2(e,t,n,o)}),0)},a=()=>{setTimeout((()=>{this._timeCompute3(e,t,n,o),i&&i("Event_load")}),0)};window.addEventListener("DOMContentLoaded",r),window.addEventListener("load",a),window.addEventListener("pagehide",(()=>{window.removeEventListener("DOMContentLoaded",r),window.removeEventListener("load",a)})),window.addEventListener("unload",(()=>{window.removeEventListener("DOMContentLoaded",r),window.removeEventListener("load",a)}))}_timeCompute1(e,t,n){n.redirectEnd&&n.redirectStart&&(t.c.time=this.handleFixed(n.redirectEnd-n.redirectStart)),n.domainLookupEnd&&n.domainLookupStart&&(t.d.time=this.handleFixed(n.domainLookupEnd-n.domainLookupStart)),n.connectEnd&&n.secureConnectionStart>0&&(t.e.time=this.handleFixed(n.connectEnd-n.secureConnectionStart)),n.connectEnd&&n.connectStart&&(t.f.time=this.handleFixed(n.connectEnd-n.connectStart)),Object.assign(e,t)}_timeCompute2(e,t,n){n.workerStart&&n.fetchStart&&(t.a1.time=this.handleFixed(n.fetchStart-n.workerStart)),n.responseEnd&&n.requestStart&&(t.g.time=this.handleFixed(n.responseEnd-n.requestStart)),n.responseStart&&(t.h.time=this.handleFixed(n.responseStart-n.navigationStart)),n.domInteractive&&(t.i.time=this.handleFixed(n.domInteractive-n.navigationStart)),n.domInteractive&&n.domLoading&&(t.j.time=this.handleFixed(n.domInteractive-n.domLoading)),n.domContentLoadedEventEnd&&(t.k.time=this.handleFixed(n.domContentLoadedEventEnd-n.navigationStart)),Object.assign(e,t)}_timeCompute3(e,t,n,o){if(n.domComplete&&n.domLoading&&(t.l.time=this.handleFixed(n.domComplete-n.domLoading)),n.loadEventEnd&&(t.m.time=this.handleFixed(n.loadEventEnd-n.navigationStart)),!0===this.log){console.info("%cperformance 和 navigation 统计埋点数据：",`color:${o};`);for(let e in t)console.info(`%c${t[e].name}`,`color:${o};`,`${t[e].time}`)}Object.assign(e,t)}_integrationOption(){const e=this.handleBaseData(),t=this.handleNetworkData(),n=this.handleEquipmentData(),o={...e,...t,...n};!0===this.log&&(console.info("%c基础耗时数据：","color:#b8920c;",e),console.info("%c网络信息数据：","color:#b8920c;",t),console.info("%c用户设备数据：","color:#b8920c;",n),console.info("%c接口入参数据：","color:#FE4066;",o),console.info("%c接口入参数据——————复制mock数据：","color:#b8920c;",JSON.stringify(o))),this._portBase(o),this.slowerPort&&(this.slowerSend=!0,this._slowerResource())}_portBase(e){this.baseFlag=!0;const t=JSON.stringify({data:e});"sendBeacon"in navigator&&navigator.sendBeacon(this.port,t)?console.log("sendBeacon——port成功进入浏览器请求队列"):fetch(this.slowerPort,{method:"POST",headers:{"Content-Type":"application/json"},mode:"cors",body:t}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}_portResource(e){if(console.info("%c抓取过慢资源数据：","color:#b8920c;",e),console.info("%c抓取过慢资源数据——————复制mock数据：","color:#b8920c;",JSON.stringify(e)),!this.baseFlag||!e.length)return;const t=JSON.stringify({data:e});"sendBeacon"in navigator&&navigator.sendBeacon(this.slowerPort,t)?console.info("sendBeacon——slowerPort成功进入浏览器请求队列"):fetch(this.slowerPort,{method:"POST",headers:{"Content-Type":"application/json"},mode:"cors",body:t}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}_portMark(e){const t=performance.getEntriesByType("mark");if("[object String]"!==Object.prototype.toString.call(e))return void console.info("_portMark——请传入正确的请求地址");if(!t.length)return void console.info("_portMark——无mark记录");const n=JSON.stringify({data:t});"sendBeacon"in navigator&&navigator.sendBeacon(e,n)?console.info("_portMark——成功进入浏览器请求队列"):fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},mode:"cors",body:n}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}_slowerResource(e){const t=[];(e||this._getEntriesByType("resource")).forEach((e=>{e.responseEnd&&e.fetchStart&&e.responseEnd-e.fetchStart>this.slowerTime&&t.push({_n:e.name,_t:e.initiatorType,_r:this.handleFixed(e.responseEnd-e.fetchStart),_c:this._isCacheHit(e),_y:this._blockingTime(e)})})),this.slowerSend&&t.length&&this._portResource(t)}_blockingTime(e={}){let t=0;return e.connectEnd&&e.connectEnd===e.fetchStart?t=e.requestStart-e.connectEnd:e.domainLookupStart&&(t=e.domainLookupStart-e.fetchStart),t}_isCacheHit(e={}){return!(e.transferSize>0)&&(e.decodedBodySize>0||e.duration<30)}_is304(e={}){return e.encodedBodySize>0&&e.tranferSize>0&&e.tranferSize<e.encodedBodySize||null}_onBufferFull(){performance.onresourcetimingbufferfull=performance.onwebkitresourcetimingbufferfull=this._clearResourceBufferFull}_clearResourceBufferFull(){performance.clearResourceTimings()}_performanceObserver(){"function"==typeof window.PerformanceObserver?new window.PerformanceObserver(((e,t)=>{const n=e.getEntries();n.length&&n[0].name&&-1===n[0].name.indexOf(this.slowerPort)&&this._slowerResource(n)})).observe({entryTypes:["navigation","resource","mark","paint"]}):console.info("观察者模式建立失败，浏览器不支持PerformanceObserver")}init(e={}){if(this.handleInitParams(e),"performance"in window){try{console.log(`%c${new Date(performance.timeOrigin).toLocaleString()}————performance统计精度基准点：${performance.timeOrigin}`,"color:#FAAD14;font-weight:bold");const e=new Promise((e=>{this._performanceTime(e)})),t=new Promise((e=>{this._navigationTime(e)})),n=new Promise((e=>{this.handleGetIp(e)}));Promise.all([e,t,n]).then((()=>{this._integrationOption()}))}catch(e){console.error("浏览器不兼容或语法错误——————",e)}return this}console.log("%c当前浏览器不支持performance","color:#1890FF;font-weight:bold")}handleInitParams(e){"[object Boolean]"===Object.prototype.toString.call(e.log)&&(this.log=e.log),"[object Boolean]"===Object.prototype.toString.call(e.observe)&&(this.observe=e.observe),"[object Number]"!==Object.prototype.toString.call(e.slowerTime)||isNaN(e.slowerTime)||(this.slowerTime=e.slowerTime),"[object String]"===Object.prototype.toString.call(e.port)&&(this.port=e.port),"[object String]"===Object.prototype.toString.call(e.slowerPort)&&(this.slowerPort=e.slowerPort),this.observe&&this.slowerPort&&(this._performanceObserver(),this._onBufferFull())}handleFixed(e,t=3,n=1e3){return"number"!=typeof e||e?Number(e/n).toFixed(t):0}handleBaseData(){const e={};for(let t in this.navigationTime)e[t]=this.navigationTime[t].time,!e[t]&&this.performanceTime[t]&&this.performanceTime[t].time&&(e[t]=this.performanceTime[t].time);return e}handleNetworkData(){const e={},t=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return e.n=t.downlink,e.o=t.type||null,e.p=t.effectiveType||this.handleEffectiveType(),e.q=t.rtt,e.r=t.saveData,e.s=0,e.t=this.ipData.ip,e.u=this.ipData.cname,navigator.connection.addEventListener("change",(()=>{e.s+=1})),e}handleGetIp(e){let t=document.createElement("script");t.src="http://pv.sohu.com/cityjson?ie=utf-8",t.async=!0,t.onload=()=>{window.returnCitySN&&(this.ipData.ip=window.returnCitySN.cip,this.ipData.cname=window.returnCitySN.cname,t.remove&&t.remove(),e())},t.onerror=()=>{e()},document.body.appendChild(t)}handleEffectiveType(){const e=navigator.userAgent||"";let t,n=e.match(/NetType\/\w+/)?e.match(/NetType\/\w+/)[0]:"NetType/other";switch(n=n.toLowerCase().replace("nettype/",""),n){case"wifi":t="wifi";break;case"4g":t="4g";break;case"3g":case"3gnet":t="3g";break;case"2g":t="2g";break;default:t="other"}return t}handleEquipmentData(){const e={};return e.v=this.handleEquipmentPortType(),e.w=this.handleEquipmentType(),e.x=this.handleEquipmentNaType(),e.y=navigator.appVersion,e.z=(navigator.browserLanguage||navigator.language).toLowerCase(),e}handleEquipmentPortType(){let e=navigator.userAgent||"";e=e.toLowerCase();const t="ipad"==e.match(/ipad/i),n="iphone os"==e.match(/iphone os/i),o="midp"==e.match(/midp/i),i="rv:1.2.3.4"==e.match(/rv:1.2.3.4/i),r="ucweb"==e.match(/ucweb/i),a="android"==e.match(/android/i),s="windows ce"==e.match(/windows ce/i),c="windows mobile"==e.match(/windows mobile/i);return t||n||o||i||r||a||s||c?1:0}handleEquipmentType(){let e=0,t=navigator.userAgent||"";switch(t=t.toLowerCase(),t){case/\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(t):e=1;break;case/android|adr/gi.test(t)||t.indexOf("Android")>-1||t.indexOf("Linux")>-1:e=2;break;case/iPad/gi.test(t):e=3}return e}handleEquipmentNaType(){let e=0;const t=navigator.userAgent||"";switch(t){case t.indexOf("Opera")>-1:e=1;break;case t.indexOf("compatible")>-1&&t.indexOf("MSIE")>-1&&!t.indexOf("Opera")>-1:e=2;break;case t.indexOf("Edge")>-1:e=3;break;case t.indexOf("Firefox")>-1:e=4;break;case t.indexOf("Safari")>-1&&-1==t.indexOf("Chrome"):e=5;break;case t.indexOf("Chrome")>-1&&t.indexOf("Safari")>-1:e=6}return e}}window.__pm__=new e,new e})();