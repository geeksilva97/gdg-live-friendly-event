const btSignOut = document.querySelector('.bt-signout');
const btNewEvent = document.querySelector('.bt-new-event');
const modalNewEvent = document.querySelector('#modal-new-event');
const formNewEvent = document.querySelector('form.new-event');
const formFields = document.querySelectorAll('form.new-event input, form.new-event textarea');
const myEvents = document.querySelector('.my-events');
let events = {};

///////////
const eventsCollection = this.firebase.firestore().collection('events');


btSignOut.addEventListener('click', () => {
    firebase.auth().signOut();
});


btNewEvent.addEventListener('click', () => {
    modalNewEvent.classList.toggle('is-active');
});


/**
 * 
 */
formNewEvent.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    if (user) {
        const inputBanner = document.querySelector('input[name=banner]');
        const formData = new FormData();
        const banner = inputBanner.files[0];
        const storageRef = this.firebase.storage().ref(user.uid);
        // Upload da imagem do banner  
        let storageSnapshot = null;
        let downloadURL = '';
        try {
            storageSnapshot = await storageRef.child(banner.name).put(banner);
            downloadURL = await storageSnapshot.ref.getDownloadURL();
        } catch (e) {
            alert('Erro ao enviar imagem');
        }

        if (downloadURL.length === 0) return;

        formFields.forEach(field => formData.append(field.name, field.value));

        let key = formData.get('title').replace(/\s/g, '').toLowerCase();

        eventsCollection.doc(key).set({
            subscribers: 0,
            title: formData.get('title'),
            description: formData.get('description'),
            date: new Date(formData.get('date')),
            bannerUrl: downloadURL,
            organizerId: user.uid,
            organizer: {
                email: user.email,
                name: user.displayName
            },
        })
        .then(data => {
            alert('Evento registrado com sucesso');
            modalNewEvent.classList.remove('is-active');
        })
        .catch(err => {
            alert('Houve um erro inesperado');
            modalNewEvent.classList.remove('is-active');
            console.error(err);
        });

    }else {
        alert('Você precisa estar logado(a) para criar um evento');
    }




});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        events = {};
        eventsCollection.where('organizerId', '==', user.uid)
            .onSnapshot(querySnapshot => {
                // limpando tela
                myEvents.innerHTML = '';
                querySnapshot.forEach(doc => {
                    events[doc.id] = doc.data();
                    myEvents.appendChild(buildColumnCard(events[doc.id], true));
                });

            });
    } 
});



