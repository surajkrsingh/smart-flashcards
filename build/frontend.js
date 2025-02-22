(()=>{var e={716:()=>{function e(e,r){const n=e.querySelector(".flashcard-set-inner")||e.querySelector(".flashcard-set-track"),s=Array.from(n.querySelectorAll(".wp-block-smfcs-flashcard")),l=r.querySelector(".flashcard-nav-button.prev"),i=r.querySelector(".flashcard-nav-button.next"),a=r.querySelector(".flashcard-set-counter");let c=0,o=!1;function d(){if(o)return;o=!0,s.forEach((e=>{e.classList.remove("is-active"),e.removeAttribute("style")}));const e=s[c];e.classList.add("is-active"),a.textContent=`${c+1} / ${s.length}`,l.disabled=0===c,i.disabled=c===s.length-1,n.style.height=`${e.offsetHeight}px`,setTimeout((()=>{o=!1}),400)}d(),l?.addEventListener("click",(()=>{c>0&&!o&&(c--,d())})),i?.addEventListener("click",(()=>{c<s.length-1&&!o&&(c++,d())})),window.addEventListener("resize",t((()=>d()),250))}function t(e,t){let r;return function(...n){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),e(...n)}),t)}}function r(){document.querySelectorAll(".flashcard-inner:not(.initialized)").forEach((e=>{const t=e.querySelector(".flashcard-front"),r=e.querySelector(".flashcard-back");function n(n){n.preventDefault(),e.classList.toggle("is-flipped");const s=e.classList.contains("is-flipped");t.setAttribute("aria-hidden",s),r.setAttribute("aria-hidden",!s)}e.addEventListener("click",n),e.addEventListener("keydown",(function(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),n(e))})),e.classList.add("initialized")})),document.querySelectorAll(".wp-block-smfcs-flashcard-set:not(.initialized)").forEach(n)}function n(e){const r=e.querySelector(".flashcard-set-track");if(!r)return;const n=e.querySelector(".flashcard-nav-button.prev"),s=e.querySelector(".flashcard-nav-button.next"),l=e.querySelector(".flashcard-set-counter"),i=e.querySelector(".flashcard-shuffle-button");let a=Array.from(r.querySelectorAll(".wp-block-smfcs-flashcard"));if(!a.length)return;let c=0,o=!1;const d="true"===e.dataset.enableShuffle;function f(){if(o)return;o=!0;const e=a[c-1],t=a[c+1];a.forEach((e=>{e.classList.remove("is-active","prev","next")})),e&&e.classList.add("prev"),t&&t.classList.add("next");const i=a[c];i.classList.add("is-active"),n&&(n.disabled=0===c),s&&(s.disabled=c===a.length-1),l&&(l.textContent=`${c+1} / ${a.length}`),r.style.height=`${i.offsetHeight}px`,setTimeout((()=>{o=!1,a.forEach(((e,t)=>{t!==c&&t!==c-1&&t!==c+1&&e.classList.remove("prev","next")}))}),400)}function h(e,t){e.preventDefault(),o||(r.classList.remove("sliding-left","sliding-right"),r.classList.add("prev"===t?"sliding-right":"sliding-left"),"prev"===t&&c>0?(c--,f()):"next"===t&&c<a.length-1&&(c++,f()),setTimeout((()=>{r.classList.remove("sliding-left","sliding-right")}),400))}n?.addEventListener("click",(e=>h(e,"prev"))),s?.addEventListener("click",(e=>h(e,"next"))),d&&i&&(i.addEventListener("click",(function(){o||(a=function(e){for(let t=e.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}([...a]),c=0,a.forEach((e=>r.appendChild(e))),f())})),i.style.display="block"),e.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&h(e,"prev"),"ArrowRight"===e.key&&h(e,"next")})),window.addEventListener("resize",t((()=>{a[c]&&(r.style.height=`${a[c].offsetHeight}px`)}),250)),f(),e.classList.add("initialized")}document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".wp-block-smfcs-flashcard-set").forEach((t=>{const r=t.querySelector(".flashcard-set-nav");if(r)return void e(t,r);let n=t.querySelector(".flashcard-set-inner")||t.querySelector(".flashcard-set-track");n||(n=document.createElement("div"),n.className="flashcard-set-inner",Array.from(t.querySelectorAll(".wp-block-smfcs-flashcard")).forEach((e=>n.appendChild(e))),t.insertBefore(n,t.firstChild));const s=Array.from(n.querySelectorAll(".wp-block-smfcs-flashcard"));if(!s.length)return;const l=t.getAttribute("data-display-mode")||"slide";"slide"===l?function(t){const r=t.querySelector(".flashcard-set-nav");r&&e(t,r)}(t):"stack"===l&&function(e,t,r){r.forEach(((e,t)=>{const n=Math.min(5*t,30);e.style.transform=`translateY(${n}px)`,e.style.zIndex=r.length-t,e.style.position="absolute",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.visibility="visible",e.style.opacity="1"}));const n=r[0]?.offsetHeight+30;t.style.height=`${n}px`,t.style.position="relative",r.forEach((e=>{e.addEventListener("click",(()=>{e===t.firstElementChild&&(t.appendChild(e),function(e){const t=Array.from(e.children);t.forEach(((e,r)=>{const n=Math.min(5*r,30);e.style.transform=`translateY(${n}px)`,e.style.zIndex=t.length-r}))}(t))}))}))}(0,n,s)}))})),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r):r()},975:()=>{function e(e,t){let r;return function(...n){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),e(...n)}),t)}}document.addEventListener("DOMContentLoaded",(function(){function t(e){const t=e.querySelector(".flashcard-inner"),r=e.querySelector(".flashcard-front"),n=e.querySelector(".flashcard-back");r.style.height="",n.style.height="",t.style.height="";const s=r.getBoundingClientRect().height,l=n.getBoundingClientRect().height,i=Math.max(s,l);r.style.height=`${i}px`,n.style.height=`${i}px`,t.style.height=`${i}px`,e.style.height=`${i}px`}document.querySelectorAll(".wp-block-smfcs-flashcard").forEach((r=>{t(r),window.addEventListener("resize",e((()=>{t(r)}),250)),r.querySelectorAll("img").forEach((e=>{e.addEventListener("load",(()=>{t(r)}))})),new MutationObserver(e((()=>{t(r)}),250)).observe(r,{subtree:!0,childList:!0,characterData:!0})}))}))}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,r),l.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(975),r(716)})()})();