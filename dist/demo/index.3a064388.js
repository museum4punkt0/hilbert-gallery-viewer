function o(o){return o&&o.__esModule?o.default:o}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},e={},a=t.parcelRequire09b2;null==a&&((a=function(o){if(o in n)return n[o].exports;if(o in e){var t=e[o];delete e[o];var a={id:o,exports:{}};return n[o]=a,t.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+o+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(o,t){e[o]=t},t.parcelRequire09b2=a);var r=a("gKleK"),i=a("bymIz");async function l(o){await new Promise((t=>{setTimeout(t,1e3*o)}))}function c(){const o=[()=>({type:"none",options:{}}),()=>({type:"fade",options:{duration:1+5*Math.random(),color:"black"}}),()=>({type:"cross-fade",options:{duration:1+5*Math.random()}})];return o[Math.floor(Math.random()*o.length)]()}function s(){const o=[()=>({type:"none",options:{}}),()=>{const o=.25+.5*Math.random(),t=.25+.5*Math.random(),n=1/Math.min(o,1-o,t,1-t);return{type:"pan-zoom",options:{duration:1+30*Math.random(),to:{x:o,y:t,scale:n}}}}];return o[Math.floor(Math.random()*o.length)]()}function u(){const o=function(o){const t=[...o];for(let o=t.length;o>0;o-=1){const n=Math.floor(Math.random()*o),e=t[o-1];t[o-1]=t[n],t[n]=e}return t}([...Array.from({length:5},(()=>({mimetype:"image/jpeg",url:`https://placekitten.com/${300+Math.floor(100*Math.random())}/${300+Math.floor(100*Math.random())}`}))),{mimetype:"video/mp4",url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}]);return{oneShot:[{action:"preload",args:o.map((o=>({...o})))}],loop:o.map((o=>function(o){return{action:"show",args:{...o,fit:["contain","cover"][Math.floor(2*Math.random())],color:"black",transition:c(),animation:s()}}}({...o})))}}a("bN1H9");let d=!1;Object.assign(window,{stopPlayback:function(){d=!0}}),console.info("Call stopPlayback() to stop the default playlist (will finish the current playlist item)."),async function(){await new Promise(o(i));const t=document.querySelector("hilbert-gallery-viewer");(0,r.strict)(null!==t),Object.assign(window,{viewer:t}),console.info("Call viewer.execute(action, args) to execute your own actions.");const n=u();console.log(JSON.stringify(n,null,2),n),n.oneShot.forEach((({action:o,args:n})=>{t.execute(o,n).catch((o=>console.error(o)))}));for(let o=0;o<n.loop.length&&!d;o=(o+1)%n.loop.length){const{action:r,args:i}=n.loop[o];if(console.log({action:r,args:i}),await t.execute(r,i).catch((o=>console.error(o))),"show"===r){var e,a;const o=null!==(a=null==i||null===(e=i.animation)||void 0===e?void 0:e.duration)&&void 0!==a?a:0,t=o>5?1:1+5*Math.random();await l(o+t)}}}().catch((function(o){console.error("Uncaught error",o)}));
//# sourceMappingURL=index.3a064388.js.map