const eventId = window.location.hash.replace('#', '');
const eventsCollection = firebase.firestore().collection('events');

const titleEvtElement = document.querySelector('.titulo-evento');
const organizerNameElement = document.querySelector('.nome-organizador');
const descriptionEvtElement = document.querySelector('.descricao');
const dateEvtElement = document.querySelector('.data-evento');
const bannerEvtElement = document.querySelector('.event-banner');
const spanTotalAttendee = document.querySelector('.total-attendee');
const modalUpdateEvt = document.querySelector('#modal-update-event');
const modalAttendee = document.querySelector('#modal-attendee');
//modal-attendee


const btAttendeeList = document.querySelector('.attendee-list');

const inputTitle = document.querySelector('input[name=title]');
const inputDescription = document.querySelector('textarea[name=description]');
const inputDateEvt = document.querySelector('input[name=date]');

const formUpdateEvt = document.querySelector('form.update-event');
const fieldsFormUpdate = document.querySelectorAll('form.update-event input, form.update-event textarea');


let event = {};





document.querySelector('.edit-evt').addEventListener('click', () => {
    modalUpdateEvt.classList.toggle('is-active');
});


formUpdateEvt.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData();
    fieldsFormUpdate.forEach(field => {
        formData.append(field.name, field.value);
    });


    eventsCollection.doc(eventId)
        .update({
            title: formData.get('title'),
            description: formData.get('description'),
            date: new Date(`${formData.get('date')} 00:00:00`)
        })
        .then(() => {
            loadEvent(eventId);
            modalUpdateEvt.classList.remove('is-active');
        })
        .catch(err => {
            console.error(err);
        });
});


_convertDate = (date) => {
    let stringDate = date.getFullYear() + '-';
    stringDate += ((date.getMonth() + 1) > 9) ? date.getMonth() + 1 : `0${date.getMonth()}`;
    stringDate += '-';
    stringDate += ((date.getDate()) > 9) ? date.getDate() + 1 : `0${date.getDate()}`;
    return stringDate;
}


loadEvent = (eventId) => {
    eventsCollection.doc(eventId)
        .get().then(doc => {
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
            spanTotalAttendee.innerHTML = event.subscribers;
            const image = document.createElement('img');
            image.src = event.bannerUrl.length == 0 ? 'https://i.pinimg.com/originals/b7/0d/6e/b70d6e13af7bb4c4004ec0f73e4f6ac9.jpg' : event.bannerUrl;

            document.querySelector('#figure-banner').appendChild(image);

            const dt = event.date.toDate();

            inputTitle.value = event.title;
            inputDescription.value = event.description;
            inputDateEvt.value = _convertDate(dt);
        });
};

loadEvent(eventId);



btAttendeeList.addEventListener('click', () => {
    modalAttendee.classList.toggle('is-active');
    const ul = modalAttendee.querySelector('ul');
    eventsCollection.doc(eventId).collection('subscriptions')
        .get().then(querySnapshot => {
            ul.innerHTML = '';
            querySnapshot.docs.forEach(doc => {
                const data = doc.data();
                ul.innerHTML += `<li>${data.name} (${data.email})</li>`;
            });
        });
});