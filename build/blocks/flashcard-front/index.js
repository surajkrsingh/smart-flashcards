(()=>{"use strict";const e=window.wp.blocks,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"smfcs/flashcard-front","version":"0.1.0","title":"Flashcard Front","category":"widgets","parent":["smfcs/flashcard"],"icon":"card","description":"Front side of the flashcard","supports":{"html":false,"color":{"background":true,"text":true,"gradients":true},"spacing":{"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontStyle":true,"__experimentalFontWeight":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true}},"textdomain":"smart-flashcards","editorScript":"file:../../../build/blocks/flashcard-front/index.js"}'),r=window.React,a=window.wp.i18n,n=window.wp.blockEditor,o=["core/heading","core/paragraph","core/image","core/buttons","core/media-text","core/list","core/quote","core/code"],c=[["core/heading",{level:2,placeholder:(0,a.__)("Add front side title...","smart-flashcards")}],["core/paragraph",{placeholder:(0,a.__)("Add front side content...","smart-flashcards")}]];(0,e.registerBlockType)(t.name,{...t,edit:function(){const e=(0,n.useBlockProps)({className:"flashcard-front"});return(0,r.createElement)("div",{...e},(0,r.createElement)("div",{className:"flashcard-content"},(0,r.createElement)(n.InnerBlocks,{allowedBlocks:o,template:c,templateLock:!1})))},save:function(){const e=n.useBlockProps.save({className:"flashcard-front"});return(0,r.createElement)("div",{...e},(0,r.createElement)("div",{className:"flashcard-content"},(0,r.createElement)(n.InnerBlocks.Content,null)))}})})();