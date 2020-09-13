const grid = new Muuri('.grid', {
  layout: {

    rounding: false
  }
});
window.addEventListener('load', () => {
  grid.refreshItems().layout();
  document.getElementById('grid').classList.add('imagenes-cargadas');

  //para entras a los enlaces segun su id y se pone el a pa indicar que es enlace
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
      elemento.addEventListener('click', (evento) =>{
        evento.preventDefault();
        //como es una sola linea de codigo no necesita llave
        //estamos removiendo la clase activo
        enlaces.forEach((enlaces) => enlaces.classList.remove('activo'));
        //estamosagregando al que se le de click la clase activo
          evento.target.classList.add('activo');
          //con esto y podemos obtener el texto de el enlace ya que entramos al codigo directamente de html esto con innerHTML y ya con toLowerCase() lo convierto a minusculas
        const categoria = evento.target.innerHTML.toLowerCase();


        //condicional if solo que abarca una linea de codico opeacion ternario despues de los dos puntos es el else
        categoria === 'todos' ? grid.filter('[data-categoria]') :  grid.filter(`[data-categoria="${categoria}"]`);//metodo de muuri para ver la data html
console.log(categoria);
      })
    });
      document.querySelector('#barra-busqueda').addEventListener('input', (evento) =>{
          const busqueda = evento.target.value;
          //aca basicamente estamos accediendo alo que se escribe en la barra de busquedad siendo el dataset todo lo que hay en el data del html data-categoria data-etiquetas ... los data que aya ya con el .etiquetas le decimos que vamos acceder solo alo que hay el el data-etiquetas que es al que nos vamos a basar para generar la busqueda y ya el .includes()se le agrega el parametro de la variable que añadimos la cual es busqueda ya que ahi guardamos lo que se escribe en la caja de texto y le dad el valor a grid.filter que es el metodo de muuri
      grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
      });

      //agregamos un listener para el overlay de imagenes mostrarlas con un click
      const overlay = document.getElementById('overlay');
      // foreach es un ciclo que lee todo lo que hay en el archivo de la pagina y recorre cada elemento
      document.querySelectorAll('img').forEach((elemento) => {

        //addEventListener es tomar un evento el cual uno le dice que tome en este ejemplo es un evento click
        //cuando se de un click va generar una clase  en overlay la cual es activo  que se genero en el css
        elemento.addEventListener('click', () => {
          const ruta = elemento.getAttribute('src');
          const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
          overlay.classList.add('activo');
          document.querySelector('#overlay img').src = ruta;
          document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
      });

      //addEventListener del boton cerrar
      document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
       overlay.classList.remove('activo');

      });

      //addEventListener del overlay por fuera del boton
      overlay.addEventListener('click', (evento) => {
      //  overlay.classList.remove('activo');
      //? sirve para hacer un condicional de un solo segmento ? seria el if y los dos puntos :  seria el else
        evento.target.id === 'overlay' ?  overlay.classList.remove('activo') : '';
      });

      //PROGRAMACION DE LIGHTBOX PARA DELANTE Y ATRAS Y VER LAS  IMAGENES

      class Gallery {
          constructor(config) {
              this.container = document.querySelector(config.container);
              this.items = this.container.querySelectorAll(config.item);
              this.lightbox = this.container.querySelector(config.lightbox);
              this.modal = this.lightbox.querySelector(config.modal);
              this.config = config;
              this.addCustomAttribute();
              this.initEventListener();
          }

          addCustomAttribute() {
              let next = 0;
              let back = 0;
              for(let i = 0; i < this.items.length; i++) {
                  next = i + 1;
                  back = i - 1;
                  // Caso especial del último item
                  if (i === this.items.length - 1) {
                      next = 0;
                  }
                  // Caso especial del primer item
                  if (i === 0) {
                      back = this.items.length - 1;
                  }
                  this.items[i].setAttribute('data-next_item', next);
                  this.items[i].setAttribute('data-back_item', back);
              }
          }

          initEventListener() {
              this.items.forEach(item => {
                  item.addEventListener('click', () => {
                      let img = this.getImg(item);
                      this.showLightbox(img.getAttribute('src'), item.dataset.next_item, item.dataset.back_item);
                  });
              });

              this.modal.addEventListener('click', (e) => {
                  let element = e.target;
                  if (element.classList.contains(this.config.controls.back)) {
                      this.changeImg(false);
                  } else if (element.classList.contains(this.config.controls.next)) {
                      this.changeImg(true);
                  } else if (element.classList.contains(this.config.controls.close)) {
                      this.lightbox.classList.remove(this.config.showLightbox);
                  }
              });
          }

          getImg(item) {
              return item.querySelector(this.config.galleryImgClass);
          }

          showLightbox(imgSrc, nextItem, backItem) {
              this.lightbox.classList.add(this.config.showLightbox);
              this.addImgModal(imgSrc, nextItem, backItem);
          }

          addImgModal(imgSrc, nextItem, backItem) {
              this.modal.setAttribute('data-next_item', nextItem);
              this.modal.setAttribute('data-back_item', backItem);
              let imgModal = this.modal.querySelector(this.config.modalImgClass);
              imgModal.setAttribute('src', imgSrc);
          }

          changeImg(isNext) {
              let indexItem = this.modal.dataset.back_item;
              if (isNext) {
                  indexItem = this.modal.dataset.next_item;
              }
              let item = this.items[indexItem];
              let img = this.getImg(item);
              this.addImgModal(img.getAttribute('src'), item.dataset.next_item, item.dataset.back_item);
          }
      }
      new Gallery({
          container: '.contenedor',
          item: '.contenido-img',
          galleryImgClass: '.img-lightbox',
          lightbox: '.contenedor-btn',
          showLightbox: 'overlay',
          modal: '.lightbox-btn',
          modalImgClass: '.lightbox-img',
          controls: {close: 'icon-close', next: 'icon-next', back: 'icon-back'}
      });



});
