(()=>{var e={152:()=>{function e(e,r){const n=e.querySelector(".flashcard-set-inner")||e.querySelector(".flashcard-set-track"),s=Array.from(n.querySelectorAll(".wp-block-smfcs-flashcard")),a=r.querySelector(".flashcard-nav-button.prev"),c=r.querySelector(".flashcard-nav-button.next"),l=r.querySelector(".flashcard-set-counter");let o=0,i=!1;function d(){if(i)return;i=!0,s.forEach((e=>{e.classList.remove("is-active"),e.removeAttribute("style")}));const e=s[o];e.classList.add("is-active"),l.textContent=`${o+1} / ${s.length}`,a.disabled=0===o,c.disabled=o===s.length-1,n.style.height=`${e.offsetHeight}px`,setTimeout((()=>{i=!1}),400)}d(),a?.addEventListener("click",(()=>{o>0&&!i&&(o--,d())})),c?.addEventListener("click",(()=>{o<s.length-1&&!i&&(o++,d())})),window.addEventListener("resize",t((()=>d()),250))}function t(e,t){let r;return function(...n){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),e(...n)}),t)}}function r(){document.querySelectorAll(".wp-block-smfcs-flashcard").forEach((function(e){const t=t=>{t.target.closest("a, button, .read-more-button")||e.classList.toggle("is-flipped")};e.addEventListener("click",(function(e){e.target.closest("a, button, .read-more-button")||t(e)})),e.addEventListener("keydown",(function(e){document.activeElement.matches('a, button, .read-more-button, [role="button"], [tabindex]')||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),t(e))}))})),document.querySelectorAll(".wp-block-smfcs-flashcard-set:not(.initialized)").forEach(n)}function n(e){const r=e.querySelector(".flashcard-set-track");if(!r)return;const n=e.querySelector(".flashcard-nav-button.prev"),s=e.querySelector(".flashcard-nav-button.next"),a=e.querySelector(".flashcard-set-counter"),c=e.querySelector(".flashcard-shuffle-button");let l=Array.from(r.querySelectorAll(".wp-block-smfcs-flashcard"));if(!l.length)return;let o=0,i=!1;const d="true"===e.dataset.enableShuffle;function u(){if(i)return;i=!0;const e=l[o-1],t=l[o+1];l.forEach((e=>{e.classList.remove("is-active","prev","next")})),e&&e.classList.add("prev"),t&&t.classList.add("next");const c=l[o];c.classList.add("is-active"),n&&(n.disabled=0===o),s&&(s.disabled=o===l.length-1),a&&(a.textContent=`${o+1} / ${l.length}`),r.style.height=`${c.offsetHeight}px`,setTimeout((()=>{i=!1,l.forEach(((e,t)=>{t!==o&&t!==o-1&&t!==o+1&&e.classList.remove("prev","next")}))}),400)}function f(e,t){e.preventDefault(),i||(r.classList.remove("sliding-left","sliding-right"),r.classList.add("prev"===t?"sliding-right":"sliding-left"),"prev"===t&&o>0?(o--,u()):"next"===t&&o<l.length-1&&(o++,u()),setTimeout((()=>{r.classList.remove("sliding-left","sliding-right")}),400))}n?.addEventListener("click",(e=>f(e,"prev"))),s?.addEventListener("click",(e=>f(e,"next"))),d&&c&&(c.addEventListener("click",(function(){i||(l=function(e){for(let t=e.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}([...l]),o=0,l.forEach((e=>r.appendChild(e))),u())})),c.style.display="block"),e.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&f(e,"prev"),"ArrowRight"===e.key&&f(e,"next")})),window.addEventListener("resize",t((()=>{l[o]&&(r.style.height=`${l[o].offsetHeight}px`)}),250)),u(),e.classList.add("initialized")}document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".wp-block-smfcs-flashcard-set").forEach((t=>{const r=t.querySelector(".flashcard-set-nav");if(r)return void e(t,r);let n=t.querySelector(".flashcard-set-inner")||t.querySelector(".flashcard-set-track");n||(n=document.createElement("div"),n.className="flashcard-set-inner",Array.from(t.querySelectorAll(".wp-block-smfcs-flashcard")).forEach((e=>n.appendChild(e))),t.insertBefore(n,t.firstChild));const s=Array.from(n.querySelectorAll(".wp-block-smfcs-flashcard"));if(!s.length)return;const a=t.getAttribute("data-display-mode")||"slide";"slide"===a?function(t){const r=t.querySelector(".flashcard-set-nav");r&&e(t,r)}(t):"stack"===a?function(e,t,r){let n=0,s=!1;function a(a=null){if(s)return;s=!0,a&&t.classList.add(`swipe-${a}`),r.forEach(((e,t)=>{e.classList.remove("is-active","stack-1","stack-2"),t===n?e.classList.add("is-active"):t===n+1?e.classList.add("stack-1"):t===n+2&&e.classList.add("stack-2")}));const c=e.querySelector(".flashcard-nav-button.prev"),l=e.querySelector(".flashcard-nav-button.next"),o=e.querySelector(".flashcard-set-counter");c&&(c.disabled=0===n),l&&(l.disabled=n===r.length-1),o&&(o.textContent=`${n+1} / ${r.length}`),setTimeout((()=>{s=!1,t.classList.remove("swipe-left","swipe-right")}),400)}t.setAttribute("data-total-cards",r.length),r.forEach((e=>{e.addEventListener("click",(()=>{e.classList.contains("is-active")&&!s&&n<r.length-1&&(n++,a())}))})),a();const c=e.querySelector(".flashcard-set-nav");if(c){const i=c.querySelector(".flashcard-nav-button.prev"),d=c.querySelector(".flashcard-nav-button.next"),u=c.querySelector(".flashcard-set-counter");function l(){u&&(u.textContent=`${n+1} / ${r.length}`)}function o(){i&&(i.disabled=0===n),d&&(d.disabled=n===r.length-1)}i?.addEventListener("click",(e=>{e.preventDefault(),!s&&n>0&&(n--,a("right"),l())})),d?.addEventListener("click",(e=>{e.preventDefault(),!s&&n<r.length-1&&(n++,a("left"),l())})),l(),o(),e.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&n>0&&!s?(n--,a("right"),l(),o()):"ArrowRight"===e.key&&n<r.length-1&&!s&&(n++,a("left"),l(),o())}))}}(t,n,s):"grid"===a&&function(e,t,r){r.forEach((e=>{e.style.display="block",e.style.opacity="1",e.style.visibility="visible"}));const n=e.querySelector(".flashcard-set-nav");n&&(n.style.display="none")}(t,0,s)}))})),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r):r()},875:()=>{function e(e,t){let r;return function(...n){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),e(...n)}),t)}}document.addEventListener("DOMContentLoaded",(function(){function t(e){const t=e.querySelector(".flashcard-inner"),r=e.querySelector(".flashcard-front"),n=e.querySelector(".flashcard-back");r.style.height="",n.style.height="",t.style.height="";const s=r.getBoundingClientRect().height,a=n.getBoundingClientRect().height,c=Math.max(s,a);r.style.height=`${c}px`,n.style.height=`${c}px`,t.style.height=`${c}px`,e.style.height=`${c}px`}document.querySelectorAll(".wp-block-smfcs-flashcard").forEach((r=>{t(r),window.addEventListener("resize",e((()=>{t(r)}),250)),r.querySelectorAll("img").forEach((e=>{e.addEventListener("load",(()=>{t(r)}))})),new MutationObserver(e((()=>{t(r)}),250)).observe(r,{subtree:!0,childList:!0,characterData:!0})}))}))}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(875),r(152)})()})();