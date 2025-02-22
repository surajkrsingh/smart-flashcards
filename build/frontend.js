(()=>{var e={716:()=>{function e(e,r){const n=e.querySelector(".flashcard-set-inner")||e.querySelector(".flashcard-set-track"),s=Array.from(n.querySelectorAll(".wp-block-smfcs-flashcard")),a=r.querySelector(".flashcard-nav-button.prev"),l=r.querySelector(".flashcard-nav-button.next"),c=r.querySelector(".flashcard-set-counter");let i=0,o=!1;function d(){if(o)return;o=!0,s.forEach((e=>{e.classList.remove("is-active"),e.removeAttribute("style")}));const e=s[i];e.classList.add("is-active"),c.textContent=`${i+1} / ${s.length}`,a.disabled=0===i,l.disabled=i===s.length-1,n.style.height=`${e.offsetHeight}px`,setTimeout((()=>{o=!1}),400)}d(),a?.addEventListener("click",(()=>{i>0&&!o&&(i--,d())})),l?.addEventListener("click",(()=>{i<s.length-1&&!o&&(i++,d())})),window.addEventListener("resize",t((()=>d()),250))}function t(e,t){let r;return function(...n){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),e(...n)}),t)}}function r(){document.querySelectorAll(".flashcard-inner:not(.initialized)").forEach((e=>{const t=e.querySelector(".flashcard-front"),r=e.querySelector(".flashcard-back");function n(n){n.preventDefault(),e.classList.toggle("is-flipped");const s=e.classList.contains("is-flipped");t.setAttribute("aria-hidden",s),r.setAttribute("aria-hidden",!s)}e.addEventListener("click",n),e.addEventListener("keydown",(function(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),n(e))})),e.classList.add("initialized")})),document.querySelectorAll(".wp-block-smfcs-flashcard-set:not(.initialized)").forEach(n)}function n(e){const r=e.querySelector(".flashcard-set-track");if(!r)return;const n=e.querySelector(".flashcard-nav-button.prev"),s=e.querySelector(".flashcard-nav-button.next"),a=e.querySelector(".flashcard-set-counter"),l=e.querySelector(".flashcard-shuffle-button");let c=Array.from(r.querySelectorAll(".wp-block-smfcs-flashcard"));if(!c.length)return;let i=0,o=!1;const d="true"===e.dataset.enableShuffle;function f(){if(o)return;o=!0;const e=c[i-1],t=c[i+1];c.forEach((e=>{e.classList.remove("is-active","prev","next")})),e&&e.classList.add("prev"),t&&t.classList.add("next");const l=c[i];l.classList.add("is-active"),n&&(n.disabled=0===i),s&&(s.disabled=i===c.length-1),a&&(a.textContent=`${i+1} / ${c.length}`),r.style.height=`${l.offsetHeight}px`,setTimeout((()=>{o=!1,c.forEach(((e,t)=>{t!==i&&t!==i-1&&t!==i+1&&e.classList.remove("prev","next")}))}),400)}function u(e,t){e.preventDefault(),o||(r.classList.remove("sliding-left","sliding-right"),r.classList.add("prev"===t?"sliding-right":"sliding-left"),"prev"===t&&i>0?(i--,f()):"next"===t&&i<c.length-1&&(i++,f()),setTimeout((()=>{r.classList.remove("sliding-left","sliding-right")}),400))}n?.addEventListener("click",(e=>u(e,"prev"))),s?.addEventListener("click",(e=>u(e,"next"))),d&&l&&(l.addEventListener("click",(function(){o||(c=function(e){for(let t=e.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}([...c]),i=0,c.forEach((e=>r.appendChild(e))),f())})),l.style.display="block"),e.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&u(e,"prev"),"ArrowRight"===e.key&&u(e,"next")})),window.addEventListener("resize",t((()=>{c[i]&&(r.style.height=`${c[i].offsetHeight}px`)}),250)),f(),e.classList.add("initialized")}document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".wp-block-smfcs-flashcard-set").forEach((t=>{const r=t.querySelector(".flashcard-set-nav");if(r)return void e(t,r);let n=t.querySelector(".flashcard-set-inner")||t.querySelector(".flashcard-set-track");n||(n=document.createElement("div"),n.className="flashcard-set-inner",Array.from(t.querySelectorAll(".wp-block-smfcs-flashcard")).forEach((e=>n.appendChild(e))),t.insertBefore(n,t.firstChild));const s=Array.from(n.querySelectorAll(".wp-block-smfcs-flashcard"));if(!s.length)return;const a=t.getAttribute("data-display-mode")||"slide";"slide"===a?function(t){const r=t.querySelector(".flashcard-set-nav");r&&e(t,r)}(t):"stack"===a?function(e,t,r){let n=0,s=!1;function a(a=null){if(s)return;s=!0,a&&t.classList.add(`swipe-${a}`),r.forEach(((e,t)=>{e.classList.remove("is-active","stack-1","stack-2"),t===n?e.classList.add("is-active"):t===n+1?e.classList.add("stack-1"):t===n+2&&e.classList.add("stack-2")}));const l=e.querySelector(".flashcard-nav-button.prev"),c=e.querySelector(".flashcard-nav-button.next"),i=e.querySelector(".flashcard-set-counter");l&&(l.disabled=0===n),c&&(c.disabled=n===r.length-1),i&&(i.textContent=`${n+1} / ${r.length}`),setTimeout((()=>{s=!1,t.classList.remove("swipe-left","swipe-right")}),400)}t.setAttribute("data-total-cards",r.length),r.forEach((e=>{e.addEventListener("click",(()=>{e.classList.contains("is-active")&&!s&&n<r.length-1&&(n++,a())}))})),a();const l=e.querySelector(".flashcard-set-nav");if(l){const o=l.querySelector(".flashcard-nav-button.prev"),d=l.querySelector(".flashcard-nav-button.next"),f=l.querySelector(".flashcard-set-counter");function c(){f&&(f.textContent=`${n+1} / ${r.length}`)}function i(){o&&(o.disabled=0===n),d&&(d.disabled=n===r.length-1)}o?.addEventListener("click",(e=>{e.preventDefault(),!s&&n>0&&(n--,a("right"),c())})),d?.addEventListener("click",(e=>{e.preventDefault(),!s&&n<r.length-1&&(n++,a("left"),c())})),c(),i(),e.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&n>0&&!s?(n--,a("right"),c(),i()):"ArrowRight"===e.key&&n<r.length-1&&!s&&(n++,a("left"),c(),i())}))}}(t,n,s):"grid"===a&&function(e,t,r){r.forEach((e=>{e.style.display="block",e.style.opacity="1",e.style.visibility="visible"}));const n=e.querySelector(".flashcard-set-nav");n&&(n.style.display="none")}(t,0,s)}))})),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r):r()},975:()=>{function e(e,t){let r;return function(...n){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),e(...n)}),t)}}document.addEventListener("DOMContentLoaded",(function(){function t(e){const t=e.querySelector(".flashcard-inner"),r=e.querySelector(".flashcard-front"),n=e.querySelector(".flashcard-back");r.style.height="",n.style.height="",t.style.height="";const s=r.getBoundingClientRect().height,a=n.getBoundingClientRect().height,l=Math.max(s,a);r.style.height=`${l}px`,n.style.height=`${l}px`,t.style.height=`${l}px`,e.style.height=`${l}px`}document.querySelectorAll(".wp-block-smfcs-flashcard").forEach((r=>{t(r),window.addEventListener("resize",e((()=>{t(r)}),250)),r.querySelectorAll("img").forEach((e=>{e.addEventListener("load",(()=>{t(r)}))})),new MutationObserver(e((()=>{t(r)}),250)).observe(r,{subtree:!0,childList:!0,characterData:!0})}))}))}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(975),r(716)})()})();