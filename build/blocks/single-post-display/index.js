(()=>{"use strict";var e={20:(e,t,a)=>{var s=a(609),o=Symbol.for("react.element"),r=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n={key:!0,ref:!0,__self:!0,__source:!0};t.jsx=function(e,t,a){var s,i={},c=null,p=null;for(s in void 0!==a&&(c=""+a),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(p=t.ref),t)r.call(t,s)&&!n.hasOwnProperty(s)&&(i[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps)void 0===i[s]&&(i[s]=t[s]);return{$$typeof:o,type:e,key:c,ref:p,props:i,_owner:l.current}}},848:(e,t,a)=>{e.exports=a(20)},609:e=>{e.exports=window.React}},t={};function a(s){var o=t[s];if(void 0!==o)return o.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,a),r.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);const s=window.wp.blocks,o=window.wp.i18n,r=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"smfcs/single-post-display","version":"1.0.0","title":"Single Post Display","category":"widgets","icon":"welcome-widgets-menus","description":"Display a single post with customizable elements","supports":{"html":false,"align":["wide","full"]},"textdomain":"smart-flashcards","editorScript":"file:../../../build/blocks/single-post-display/index.js","editorStyle":"file:../../../build/blocks/single-post-display/editor.css","style":"file:../../../build/blocks/single-post-display/style.css","attributes":{"postId":{"type":"number","default":0},"postType":{"type":"string","default":"post"},"showTitle":{"type":"boolean","default":true},"showContent":{"type":"boolean","default":true},"showExcerpt":{"type":"boolean","default":false},"showFeaturedImage":{"type":"boolean","default":true},"showMeta":{"type":"boolean","default":true},"showDate":{"type":"boolean","default":true},"showAuthor":{"type":"boolean","default":true},"imageSize":{"type":"string","default":"large"},"timestamp":{"type":"number","default":0}}}');var l=a(609);const n=window.wp.blockEditor,i=window.wp.components,c=window.wp.element,p=window.wp.data,d=window.wp.apiFetch;var h=a.n(d);const m=window.wp.serverSideRender;var u=a.n(m);const w=window.wp.primitives;var f=a(848);const _=(0,f.jsx)(w.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,f.jsx)(w.Path,{d:"m7.3 9.7 1.4 1.4c.2-.2.3-.3.4-.5 0 0 0-.1.1-.1.3-.5.4-1.1.3-1.6L12 7 9 4 7.2 6.5c-.6-.1-1.1 0-1.6.3 0 0-.1 0-.1.1-.3.1-.4.2-.6.4l1.4 1.4L4 11v1h1l2.3-2.3zM4 20h9v-1.5H4V20zm0-5.5V16h16v-1.5H4z"})}),g=window.lodash;(0,s.registerBlockType)(r.name,{...r,edit:({attributes:e,setAttributes:t})=>{const a=(0,n.useBlockProps)(),[s,r]=(0,c.useState)([]),[d,m]=(0,c.useState)(!1),[w,f]=(0,c.useState)(""),[b,y]=(0,c.useState)(""),[E,v]=(0,c.useState)([]),S=(0,p.useSelect)((e=>{const{getPostTypes:t}=e("core");return(t()||[]).filter((e=>e.viewable&&e.rest_base)).map((e=>({label:e.labels.singular_name,value:e.slug,restBase:e.rest_base})))}),[]);(0,c.useEffect)((()=>{e.postType?(m(!0),f(""),h()({path:"/wp/v2/types",method:"GET"}).then((t=>{const a=t[e.postType];if(!a||!a.rest_base)return f((0,o.__)("Invalid post type selected.","smart-flashcards")),void m(!1);h()({path:`/wp/v2/${a.rest_base}?per_page=20&_fields=id,title,author&orderby=date&order=desc`,method:"GET"}).then((t=>{if(Array.isArray(t)&&t.length>0){const s=t.map((e=>({label:e.title.rendered||`Post #${e.id}`,value:e.id.toString()})));r(s),e.postId&&!s.find((t=>t.value===e.postId.toString()))&&h()({path:`/wp/v2/${a.rest_base}/${e.postId}`,method:"GET"}).then((e=>{e&&r([{label:e.title.rendered||`Post #${e.id}`,value:e.id.toString()},...s])}))}m(!1)}))})).catch((e=>{console.error("Error fetching posts:",e),f((0,o.__)("Error fetching posts.","smart-flashcards")),m(!1)}))):r([])}),[e.postType]);const T=(0,c.useCallback)((0,g.debounce)((async t=>{if(e.postType&&t)try{const a=(await h()({path:"/wp/v2/types",method:"GET"}))[e.postType];if(!a||!a.rest_base)return;const s=await h()({path:`/wp/v2/${a.rest_base}?search=${encodeURIComponent(t)}&per_page=20&_fields=id,title`,method:"GET"});if(Array.isArray(s)){const e=s.map((e=>({label:e.title.rendered||`Post #${e.id}`,value:e.id.toString()})));v(e)}}catch(e){console.error("Error searching posts:",e)}else v([])}),300),[e.postType]),C=[{label:(0,o.__)("Thumbnail","smart-flashcards"),value:"thumbnail"},{label:(0,o.__)("Medium","smart-flashcards"),value:"medium"},{label:(0,o.__)("Large","smart-flashcards"),value:"large"},{label:(0,o.__)("Full","smart-flashcards"),value:"full"}];return(0,l.createElement)("div",{...a},(0,l.createElement)(n.InspectorControls,null,(0,l.createElement)(i.PanelBody,{title:(0,o.__)("Post Selection","smart-flashcards"),initialOpen:!0},(0,l.createElement)(i.SelectControl,{label:(0,o.__)("Post Type","smart-flashcards"),value:e.postType,options:[{label:(0,o.__)("Select a post type","smart-flashcards"),value:""},...S],onChange:e=>{t({postType:e,postId:0}),y(""),v([])}}),w&&(0,l.createElement)(i.Notice,{status:"error",isDismissible:!1},w),d?(0,l.createElement)(i.Spinner,null):(0,l.createElement)(i.ComboboxControl,{label:(0,o.__)("Search and Select Post","smart-flashcards"),value:e.postId?e.postId.toString():"",options:b?E:s,onFilterValueChange:e=>{y(e),e&&T(e)},onChange:e=>{t({postId:parseInt(e,10),timestamp:Date.now()})},allowReset:!0,help:(0,o.__)("Type to search posts or select from recent posts","smart-flashcards")})),(0,l.createElement)(i.PanelBody,{title:(0,o.__)("Display Options","smart-flashcards"),initialOpen:!0},(0,l.createElement)(i.ToggleControl,{label:(0,o.__)("Show Title","smart-flashcards"),checked:e.showTitle,onChange:e=>t({showTitle:e})}),(0,l.createElement)(i.ToggleControl,{label:(0,o.__)("Show Content","smart-flashcards"),checked:e.showContent,onChange:e=>t({showContent:e})}),(0,l.createElement)(i.ToggleControl,{label:(0,o.__)("Show Excerpt","smart-flashcards"),checked:e.showExcerpt,onChange:e=>t({showExcerpt:e})}),(0,l.createElement)(i.ToggleControl,{label:(0,o.__)("Show Featured Image","smart-flashcards"),checked:e.showFeaturedImage,onChange:e=>t({showFeaturedImage:e})}),e.showFeaturedImage&&(0,l.createElement)(i.SelectControl,{label:(0,o.__)("Image Size","smart-flashcards"),value:e.imageSize,options:C,onChange:e=>t({imageSize:e})}),(0,l.createElement)(i.ToggleControl,{label:(0,o.__)("Show Meta Information","smart-flashcards"),checked:e.showMeta,onChange:e=>t({showMeta:e})}),e.showMeta&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)(i.ToggleControl,{label:(0,o.__)("Show Date","smart-flashcards"),checked:e.showDate,onChange:e=>t({showDate:e})}),(0,l.createElement)(i.ToggleControl,{label:(0,o.__)("Show Author","smart-flashcards"),checked:e.showAuthor,onChange:e=>t({showAuthor:e})})))),e.postId?(0,l.createElement)(u(),{block:"smfcs/single-post-display",attributes:e,skipBlockSupportAttributes:!0,EmptyResponsePlaceholder:()=>(0,l.createElement)(i.Placeholder,{icon:(0,l.createElement)(i.Icon,{icon:_}),label:(0,o.__)("Single Post Display","smart-flashcards"),instructions:(0,o.__)("Loading post content...","smart-flashcards")},(0,l.createElement)(i.Spinner,null)),ErrorResponsePlaceholder:({response:e})=>(0,l.createElement)(i.Placeholder,{icon:(0,l.createElement)(i.Icon,{icon:_}),label:(0,o.__)("Error","smart-flashcards"),instructions:e?.message||(0,o.__)("Error loading post content. Please try again.","smart-flashcards")})}):(0,l.createElement)(i.Placeholder,{icon:(0,l.createElement)(i.Icon,{icon:_}),label:(0,o.__)("Single Post Display","smart-flashcards"),instructions:(0,o.__)("Select a post type and post to display","smart-flashcards")}))},save:()=>null})})();