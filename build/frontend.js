(()=>{function e(){document.querySelectorAll(".flashcard-inner").forEach((e=>{const t=e.querySelector(".flashcard-front"),n=e.querySelector(".flashcard-back");function r(){e.classList.toggle("is-flipped");const r=e.classList.contains("is-flipped");t.setAttribute("aria-hidden",r),n.setAttribute("aria-hidden",!r);const a=r?"Flashcard back side - Click or press Enter to flip":"Flashcard front side - Click or press Enter to flip";e.setAttribute("aria-label",a)}e.addEventListener("click",r),e.addEventListener("keydown",(function(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),r())}))}))}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()})();