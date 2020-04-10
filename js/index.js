const modalSignUp = document.querySelector('#modal-signup');
const modalSignIn = document.querySelector('#modal-signin');

const btSignOut = document.querySelector('.bt-signout');
const btSignIn = document.querySelector('.bt-signin');
const btSignUp = document.querySelector('.bt-signup');

const eventsCollection = firebase.firestore().collection('events');
const myEvents = document.querySelector('.my-events');
let events = {};

btSignOut.addEventListener('click', () => {
    firebase.auth().signOut();
});


btSignUp.addEventListener('click', () => {
    modalSignUp.classList.toggle('is-active');
});


btSignIn.addEventListener('click', () => {
    modalSignIn.classList.toggle('is-active');
});

events = {};
eventsCollection.where('date', '>=', (new Date()))
    .orderBy('date')

    .get().then(querySnapshot => {

        // limpando tela
        myEvents.innerHTML = '';
        querySnapshot.forEach(doc => {
            events[doc.id] = doc.data();
            myEvents.appendChild(buildColumnCard(events[doc.id]));
        });

        console.log(events);

    });
