const eventId = window.location.hash.replace('#', '');
const eventsCollection = firebase.firestore().collection('events');
const titleEvtElement = document.querySelector('.titulo-evento');
const organizerNameElement = document.querySelector('.nome-organizador');
const descriptionEvtElement = document.querySelector('.descricao');
const dateEvtElement = document.querySelector('.data-evento');
const bannerEvtElement = document.querySelector('.event-banner');
const spanTotalAttendee = document.querySelector('.total-attendee');
const btWillAttendee = document.querySelector('.bt-todentro');
const btWillNotAttendee = document.querySelector('.bt-tofora');
const subscribedBlock = document.querySelector('p.inscrito');

let subscribed = false;
let event;

loadEvent = (eventId) => {
    eventsCollection.doc(eventId)
        .get().then(async doc => {
            if (!doc.exists) {
                window.location = 'index.html';
                return;
            }

            event = doc.data();
            // atualizando elementos
            titleEvtElement.innerHTML = event.title;
            organizerNameElement.innerHTML = event.organizer.name;
            descriptionEvtElement.innerHTML = event.description.replace(/\n/g, '<br />');
            dateEvtElement.innerHTML = event.date.toDate();

            const image = document.createElement('img');
            image.src = event.bannerUrl.length == 0 ? 'https://i.pinimg.com/originals/b7/0d/6e/b70d6e13af7bb4c4004ec0f73e4f6ac9.jpg' : event.bannerUrl;

            document.querySelector('#figure-banner').appendChild(image);
        });
};

const checkSubscription = async () => {
    if(subscribed) {
        btWillAttendee.style.display = 'none';
        subscribedBlock.style.display='block';
    }else {
        btWillAttendee.style.display = 'block';
        subscribedBlock.style.display='none';
    }
};


const unsubscribe = async () => {
    const eventDoc = firebase.firestore().collection('events').doc(eventId);
    const subscriptionsCollection = eventDoc.collection('subscriptions');

    try {
        await subscriptionsCollection.doc(currentUser.uid).delete();
        subscribed = false;
        checkSubscription();
        alert('Você se desinscreveu :/');
    }catch(e) {
        alert('Houve um erro inesperado');
        console.error(e);
    }
};

const subscribeToEvent = async (event) => {
    const eventDoc = firebase.firestore().collection('events').doc(eventId);
    const subscriptionsCollection = eventDoc.collection('subscriptions');
    // const user = this.app.user;

    try {
        await subscriptionsCollection.doc(currentUser.uid).set({
            name: currentUser.displayName,
            email: currentUser.email
        });
        subscribed = true;
        checkSubscription();
        alert('inscrição realizada com sucesso');
    } catch (e) {
        alert('Houve um erro ao realizar inscrição');
        console.error(e);
    }
};

loadEvent(eventId);





btWillAttendee.addEventListener('click', (e) => {
    if (currentUser) {
        if (currentUser.uid == event.organizerId) {
            alert('Não é possível se inscrever no próprio evento');
            return;
        }

        subscribeToEvent(event);
    }else {
        alert('Para se inscrever nesse evento você precisa estar logado(a)');
    }
});


btWillNotAttendee.addEventListener('click', (e) => {
    if(currentUser) {
        unsubscribe();
    }
}, false);




firebase.auth().onAuthStateChanged(async (user) => {
    if(user) {
        try {
            const doc = await eventsCollection.doc(eventId)
            .collection('subscriptions').doc(user.uid).get();
            subscribed = doc.exists;
            checkSubscription();
        }catch(e) {
            console.error(e);
        }

    }
});