(()=>{"use strict";const e=window.wp.blocks,t=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"smfcs/flashcard-back","version":"0.1.0","title":"Flashcard Back","category":"widgets","parent":["smfcs/flashcard"],"icon":"card","description":"Back side of the flashcard","supports":{"html":false,"color":{"background":true,"text":true,"gradients":true},"spacing":{"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontStyle":true,"__experimentalFontWeight":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true}},"textdomain":"smart-flashcards","editorScript":"file:../../../build/blocks/flashcard-back/index.js"}'),a=window.React,r=window.wp.i18n,c=window.wp.blockEditor,s=["core/heading","core/paragraph","core/image","core/buttons","core/media-text"],n=[["core/heading",{level:2,placeholder:(0,r.__)("Add back side title...","smart-flashcards")}],["core/paragraph",{placeholder:(0,r.__)("Add back side content...","smart-flashcards")}]];(0,e.registerBlockType)(t.name,{...t,edit:function(){const e=(0,c.useBlockProps)({className:"flashcard-back"});return(0,a.createElement)("div",{...e},(0,a.createElement)("div",{className:"flashcard-content"},(0,a.createElement)(c.InnerBlocks,{allowedBlocks:s,template:n,templateLock:!1})))},save:function(){const e=c.useBlockProps.save({className:"flashcard-back"});return(0,a.createElement)("div",{...e},(0,a.createElement)("div",{className:"flashcard-content"},(0,a.createElement)(c.InnerBlocks.Content,null)))}})})();