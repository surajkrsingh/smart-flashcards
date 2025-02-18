(()=>{"use strict";const e=window.wp.blocks,a=window.wp.i18n,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"smfcs/flashcard-set","version":"0.1.0","title":"Flashcard Set","category":"widgets","icon":"slides","description":"Create a set of flashcards with navigation","attributes":{"currentSlide":{"type":"number","default":0}},"supports":{"align":["wide","full"],"html":false},"textdomain":"smart-flashcards","editorScript":"file:../../../build/blocks/flashcard-set/index.js"}'),s=window.React,r=window.wp.blockEditor,c=window.wp.components,l=window.wp.element,n=window.wp.data,o="smfcs",i={FLASHCARD_SET:`${o}/flashcard-set`,FLASHCARD:`${o}/flashcard`,FLASHCARD_FRONT:`${o}/flashcard-front`,FLASHCARD_BACK:`${o}/flashcard-back`},d=[i.FLASHCARD],m=[[i.FLASHCARD]];(0,e.registerBlockType)(t.name,{...t,title:(0,a.__)("Flashcard Set","smart-flashcards"),description:(0,a.__)("Create a set of flashcards with carousel navigation","smart-flashcards"),edit:function({attributes:e,setAttributes:t,clientId:o}){const{currentSlide:i=0}=e,[f,u]=(0,l.useState)(!1),h=(0,r.useBlockProps)(),p=(0,l.useRef)(null),{innerBlocks:w}=(0,n.useSelect)((e=>({innerBlocks:e("core/block-editor").getBlocks(o)})),[o]),{removeBlock:k,insertBlock:v}=(0,n.useDispatch)("core/block-editor"),b=w?.length||0;(0,l.useEffect)((()=>{f||(0===b&&E(),u(!0))}),[f]),(0,l.useEffect)((()=>{f&&p.current&&p.current.querySelectorAll(".wp-block-smfcs-flashcard").forEach(((e,a)=>{a===i?(e.classList.add("is-active"),e.style.display="block"):(e.classList.remove("is-active"),e.style.display="none")}))}),[i,w,f]);const E=()=>{const e=wp.blocks.createBlock("smfcs/flashcard",{index:b+1});v(e,b,o)},_=e=>{t({currentSlide:e})};return(0,s.createElement)("div",{...h,ref:p},(0,s.createElement)("div",{className:"flashcard-set-nav"},(0,s.createElement)(c.ButtonGroup,null,(0,s.createElement)(c.Button,{variant:"secondary",onClick:()=>_(Math.max(0,i-1)),disabled:0===i},(0,a.__)("Previous","smart-flashcards")),(0,s.createElement)(c.Button,{variant:"secondary",className:"current-slide-indicator",disabled:!0},i+1," / ",b),(0,s.createElement)(c.Button,{variant:"secondary",onClick:()=>_(Math.min(b-1,i+1)),disabled:i===b-1},(0,a.__)("Next","smart-flashcards")),(0,s.createElement)(c.Button,{variant:"primary",onClick:E,icon:"plus"},(0,a.__)("Add","smart-flashcards")))),(0,s.createElement)(r.InnerBlocks,{allowedBlocks:d,template:m,templateLock:!1}))},save:function(){const e=r.useBlockProps.save();return(0,s.createElement)("div",{...e},(0,s.createElement)("div",{className:"flashcard-set-wrapper"},(0,s.createElement)("div",{className:"flashcard-set-slides"},(0,s.createElement)("div",{className:"flashcard-set-track"},(0,s.createElement)(r.InnerBlocks.Content,null))),(0,s.createElement)("div",{className:"flashcard-set-nav"},(0,s.createElement)("button",{type:"button",className:"flashcard-nav-button prev","aria-label":(0,a.__)("Previous flashcard","smart-flashcards")},(0,s.createElement)("span",{className:"dashicons dashicons-arrow-left-alt2"}),(0,a.__)("Previous","smart-flashcards")),(0,s.createElement)("span",{className:"flashcard-set-counter"},"1 / 1"),(0,s.createElement)("button",{type:"button",className:"flashcard-nav-button next","aria-label":(0,a.__)("Next flashcard","smart-flashcards")},(0,a.__)("Next","smart-flashcards"),(0,s.createElement)("span",{className:"dashicons dashicons-arrow-right-alt2"})))))}})})();