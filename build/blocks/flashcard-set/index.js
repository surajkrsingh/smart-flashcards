(()=>{"use strict";var e={20:(e,a,t)=>{var s=t(609),l=Symbol.for("react.element"),r=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),n=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};a.jsx=function(e,a,t){var s,o={},i=null,d=null;for(s in void 0!==t&&(i=""+t),void 0!==a.key&&(i=""+a.key),void 0!==a.ref&&(d=a.ref),a)r.call(a,s)&&!c.hasOwnProperty(s)&&(o[s]=a[s]);if(e&&e.defaultProps)for(s in a=e.defaultProps)void 0===o[s]&&(o[s]=a[s]);return{$$typeof:l,type:e,key:i,ref:d,props:o,_owner:n.current}}},848:(e,a,t)=>{e.exports=t(20)},609:e=>{e.exports=window.React}},a={};function t(s){var l=a[s];if(void 0!==l)return l.exports;var r=a[s]={exports:{}};return e[s](r,r.exports,t),r.exports}const s=window.wp.blocks,l=window.wp.i18n,r=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"smfcs/flashcard-set","version":"0.1.0","title":"Flashcard Set","category":"widgets","icon":"slides","description":"Create a set of flashcards with navigation","attributes":{"currentSlide":{"type":"number","default":0},"displayMode":{"type":"string","default":"slide","enum":["slide","stack"]},"enableShuffle":{"type":"boolean","default":false}},"supports":{"align":["wide","full"],"html":false},"textdomain":"smart-flashcards","editorScript":"file:../../../build/blocks/flashcard-set/index.js"}');var n=t(609);const c=window.wp.blockEditor,o=window.wp.components,i=window.wp.element,d=window.wp.data,f="smfcs",m={FLASHCARD_SET:`${f}/flashcard-set`,FLASHCARD:`${f}/flashcard`,FLASHCARD_FRONT:`${f}/flashcard-front`,FLASHCARD_BACK:`${f}/flashcard-back`},u=[m.FLASHCARD],h=[[m.FLASHCARD]],p=window.wp.primitives;var v=t(848);const _=(0,v.jsx)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,v.jsx)(p.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z"})}),b=(0,v.jsx)(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,v.jsx)(p.Path,{d:"M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"})});(0,s.registerBlockType)(r.name,{...r,title:(0,l.__)("Flashcard Set","smart-flashcards"),description:(0,l.__)("Create a set of flashcards with carousel navigation","smart-flashcards"),edit:function({attributes:e,setAttributes:a,clientId:t}){const{currentSlide:s=0,displayMode:r,enableShuffle:f}=e,[m,p]=(0,i.useState)(!1),v=(0,c.useBlockProps)(),w=(0,i.useRef)(null),{innerBlocks:E}=(0,d.useSelect)((e=>({innerBlocks:e("core/block-editor").getBlocks(t)})),[t]),{removeBlock:k,insertBlock:y}=(0,d.useDispatch)("core/block-editor"),S=E?.length||0;(0,i.useEffect)((()=>{m||(0===S&&x(),p(!0))}),[m]),(0,i.useEffect)((()=>{m&&w.current&&w.current.querySelectorAll(".wp-block-smfcs-flashcard").forEach(((e,a)=>{a===s?(e.classList.add("is-active"),e.style.display="block"):(e.classList.remove("is-active"),e.style.display="none")}))}),[s,E,m]);const x=()=>{const e=wp.blocks.createBlock("smfcs/flashcard",{index:S+1});y(e,S,t)},B=e=>{a({currentSlide:e})};return(0,n.createElement)("div",{...v,ref:w},(0,n.createElement)(c.InspectorControls,null,(0,n.createElement)(o.PanelBody,{title:(0,l.__)("Flashcard Set Settings","smart-flashcards")},(0,n.createElement)(o.SelectControl,{label:(0,l.__)("Display Mode","smart-flashcards"),value:r,options:[{label:(0,l.__)("Slide","smart-flashcards"),value:"slide"},{label:(0,l.__)("Stack","smart-flashcards"),value:"stack"}],onChange:e=>a({displayMode:e})}),(0,n.createElement)(o.ToggleControl,{label:(0,l.__)("Enable Shuffle","smart-flashcards"),checked:f,onChange:e=>a({enableShuffle:e})}))),(0,n.createElement)("div",{className:"flashcard-set-nav"},(0,n.createElement)(o.ButtonGroup,null,(0,n.createElement)(o.Button,{icon:_,variant:"secondary",onClick:()=>{if(S>1){const e=E[s];e&&(k(e.clientId),B(Math.min(s,S-2)))}},disabled:S<=1,className:"remove-slide-button",isDestructive:!0}),(0,n.createElement)(o.Button,{variant:"secondary",onClick:()=>B(Math.max(0,s-1)),disabled:0===s},(0,l.__)("Previous","smart-flashcards")),(0,n.createElement)(o.Button,{variant:"secondary",className:"current-slide-indicator",disabled:!0},s+1," / ",S),(0,n.createElement)(o.Button,{variant:"secondary",onClick:()=>B(Math.min(S-1,s+1)),disabled:s===S-1},(0,l.__)("Next","smart-flashcards")),(0,n.createElement)(o.Button,{icon:b,variant:"primary",onClick:x,className:"add-slide-button"}))),(0,n.createElement)(c.InnerBlocks,{allowedBlocks:u,template:h,templateLock:!1}))},save:function({attributes:e}){const{displayMode:a,enableShuffle:t}=e,s=c.useBlockProps.save({"data-display-mode":a,"data-enable-shuffle":t});return(0,n.createElement)("div",{...s},(0,n.createElement)("div",{className:"flashcard-set-wrapper"},(0,n.createElement)("div",{className:"flashcard-set-slides"},(0,n.createElement)("div",{className:"flashcard-set-track"},(0,n.createElement)(c.InnerBlocks.Content,null))),(0,n.createElement)("div",{className:"flashcard-set-nav"},t&&(0,n.createElement)("button",{type:"button",className:"flashcard-shuffle-button","aria-label":(0,l.__)("Shuffle flashcards","smart-flashcards")},(0,n.createElement)("span",{className:"dashicons dashicons-randomize"}),(0,l.__)("Shuffle","smart-flashcards")),(0,n.createElement)("button",{type:"button",className:"flashcard-nav-button prev","aria-label":(0,l.__)("Previous flashcard","smart-flashcards")},(0,n.createElement)("span",{className:"dashicons dashicons-arrow-left-alt2"}),(0,l.__)("Previous","smart-flashcards")),(0,n.createElement)("span",{className:"flashcard-set-counter"},"1 / 1"),(0,n.createElement)("button",{type:"button",className:"flashcard-nav-button next","aria-label":(0,l.__)("Next flashcard","smart-flashcards")},(0,l.__)("Next","smart-flashcards"),(0,n.createElement)("span",{className:"dashicons dashicons-arrow-right-alt2"})))))}})})();