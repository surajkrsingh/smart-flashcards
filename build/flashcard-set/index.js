(()=>{"use strict";var e,a={61:(e,a,t)=>{const r=window.wp.blocks,s=window.wp.i18n,l=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"smfcs/flashcard-set","version":"0.1.0","title":"Flashcard Set","category":"widgets","icon":"slides","description":"Create a set of flashcards with navigation","attributes":{"currentSlide":{"type":"number","default":0}},"supports":{"align":["wide","full"],"html":false},"textdomain":"smart-flashcards","editorScript":"file:../../../build/flashcard-set/index.js","editorStyle":"file:../../../build/editor.css","style":"file:../../../build/style.css","viewScript":"file:../../../build/frontend.js"}');var n=t(609);const c=window.wp.blockEditor,o=window.wp.components,i=window.wp.data,d=window.wp.primitives;var f=t(848);const m=(0,f.jsx)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,f.jsx)(d.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z"})}),h=window.wp.element,u=["smfcs/flashcard"],p=[["smfcs/flashcard"]];(0,r.registerBlockType)(l.name,{...l,title:(0,s.__)("Flashcard Set","smart-flashcards"),description:(0,s.__)("Create a set of flashcards with carousel navigation","smart-flashcards"),edit:function({attributes:e,setAttributes:a,clientId:t}){const{currentSlide:r}=e,l=(0,c.useBlockProps)(),{innerBlocks:d}=(0,i.useSelect)((e=>({innerBlocks:e("core/block-editor").getBlocks(t)})),[t]),{removeBlock:f}=(0,i.useDispatch)("core/block-editor"),v=d?.length||0;return(0,h.useEffect)((()=>{document.querySelectorAll(`#block-${t} .wp-block-smfcs-flashcard`).forEach(((e,a)=>{e.style.display=a===r?"block":"none"}))}),[r,v,t]),(0,n.createElement)("div",{...l,id:`block-${t}`},(0,n.createElement)("div",{className:"flashcard-set-wrapper"},(0,n.createElement)("div",{className:"flashcard-set-controls"},(0,n.createElement)("div",{className:"flashcard-controls"},(0,n.createElement)(c.InnerBlocks.ButtonBlockAppender,null),v>1&&(0,n.createElement)(o.Tooltip,{text:(0,s.__)("Remove current flashcard","smart-flashcards")},(0,n.createElement)(o.Button,{variant:"secondary",icon:m,onClick:()=>{if(v>1){const e=d[r];f(e.clientId),a({currentSlide:Math.max(0,r-1)})}},className:"flashcard-remove-button"}))),(0,n.createElement)("div",{className:"flashcard-set-nav"},(0,n.createElement)(o.Button,{variant:"secondary",onClick:()=>{a({currentSlide:Math.max(0,r-1)})},disabled:0===r,icon:"arrow-left-alt2",className:"flashcard-nav-button prev"},(0,s.__)("Previous","smart-flashcards")),(0,n.createElement)("span",{className:"flashcard-set-counter"},(0,s.__)("Card","smart-flashcards")," ",r+1," / ",v),(0,n.createElement)(o.Button,{variant:"secondary",onClick:()=>{a({currentSlide:Math.min(v-1,r+1)})},disabled:r===v-1,icon:"arrow-right-alt2",iconPosition:"right",className:"flashcard-nav-button next"},(0,s.__)("Next","smart-flashcards")))),(0,n.createElement)("div",{className:"flashcard-set-slides"},(0,n.createElement)(c.InnerBlocks,{allowedBlocks:u,template:p,orientation:"horizontal",renderAppender:!1}))))},save:function(){const e=c.useBlockProps.save();return(0,n.createElement)("div",{...e},(0,n.createElement)("div",{className:"flashcard-set-wrapper"},(0,n.createElement)("div",{className:"flashcard-set-slides"},(0,n.createElement)("div",{className:"flashcard-set-track"},(0,n.createElement)(c.InnerBlocks.Content,null))),(0,n.createElement)("div",{className:"flashcard-set-nav"},(0,n.createElement)("button",{type:"button",className:"flashcard-nav-button prev","aria-label":(0,s.__)("Previous flashcard","smart-flashcards")},(0,n.createElement)("span",{className:"dashicons dashicons-arrow-left-alt2"}),(0,s.__)("Previous","smart-flashcards")),(0,n.createElement)("span",{className:"flashcard-set-counter"},"1 / 1"),(0,n.createElement)("button",{type:"button",className:"flashcard-nav-button next","aria-label":(0,s.__)("Next flashcard","smart-flashcards")},(0,s.__)("Next","smart-flashcards"),(0,n.createElement)("span",{className:"dashicons dashicons-arrow-right-alt2"})))))}})},20:(e,a,t)=>{var r=t(609),s=Symbol.for("react.element"),l=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),n=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};a.jsx=function(e,a,t){var r,o={},i=null,d=null;for(r in void 0!==t&&(i=""+t),void 0!==a.key&&(i=""+a.key),void 0!==a.ref&&(d=a.ref),a)l.call(a,r)&&!c.hasOwnProperty(r)&&(o[r]=a[r]);if(e&&e.defaultProps)for(r in a=e.defaultProps)void 0===o[r]&&(o[r]=a[r]);return{$$typeof:s,type:e,key:i,ref:d,props:o,_owner:n.current}}},848:(e,a,t)=>{e.exports=t(20)},609:e=>{e.exports=window.React}},t={};function r(e){var s=t[e];if(void 0!==s)return s.exports;var l=t[e]={exports:{}};return a[e](l,l.exports,r),l.exports}r.m=a,e=[],r.O=(a,t,s,l)=>{if(!t){var n=1/0;for(d=0;d<e.length;d++){for(var[t,s,l]=e[d],c=!0,o=0;o<t.length;o++)(!1&l||n>=l)&&Object.keys(r.O).every((e=>r.O[e](t[o])))?t.splice(o--,1):(c=!1,l<n&&(n=l));if(c){e.splice(d--,1);var i=s();void 0!==i&&(a=i)}}return a}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[t,s,l]},r.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),(()=>{var e={631:0,8:0};r.O.j=a=>0===e[a];var a=(a,t)=>{var s,l,[n,c,o]=t,i=0;if(n.some((a=>0!==e[a]))){for(s in c)r.o(c,s)&&(r.m[s]=c[s]);if(o)var d=o(r)}for(a&&a(t);i<n.length;i++)l=n[i],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(d)},t=globalThis.webpackChunksmart_flashcards=globalThis.webpackChunksmart_flashcards||[];t.forEach(a.bind(null,0)),t.push=a.bind(null,t.push.bind(t))})();var s=r.O(void 0,[8],(()=>r(61)));s=r.O(s)})();