
const btCloseModal = document.querySelectorAll('.close-modal');
for(let i=0; i<btCloseModal.length; i++) {
    btCloseModal[i].addEventListener('click', function() {
      const idModal = this.dataset.target;
      document.querySelector(idModal).classList.toggle('is-active');
    }, false);
  }
