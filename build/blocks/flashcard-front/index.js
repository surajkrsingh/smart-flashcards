(()=>{"use strict";const e=window.wp.blocks,r=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"smfcs/flashcard-front","version":"0.1.0","title":"Flashcard Front","category":"widgets","parent":["smfcs/flashcard"],"icon":"card","description":"Front side of the flashcard","attributes":{"borderStyle":{"type":"string","default":"default"},"primaryBorderColor":{"type":"string","default":"#8B7355"},"secondaryBorderColor":{"type":"string","default":"#D4B886"}},"supports":{"html":false,"color":{"background":true,"text":true,"gradients":true},"spacing":{"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontStyle":true,"__experimentalFontWeight":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true}},"textdomain":"smart-flashcards","editorScript":"file:../../../build/blocks/flashcard-front/index.js"}'),a=window.React,t=window.wp.i18n,l=window.wp.blockEditor,o=window.wp.components,s=["core/heading","core/paragraph","core/image","core/buttons","core/media-text","core/list","core/quote","core/code"],n=[["core/heading",{level:2,placeholder:(0,t.__)("Add front side title...","smart-flashcards")}],["core/paragraph",{placeholder:(0,t.__)("Add front side content...","smart-flashcards")}]],c=[{label:(0,t.__)("Default","smart-flashcards"),value:"default"},{label:(0,t.__)("Vintage Frame","smart-flashcards"),value:"vintage"},{label:(0,t.__)("Art Nouveau","smart-flashcards"),value:"art-nouveau"},{label:(0,t.__)("Celtic Pattern","smart-flashcards"),value:"celtic"},{label:(0,t.__)("Japanese Style","smart-flashcards"),value:"japanese"},{label:(0,t.__)("Modern Geometric","smart-flashcards"),value:"geometric"},{label:(0,t.__)("Royal Frame","smart-flashcards"),value:"royal"}];(0,e.registerBlockType)(r.name,{...r,edit:function({attributes:e,setAttributes:r}){const{borderStyle:d,primaryBorderColor:i,secondaryBorderColor:m}=e,p=(0,l.useBlockProps)({className:`flashcard-front border-style-${d}`,style:{"--primary-border-color":i,"--secondary-border-color":m}});return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(l.InspectorControls,null,(0,a.createElement)(o.PanelBody,{title:(0,t.__)("Border Style","smart-flashcards")},(0,a.createElement)(o.SelectControl,{label:(0,t.__)("Choose Style","smart-flashcards"),value:d,options:c,onChange:e=>r({borderStyle:e})}),"default"!==d&&(0,a.createElement)(a.Fragment,null,(0,a.createElement)("div",{className:"smfcs-color-picker-wrapper"},(0,a.createElement)("label",null,(0,t.__)("Primary Border Color","smart-flashcards")),(0,a.createElement)(o.ColorPicker,{color:i,onChange:e=>r({primaryBorderColor:e}),enableAlpha:!0})),(0,a.createElement)("div",{className:"smfcs-color-picker-wrapper"},(0,a.createElement)("label",null,(0,t.__)("Secondary Border Color","smart-flashcards")),(0,a.createElement)(o.ColorPicker,{color:m,onChange:e=>r({secondaryBorderColor:e}),enableAlpha:!0}))))),(0,a.createElement)("div",{...p},(0,a.createElement)("div",{className:"flashcard-content"},(0,a.createElement)(l.InnerBlocks,{allowedBlocks:s,template:n,templateLock:!1}))))},save:function({attributes:e}){const{borderStyle:r,primaryBorderColor:t,secondaryBorderColor:o}=e,s=l.useBlockProps.save({className:`flashcard-front border-style-${r}`,style:{"--primary-border-color":t,"--secondary-border-color":o}});return(0,a.createElement)("div",{...s},(0,a.createElement)("div",{className:"flashcard-content"},(0,a.createElement)(l.InnerBlocks.Content,null)))}})})();