!function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[a]={exports:{}};e[a][0].call(f.exports,function(t){var n=e[a][1][t];return i(n?n:t)},f,f.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=t("animejs"),a=t("./helpers/swapper"),s=t("./helpers/PageFetcher"),u=(t("./helpers/isTablet"),function(){return window.matchMedia("(min-width: 1024px)").matches}),c=function(t){return t.indexOf("overview")>=0},f=function(){function t(){r(this,t),this.swapper=null,this.pageFetcher=null,this.init()}return i(t,[{key:"init",value:function(){var t=this,e=document.getElementById("root");this.initSwapper(),this.addListeners(),this.pageFetcher=new s({root:e,beforeChange:function(t,n){o({targets:e,opacity:0,duration:500,translateY:c(t)?20:-20,easing:"linear",complete:n})},afterChange:function(n,r){t.initSwapper(),o({targets:e,duration:500,opacity:1,translateY:c(n)?[-20,0]:[20,0],easing:"linear",complete:function(){e.removeAttribute("style")}})}})}},{key:"addListeners",value:function(){var t=this;window.addEventListener("hashchange",function(){t.swapper instanceof a&&t.swapper.open(window.location.hash.replace("#",""))})}},{key:"initSwapper",value:function(){if(window.location.pathname.indexOf("overview")!==-1){this.swapper=new a({itemsContainer:".topics-list",navItems:".topics-nav__anchor",items:".topic-article",beforeOpen:function(t,e,n){return u()?(o({targets:".topic-articles",opacity:0,translateY:e?20:-20,duration:300,easing:"linear",complete:n}),void window.history.pushState({page:null,hash:t},t,"#"+t)):n()},afterOpen:function(t,e){u()&&o({targets:".topic-articles",translateY:e?[-20,0]:[20,0],duration:300,easing:"linear",opacity:1})}});var t=window.location.hash;t&&this.swapper.open(t.replace("#",""))}else this.swapper instanceof a&&this.swapper.destroy()}}]),t}();e.exports=f},{"./helpers/PageFetcher":2,"./helpers/isTablet":5,"./helpers/swapper":6,animejs:8}],2:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();t("whatwg-fetch");var o=t("./isFunction"),a=function(){function t(e){var n=e.root,i=e.fetchSelector,o=void 0===i?"#root":i,a=e.dataAttr,s=void 0===a?"fetch-me":a,u=e.beforeChange,c=e.afterChange;r(this,t),this.root=n,this.fetchSelector=o,this.dataAttr=s,this.beforeChange=u,this.afterChange=c,this.init()}return i(t,[{key:"init",value:function(){this.addListeners()}},{key:"addListeners",value:function(){var t=this;window.addEventListener("popstate",this.handlePopState.bind(this)),document.body.addEventListener("click",function(e){null!==e.target.getAttribute("data-"+t.dataAttr)&&t.handleLinkClick(e)})}},{key:"loadPage",value:function(t){var e=this;return fetch(t).then(function(t){return t.text()}).then(function(t){return(new window.DOMParser).parseFromString(t,"text/html")}).then(function(t){e.root.innerHTML=t.querySelector(e.fetchSelector).innerHTML}).catch(function(e){console.error(e),window.location=t})}},{key:"beforePageChange",value:function(t,e){o(this.beforeChange)?this.beforeChange(t,e):o(e)&&e()}},{key:"afterPageChange",value:function(t,e){o(this.beforeChange)?this.afterChange(t,e):o(e)&&e()}},{key:"handlePopState",value:function(t){var e=this;t.state&&t.state.page&&t.state.page.indexOf("#")==-1&&!function(){var n=t.state.page;e.beforePageChange(n,function(){e.loadPage(n).then(function(){e.afterPageChange(n)})})}()}},{key:"handleLinkClick",value:function(t){var e=this;t.preventDefault();var n=t.target.href;n!==window.location.href&&this.beforePageChange(n,function(){history.pushState({page:n||"/"},n,n),e.loadPage(n).then(function(){e.afterPageChange(n)})})}}]),t}();e.exports=a},{"./isFunction":4,"whatwg-fetch":9}],3:[function(t,e,n){"use strict";var r=function(t,e){var n,r=t.length;for(n=0;n<r;n++)e(t[n])};e.exports=r},{}],4:[function(t,e,n){"use strict";var r=function(t){return"function"==typeof t};e.exports=r},{}],5:[function(t,e,n){"use strict";e.exports=function(){return window.matchMedia("(min-width: 768px)").matches}},{}],6:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=t("./forEach"),a=function(){function t(e){var n=this,i=e.items,a=e.navItems,s=e.itemsContainer,u=e.beforeOpen,c=void 0===u?function(t,e,n){return n()}:u,f=e.afterOpen,l=void 0===f?function(){return null}:f,h=e.activeNavItemClass,d=void 0===h?"swapper-nav-item--is-active":h,p=e.activeItemClass,v=void 0===p?"swapper-item--is-active":p,y=e.activeContainerClass,m=void 0===y?"swapper-container--is-init":y,b=e.openContainerClass,g=void 0===b?"swapper-container--is-open":b,w=e.closedContainerClass,C=void 0===w?"swapper-container--is-closed":w,x=e.bodyClass,k=void 0===x?"has-swapper":x,I=e.openBodyClass,B=void 0===I?"swapper--is-open":I,A=e.closedBodyClass,E=void 0===A?"swapper--is-closed":A;r(this,t),this.navItems=document.querySelectorAll(a),this.items=document.querySelectorAll(i),this.container=document.querySelector(s),this.beforeOpen=c,this.afterOpen=l,this.activeNavItemClass=d,this.activeItemClass=v,this.activeContainerClass=m,this.openContainerClass=g,this.closedContainerClass=C,this.openBodyClass=B,this.closedBodyClass=E,this.bodyClass=k,this.closeBtn=document.querySelector(".controls__btn--close"),this.prevBtn=document.querySelector(".controls__btn--prev"),this.nextBtn=document.querySelector(".controls__btn--next"),this.id=null,this.activeIdIndex=0,this.ids=[],o(this.items,function(t){return n.ids.push(t.id)}),this.handleNavItemClick=this.handleNavItemClick.bind(this),this.handleCloseBtnClick=this.handleCloseBtnClick.bind(this),this.handleNextBtnClick=this.handleNextBtnClick.bind(this),this.handlePrevBtnClick=this.handlePrevBtnClick.bind(this),this.init()}return i(t,[{key:"init",value:function(){this.close(),this.addListeners(),this.container.classList.add(this.activeContainerClass),document.body.classList.add(this.bodyClass)}},{key:"destroy",value:function(){this.removeListeners(),this.close(),document.body.classList.remove(this.bodyClass)}},{key:"addListeners",value:function(){var t=this;o(this.navItems,function(e){e.addEventListener("click",t.handleNavItemClick)}),this.closeBtn.addEventListener("click",this.handleCloseBtnClick),this.prevBtn.addEventListener("click",this.handlePrevBtnClick),this.nextBtn.addEventListener("click",this.handleNextBtnClick)}},{key:"removeListeners",value:function(){var t=this;o(this.navItems,function(e){e.removeEventListener("click",t.handleNavItemClick)}),this.closeBtn.removeEventListener("click",this.handleCloseBtnClick),this.prevBtn.removeEventListener("click",this.handlePrevBtnClick),this.nextBtn.removeEventListener("click",this.handleNextBtnClick)}},{key:"handleCloseBtnClick",value:function(){this.close()}},{key:"handlePrevBtnClick",value:function(){this.prev()}},{key:"handleNextBtnClick",value:function(){this.next()}},{key:"handleNavItemClick",value:function(t){t.preventDefault();var e=t.currentTarget,n=e.getAttribute("href"),r=n.replace("#","");this.open(r)}},{key:"open",value:function(t){var e=this;if(t&&t!==this.id){var n=this.isIdNext(t);this.beforeOpen(t,n,function(){e.setActiveId(t),e.close();var r=document.getElementById(t);r.classList.add(e.activeItemClass),e.addActiveNavItemClass(t),e.container.classList.add(e.openContainerClass),e.container.classList.remove(e.closedContainerClass),document.body.classList.add(e.openBodyClass),e.afterOpen(t,n)})}}},{key:"getActiveNavItem",value:function(){return document.querySelector("."+this.activeNavItemClass)}},{key:"getActiveItem",value:function(){return this.container.querySelector("."+this.activeItemClass)}},{key:"close",value:function(){var t=this.getActiveItem();t&&t.classList.remove(this.activeItemClass),document.body.classList.remove(this.openBodyClass),this.removeActiveNavItemClass()}},{key:"addActiveNavItemClass",value:function(t){var e=document.querySelector('[href="#'+t+'"]');this.removeActiveNavItemClass(),e.classList.add(this.activeNavItemClass)}},{key:"removeActiveNavItemClass",value:function(){var t=this.getActiveNavItem();t&&t.classList.remove(this.activeNavItemClass)}},{key:"setActiveId",value:function(t){this.activeIdIndex=this.ids.indexOf(t),this.id=t}},{key:"isIdNext",value:function(t){var e=this.ids.indexOf(t);return e>this.activeIdIndex}},{key:"next",value:function(){var t=this.ids[this.activeIdIndex+1];if(t)return this.open(t);var e=this.items[0].id;this.open(e)}},{key:"prev",value:function(){var t=this.ids[this.activeIdIndex-1];if(t)return this.open(t);var e=this.items[this.items.length-1];this.open(e.id)}}]),t}();e.exports=a},{"./forEach":3}],7:[function(t,e,n){"use strict";var r=document.documentElement;r.classList.add("js"),r.classList.remove("no-js");var i=t("./App");new i},{"./App":1}],8:[function(t,e,n){!function(t,n){"function"==typeof define&&define.amd?define([],n):"object"==typeof e&&e.exports?e.exports=n():t.anime=n()}(this,function(){var t,e="1.1.1",n={duration:1e3,delay:0,loop:!1,autoplay:!0,direction:"normal",easing:"easeOutElastic",elasticity:400,round:!1,begin:void 0,update:void 0,complete:void 0},r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skewX","skewY"],i="transform",o={arr:function(t){return Array.isArray(t)},obj:function(t){return Object.prototype.toString.call(t).indexOf("Object")>-1},svg:function(t){return t instanceof SVGElement},dom:function(t){return t.nodeType||o.svg(t)},num:function(t){return!isNaN(parseInt(t))},str:function(t){return"string"==typeof t},fnc:function(t){return"function"==typeof t},und:function(t){return"undefined"==typeof t},nul:function(t){return"null"==typeof t},hex:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)},rgb:function(t){return/^rgb/.test(t)},hsl:function(t){return/^hsl/.test(t)},col:function(t){return o.hex(t)||o.rgb(t)||o.hsl(t)}},a=function(){var t={},e=["Quad","Cubic","Quart","Quint","Expo"],n={Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t,e){if(0===t||1===t)return t;var n=1-Math.min(e,998)/1e3,r=t/1,i=r-1,o=n/(2*Math.PI)*Math.asin(1);return-(Math.pow(2,10*i)*Math.sin((i-o)*(2*Math.PI)/n))},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}};return e.forEach(function(t,e){n[t]=function(t){return Math.pow(t,e+2)}}),Object.keys(n).forEach(function(e){var r=n[e];t["easeIn"+e]=r,t["easeOut"+e]=function(t,e){return 1-r(1-t,e)},t["easeInOut"+e]=function(t,e){return t<.5?r(2*t,e)/2:1-r(t*-2+2,e)/2},t["easeOutIn"+e]=function(t,e){return t<.5?(1-r(1-2*t,e))/2:(r(2*t-1,e)+1)/2}}),t.linear=function(t){return t},t}(),s=function(t){return o.str(t)?t:t+""},u=function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},c=function(t){if(o.col(t))return!1;try{var e=document.querySelectorAll(t);return e}catch(t){return!1}},f=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},l=function(t){return t.reduce(function(t,e){return t.concat(o.arr(e)?l(e):e)},[])},h=function(t){return o.arr(t)?t:(o.str(t)&&(t=c(t)||t),t instanceof NodeList||t instanceof HTMLCollection?[].slice.call(t):[t])},d=function(t,e){return t.some(function(t){return t===e})},p=function(t,e){var n={};return t.forEach(function(t){var r=JSON.stringify(e.map(function(e){return t[e]}));n[r]=n[r]||[],n[r].push(t)}),Object.keys(n).map(function(t){return n[t]})},v=function(t){return t.filter(function(t,e,n){return n.indexOf(t)===e})},y=function(t){var e={};for(var n in t)e[n]=t[n];return e},m=function(t,e){for(var n in e)t[n]=o.und(t[n])?e[n]:t[n];return t},b=function(t){var e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,t=t.replace(e,function(t,e,n,r){return e+e+n+n+r+r}),n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),r=parseInt(n[1],16),i=parseInt(n[2],16),o=parseInt(n[3],16);return"rgb("+r+","+i+","+o+")"},g=function(t){var e,n,r,t=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t),i=parseInt(t[1])/360,o=parseInt(t[2])/100,a=parseInt(t[3])/100,s=function(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t};if(0==o)e=n=r=a;else{var u=a<.5?a*(1+o):a+o-a*o,c=2*a-u;e=s(c,u,i+1/3),n=s(c,u,i),r=s(c,u,i-1/3)}return"rgb("+255*e+","+255*n+","+255*r+")"},w=function(t){return o.rgb(t)?t:o.hex(t)?b(t):o.hsl(t)?g(t):void 0},C=function(t){return/([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(t)[2]},x=function(t,e,n){return C(e)?e:t.indexOf("translate")>-1?C(n)?e+C(n):e+"px":t.indexOf("rotate")>-1||t.indexOf("skew")>-1?e+"deg":e},k=function(t,e){if(e in t.style)return getComputedStyle(t).getPropertyValue(u(e))||"0"},I=function(t,e){var n=e.indexOf("scale")>-1?1:0,r=t.style.transform;if(!r)return n;for(var i=/(\w+)\((.+?)\)/g,o=[],a=[],s=[];o=i.exec(r);)a.push(o[1]),s.push(o[2]);var u=s.filter(function(t,n){return a[n]===e});return u.length?u[0]:n},B=function(t,e){return o.dom(t)&&d(r,e)?"transform":o.dom(t)&&(t.getAttribute(e)||o.svg(t)&&t[e])?"attribute":o.dom(t)&&"transform"!==e&&k(t,e)?"css":o.nul(t[e])||o.und(t[e])?void 0:"object"},A=function(t,e){switch(B(t,e)){case"transform":return I(t,e);case"css":return k(t,e);case"attribute":return t.getAttribute(e)}return t[e]||0},E=function(t,e,n){if(o.col(e))return w(e);if(C(e))return e;var r=C(C(t.to)?t.to:t.from);return!r&&n&&(r=C(n)),r?e+r:e},P=function(t){var e=/-?\d*\.?\d+/g;return{original:t,numbers:s(t).match(e)?s(t).match(e).map(Number):[0],strings:s(t).split(e)}},O=function(t,e,n){return e.reduce(function(e,r,i){var r=r?r:n[i-1];return e+t[i-1]+r})},L=function(t){var t=t?l(o.arr(t)?t.map(h):h(t)):[];return t.map(function(t,e){return{target:t,id:e}})},T=function(t,e){var r=[];for(var i in t)if(!n.hasOwnProperty(i)&&"targets"!==i){var a=o.obj(t[i])?y(t[i]):{value:t[i]};a.name=i,r.push(m(a,e))}return r},_=function(t,e,n,r){var i=h(o.fnc(n)?n(t,r):n);return{from:i.length>1?i[0]:A(t,e),to:i.length>1?i[1]:i[0]}},S=function(t,e,n,r){var i={};if("transform"===n)i.from=t+"("+x(t,e.from,e.to)+")",i.to=t+"("+x(t,e.to)+")";else{var o="css"===n?k(r,t):void 0;i.from=E(e,e.from,o),i.to=E(e,e.to,o)}return{from:P(i.from),to:P(i.to)}},N=function(t,e){var n=[];return t.forEach(function(r,i){var a=r.target;return e.forEach(function(e){var s=B(a,e.name);if(s){var u=_(a,e.name,e.value,i),c=y(e);c.animatables=r,c.type=s,c.from=S(e.name,u,c.type,a).from,c.to=S(e.name,u,c.type,a).to,c.round=o.col(u.from)||c.round?1:0,c.delay=(o.fnc(c.delay)?c.delay(a,i,t.length):c.delay)/Q.speed,c.duration=(o.fnc(c.duration)?c.duration(a,i,t.length):c.duration)/Q.speed,n.push(c)}})}),n},j=function(t,e){var n=N(t,e),r=p(n,["name","from","to","delay","duration"]);return r.map(function(t){var e=y(t[0]);return e.animatables=t.map(function(t){return t.animatables}),e.totalDuration=e.delay+e.duration,e})},M=function(t,e){t.tweens.forEach(function(n){var r=n.to,i=n.from,o=t.duration-(n.delay+n.duration);n.from=r,n.to=i,e&&(n.delay=o)}),t.reversed=!t.reversed},F=function(t){if(t.length)return Math.max.apply(Math,t.map(function(t){return t.totalDuration}))},U=function(t){var e=[],n=[];return t.tweens.forEach(function(t){"css"!==t.type&&"transform"!==t.type||(e.push("css"===t.type?u(t.name):"transform"),t.animatables.forEach(function(t){n.push(t.target)}))}),{properties:v(e).join(", "),elements:v(n)}},q=function(t){var e=U(t);e.elements.forEach(function(t){t.style.willChange=e.properties})},D=function(t){var e=U(t);e.elements.forEach(function(t){t.style.removeProperty("will-change")})},R=function(t){var e=o.str(t)?c(t)[0]:t;return{path:e,value:e.getTotalLength()}},H=function(t,e){var n=t.path,r=t.value*e,i=function(i){var o=i||0,a=e>1?t.value+o:r+o;return n.getPointAtLength(a)},o=i(),a=i(-1),s=i(1);switch(t.name){case"translateX":return o.x;case"translateY":return o.y;case"rotate":return 180*Math.atan2(s.y-a.y,s.x-a.x)/Math.PI}},Y=function(t,e){var n=Math.min(Math.max(e-t.delay,0),t.duration),r=n/t.duration,i=t.to.numbers.map(function(e,n){var i=t.from.numbers[n],o=a[t.easing](r,t.elasticity),s=t.path?H(t,o):i+o*(e-i);return s=t.round?Math.round(s*t.round)/t.round:s});return O(i,t.to.strings,t.from.strings)},V=function(e,n){var r;e.currentTime=n,e.progress=n/e.duration*100;for(var o=0;o<e.tweens.length;o++){var a=e.tweens[o];a.currentValue=Y(a,n);for(var s=a.currentValue,u=0;u<a.animatables.length;u++){var c=a.animatables[u],f=c.id,l=c.target,h=a.name;switch(a.type){case"css":l.style[h]=s;break;case"attribute":l.setAttribute(h,s);break;case"object":l[h]=s;break;case"transform":r||(r={}),r[f]||(r[f]=[]),r[f].push(s)}}}if(r){t||(t=(k(document.body,i)?"":"-webkit-")+i);for(var o in r)e.animatables[o].target.style[t]=r[o].join(" ")}e.settings.update&&e.settings.update(e)},X=function(t){var e={};return e.animatables=L(t.targets),e.settings=m(t,n),e.properties=T(t,e.settings),e.tweens=j(e.animatables,e.properties),e.duration=F(e.tweens)||t.duration,e.currentTime=0,e.progress=0,e.ended=!1,e},$=[],G=0,Z=function(){var t=function(){G=requestAnimationFrame(e)},e=function(e){if($.length){for(var n=0;n<$.length;n++)$[n].tick(e);t()}else cancelAnimationFrame(G),G=0};return t}(),Q=function(t){var e=X(t),n={};return e.tick=function(t){e.ended=!1,n.start||(n.start=t),n.current=Math.min(Math.max(n.last+t-n.start,0),e.duration),V(e,n.current);var r=e.settings;r.begin&&n.current>=r.delay&&(r.begin(e),r.begin=void 0),n.current>=e.duration&&(r.loop?(n.start=t,"alternate"===r.direction&&M(e,!0),o.num(r.loop)&&r.loop--):(e.ended=!0,e.pause(),r.complete&&r.complete(e)),n.last=0)},e.seek=function(t){V(e,t/100*e.duration)},e.pause=function(){D(e);var t=$.indexOf(e);t>-1&&$.splice(t,1)},e.play=function(t){e.pause(),t&&(e=m(X(m(t,e.settings)),e)),n.start=0,n.last=e.ended?0:e.currentTime;var r=e.settings;"reverse"===r.direction&&M(e),"alternate"!==r.direction||r.loop||(r.loop=1),q(e),$.push(e),G||Z()},e.restart=function(){e.reversed&&M(e),e.pause(),e.seek(0),e.play()},e.settings.autoplay&&e.play(),e},z=function(t){for(var e=l(o.arr(t)?t.map(h):h(t)),n=$.length-1;n>=0;n--)for(var r=$[n],i=r.tweens,a=i.length-1;a>=0;a--)for(var s=i[a].animatables,u=s.length-1;u>=0;u--)d(e,s[u].target)&&(s.splice(u,1),s.length||i.splice(a,1),i.length||r.pause())};return Q.version=e,Q.speed=1,Q.list=$,Q.remove=z,Q.easings=a,Q.getValue=A,Q.path=R,Q.random=f,Q})},{}],9:[function(t,e,n){!function(t){"use strict";function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function n(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return m.iterable&&(e[Symbol.iterator]=function(){return e}),e}function i(t){this.map={},t instanceof i?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function o(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function a(t){return new Promise(function(e,n){t.onload=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function s(t){var e=new FileReader,n=a(e);return e.readAsArrayBuffer(t),n}function u(t){var e=new FileReader,n=a(e);return e.readAsText(t),n}function c(t){for(var e=new Uint8Array(t),n=new Array(e.length),r=0;r<e.length;r++)n[r]=String.fromCharCode(e[r]);return n.join("")}function f(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(m.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(m.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(m.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(m.arrayBuffer&&m.blob&&g(t))this._bodyArrayBuffer=f(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!m.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!w(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=f(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):m.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},m.blob&&(this.blob=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?o(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(s)}),this.text=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(c(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},m.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function h(t){var e=t.toUpperCase();return C.indexOf(e)>-1?e:t}function d(t,e){e=e||{};var n=e.body;if("string"==typeof t)this.url=t;else{if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new i(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new i(e.headers)),this.method=h(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var n=t.split("="),r=n.shift().replace(/\+/g," "),i=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(i))}}),e}function v(t){var e=new i;return t.split("\r\n").forEach(function(t){var n=t.split(":"),r=n.shift().trim();if(r){var i=n.join(":").trim();e.append(r,i)}}),e}function y(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new i(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var m={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(m.arrayBuffer)var b=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],g=function(t){return t&&DataView.prototype.isPrototypeOf(t)},w=ArrayBuffer.isView||function(t){return t&&b.indexOf(Object.prototype.toString.call(t))>-1};i.prototype.append=function(t,r){t=e(t),r=n(r);var i=this.map[t];this.map[t]=i?i+","+r:r},i.prototype.delete=function(t){delete this.map[e(t)]},i.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},i.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},i.prototype.set=function(t,r){this.map[e(t)]=n(r)},i.prototype.forEach=function(t,e){for(var n in this.map)this.map.hasOwnProperty(n)&&t.call(e,this.map[n],n,this)},i.prototype.keys=function(){var t=[];return this.forEach(function(e,n){t.push(n)}),r(t)},i.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),r(t)},i.prototype.entries=function(){var t=[];return this.forEach(function(e,n){t.push([n,e])}),r(t)},m.iterable&&(i.prototype[Symbol.iterator]=i.prototype.entries);var C=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this,{body:this._bodyInit})},l.call(d.prototype),l.call(y.prototype),y.prototype.clone=function(){return new y(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new i(this.headers),url:this.url})},y.error=function(){var t=new y(null,{status:0,statusText:""});return t.type="error",t};var x=[301,302,303,307,308];y.redirect=function(t,e){if(x.indexOf(e)===-1)throw new RangeError("Invalid status code");return new y(null,{status:e,headers:{location:t}})},t.Headers=i,t.Request=d,t.Response=y,t.fetch=function(t,e){return new Promise(function(n,r){var i=new d(t,e),o=new XMLHttpRequest;o.onload=function(){var t={status:o.status,statusText:o.statusText,headers:v(o.getAllResponseHeaders()||"")};t.url="responseURL"in o?o.responseURL:t.headers.get("X-Request-URL");var e="response"in o?o.response:o.responseText;n(new y(e,t))},o.onerror=function(){r(new TypeError("Network request failed"))},o.ontimeout=function(){r(new TypeError("Network request failed"))},o.open(i.method,i.url,!0),"include"===i.credentials&&(o.withCredentials=!0),"responseType"in o&&m.blob&&(o.responseType="blob"),i.headers.forEach(function(t,e){o.setRequestHeader(e,t)}),o.send("undefined"==typeof i._bodyInit?null:i._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)},{}]},{},[7]);
//# sourceMappingURL=bundle.js.map
