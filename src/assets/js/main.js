/* =============================== Toogle Nav =============================== */

/* (function() {

   const hamburger = {
      navToggle: document.querySelector('.nav-toggle'),
      nav: document.querySelector('nav'),


      doToggle: function(e) {
         e.preventDefault();
         this.navToggle.classList.toggle('expanded');
         this.nav.classList.toggle('expanded');
         // this.contentToggle.classList.toggle('margin-content');

      }
   };
      hamburger.navToggle.addEventListener('click', function(e) { hamburger.doToggle(e); });

      // hamburger.nav.addEventListener('click', function(e) { hamburger.doToggle(e); });
      }
   ()
); 
*/

/* =============================== Dropdown  =============================== */

/* 
const dropFunc = () => {
const myMenu = document.querySelector('.dropdown__list');
   myMenu.classList.toggle('active');
}

let dropdownBtns = [...document.querySelectorAll('.btn-drop')];
dropdownBtns.forEach(function(btn){
   btn.onclick = function() {
      var dropdown = btn.getAttribute('data-dropdown');
      document.getElementById(dropdown).style.display = 'flex';
   }
});

// funcion contenido 100% de acuerdo al toggle
   const contentToggle = () => {
   const content = document.querySelector('.content-toggle');
   content.classList.toggle('margin-content');
}


   // Buscador
   const  showSearch = () => {
   const search = document.querySelector('.show-search');
   search.style.display = 'flex';
}
*/

/* =============================== Script para modales =============================== */

(function () {
   const modalTriggers = document.querySelectorAll(".modal-trigger");
   if (modalTriggers) {
      modalTriggers.forEach((trigger) => {
         trigger.addEventListener("click", () => {
            const { popupTrigger } = trigger.dataset;
            const popupModal = document.querySelector(
               `[data-popup-modal="${popupTrigger}"]`
            );
            const modalIconClose = popupModal.querySelector(".modal__close");

            popupModal.classList.add("modal--active");

            const toggleModal = () =>
               popupModal.classList.remove("modal--active");
            const windowOnClick = (event) =>
               event.target === popupModal ? toggleModal() : false;

            modalIconClose.addEventListener("click", toggleModal);
            window.addEventListener("click", windowOnClick);
         });
      });
   }
})();

/* =============================== Script para Inputs =============================== */

(function () {
   const inputs = document.querySelectorAll('[class*="__input"]');
   if (inputs) {
      inputs.forEach((input) => {
         input.addEventListener("focus", () => {
            input.classList.add("focused");
            input.parentElement.classList.add("highlight");
         });
         input.addEventListener("blur", function () {
            input.parentElement.classList.remove("highlight");
            if (input.value == "") {
               input.classList.remove("focused");
            } else {
               return;
            }
         });
         input.value != "" ? input.classList.add("focused") : true;
      });
   }
})();

/* ============================== Script para Selects =============================== */

(function () {
   const selectElemets = document.querySelectorAll('[class*="select--"]');
   selectElemets.forEach((selElement, index) => {
      selElement = selectElemets[index].getElementsByTagName("select")[0];
      const styledSelect = document.createElement("div");

      styledSelect.setAttribute("class", "select__selected");
      styledSelect.innerHTML =
         selElement.options[selElement.selectedIndex].innerHTML;
      selectElemets[index].appendChild(styledSelect);

      const selectMenu = document.createElement("div");
      selectMenu.classList.add("select--options", "select--hide");

      for (let index = 1; index < selElement.length; index++) {
         const selectMenuOptions = document.createElement("div");
         selectMenuOptions.innerHTML = selElement.options[index].innerHTML;

         selectMenuOptions.addEventListener("click", function (e) {
            const selClick = this.parentNode.parentNode.getElementsByTagName(
               "select"
            )[0];
            const headSelectList = this.parentNode.previousSibling;

            for (let i = 0; i < selClick.length; i++) {
               selClick.options[i].innerHTML == this.innerHTML
                  ? (selClick.selectedIndex = i)
                  : (headSelectList.innerHTML = this.innerHTML);
            }
            headSelectList.click();
         });
         selectMenu.appendChild(selectMenuOptions);
      }

      selectElemets[index].appendChild(selectMenu);

      styledSelect.addEventListener("click", function (e) {
         e.stopPropagation();
         closeSelect(this);
         this.nextSibling.classList.toggle("hide");
         this.classList.toggle("active");
      });
   });

   const closeSelect = (element) => {
      let arrElements = [];
      selected = document.getElementsByClassName("select__selected");
      sOptions = document.getElementsByClassName("select--options");
      for (let i = 0; i < selected.length; i++) {
         element == selected[i]
            ? arrElements.push(i)
            : selected[i].classList.remove("active");
      }
      for (let i = 0; i < sOptions.length; i++) {
         arrElements.indexOf(i)
            ? sOptions[i].classList.add("select--hide")
            : false;
      }
   };
   document.addEventListener("click", closeSelect);
})();

/* ====================================== Collapsible ======================================= */

//  HTML Eje. : <button data-collapsed="colapsible" class="collapsible__header--button"></button>
//    Abierto : <div id="colapsible" class="collapsible__header--button"></div>
//    Cerrado : <div id="colapsible" data-collapsed="false" class="collapsible__header--button closed"></div>

(function () {
   const collapse = (element) => {
      // define la altura total del elemento
      let sectionHeight = element.scrollHeight;
      element.style.transition = ""; // deshabilita la transición CSS
      requestAnimationFrame(function () {
         // establece la altura actual del elemento para la transición
         element.style.height = sectionHeight + "px";
         requestAnimationFrame(function () {
            // tan pronto el estilo anterior surta efecto, calcula la transición a una altura = 0
            element.style.height = 0 + "px";
         });
      });
      element.setAttribute("data-collapsed", "true"); // marca la sección como contraída
   };

   const expand = (element) => {
      let sectionHeight = element.scrollHeight;
      // hace que el elemento pase a la altura de su contenido
      element.style.height = sectionHeight + "px";

      element.addEventListener("transitionend", function (e) {
         // elimina el detector de eventos para que solo se active una vez
         element.removeEventListener("transitionend", arguments.callee);
         // elimina la altura de los estilos en línea del elemento
         element.style.height = null;
      });
      // marca la sección como no contraída
      element.setAttribute("data-collapsed", "false");
   };

   const hideExpand = (element) => {
      let sectionHeight = element.scrollHeight;
      element.style.height = sectionHeight + "px";
      element.addEventListener("transitionend", function (e) {
         element.removeEventListener("transitionend", arguments.callee);
      });
      // remueve la clase closed
      element.classList.remove("closed");
   };

   var collapsibleButtons = [
      ...document.querySelectorAll(".collapsible__header--button"),
   ]; // array botones collapsible

   collapsibleButtons.forEach((btn) => {
      btn.onclick = () => {
         var btnCollapsible = btn.getAttribute("data-collapsed"); // btn toggle
         var contCollapsible = document.getElementById(btnCollapsible); // content
         var isCollapsed =
            contCollapsible.getAttribute("data-collapsed") === "true";
         var notCollapsed =
            contCollapsible.getAttribute("data-collapsed") === "false";
         btn.classList.toggle("rotate"); // rotación flecha
         if (isCollapsed) {
            // expand
            expand(contCollapsible);
         } else if (
            notCollapsed &&
            contCollapsible.classList.contains("closed")
         ) {
            // hideExpand
            hideExpand(contCollapsible);
         } else {
            // collapsed
            collapse(contCollapsible);
         }
      };
   });
})();

/* ========================= Script para el cierre de los alerts ====================== */

(function () {
   const closeAlerts = document.querySelectorAll("[data-close='close']");
   if (closeAlerts) {
      closeAlerts.forEach((close) => {
         const alertElement = close.parentElement;
         alertElement.addEventListener("click", () => {
            alertElement.classList.add("disappeared");
            setTimeout(() => alertElement.remove(), 300);
         });
      });
   }
})();

/* ========================= Script para los carousels =========================== */
// Basado en https://glidejs.com/docs/

(function () {
   const carousels = document.querySelectorAll(".glide");
   if (carousels) {
      carousels.forEach((carousel, index) => {
         carousel.setAttribute("id", `glide-${index}`);
         const options = {
            type: "carousel",
            gap: 15,
            perView: 3,
            peek: -window.innerWidth * 0.15,
            autoplay: 8000,
            startAt: 0,
            arrows: true,
            focusAt: "center",
            breakpoints: {
               600: {
                  peek: -window.innerWidth * 0.6,
               },
            },
         };

         const bullets = carousel.querySelector(".glide__slides")
            .childElementCount;
         let bulletWrapper = carousel.querySelector(".glide__bullets");
         let button = "";

         for (let index = 0; index < bullets; index++) {
            button += `
               <button class="glide__bullet" data-glide-dir="=${index}"></button>
            `;
         }
         bulletWrapper.innerHTML = button;
         new Glide(`#glide-${index}`, options).mount();
      });
   }
})();

/* =============================== Script para los Tabs ========================== */

(function () {
   const allTabs = document.querySelectorAll(".tabs");
   if (allTabs) {
      allTabs.forEach((tabs) => {

         const allBtns = tabs.querySelectorAll("*[data-tab]");
         const headerTabs = tabs.querySelector(".tabs__header");
         const container = tabs.querySelector(".tabs__container");
         const tabsLength = allBtns.length * 130;

         allBtns.forEach((item) => {
            
            item.addEventListener("click", function(e) {
               
               let waveClick = document.createElement('div');
               waveClick.className = 'cercle';
               this.appendChild(waveClick);

               waveClick.style.left = e.layerX + "px";
               waveClick.style.top = e.layerY + "px";
               waveClick.className += " animation-wave";

               setTimeout(() => {
                  waveClick.remove();
               }, 1000);

               Array.from(item.parentElement.children).forEach((element) => {
                  element.classList.remove("active");
                  item.classList.add("active");
               });

               const tabsEach = Array.from(container.children);
               tabsEach.forEach((item) => item.classList.remove("active"));
               tabsEach[parseInt(this.dataset.tab) - 1].classList.add("active");
            });
         });

         ['left', 'right'].forEach( arrowSide => {
            let divs = document.createElement("div");
            divs.classList.add(`tabs__arrow--${arrowSide}`)
            divs.id = arrowSide
            tabs.appendChild(divs);
         })
      
         if (matchMedia) {
            const widthTabs = window.matchMedia(`(max-width: ${tabsLength}px)`);
            widthTabs.addListener(WidthChange);
            WidthChange(widthTabs);
         }

         function WidthChange(widthTabs) {
            if (widthTabs.matches || tabsLength > headerTabs.offsetWidth ) { 
            tabs.classList.add('with-arrows')
            } else {
            tabs.classList.remove('with-arrows')
            }
         }

         tabs.addEventListener('click', (e) => {
            if( e.target.id === 'right' ) {
            headerTabs.scrollBy({
               left: 130,
               behavior : "smooth"
            })
            
            } else if (e.target.id === 'left') {
            headerTabs.scrollBy({
               left: -130,
               behavior : "smooth"
            })
            }
         })
         
      });
   }
})();
