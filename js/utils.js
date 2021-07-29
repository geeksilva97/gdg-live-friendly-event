

buildColumnCard = (evento, isDashboard = false) => {
    const divColumn = document.createElement('div');
    divColumn.classList.add('column');
    divColumn.classList.add('is-3');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardImage = document.createElement('div');
    const figure = document.createElement('figure');
    const image = document.createElement('img');

    cardImage.classList.add('card-image');
    figure.className = 'image is-4by3';
    // console.log(evento.bannerUrl.length);
    image.src = evento.bannerUrl.length == 0 ? 'assets/sparky.png' : evento.bannerUrl;

    figure.appendChild(image);
    cardImage.appendChild(figure);

    card.appendChild(cardImage);

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const mediaDiv = document.createElement('div');
    const mediaLeft = document.createElement('div');
    const mediaContent = document.createElement('div');
    mediaDiv.className = 'media';
    mediaLeft.className = 'media-left';
    mediaContent.className = 'media-content';


    mediaLeft.innerHTML = `<figure class="image is-48x48">
        <img  class="circle" src="https://bulma.io/images/placeholders/96x96.png" alt="Profile image">
    </figure>`;

    mediaContent.innerHTML = `<p class="title is-4">${evento.title}</p>
    <p class="subtitle is-6">por ${evento.organizer.name}</p>`;

    mediaDiv.appendChild(mediaLeft);
    mediaDiv.appendChild(mediaContent);

    cardContent.appendChild(mediaDiv);

    const dateEvent = evento.date.toDate().toLocaleDateString();

    const content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = `${evento.description.substring(0, 60)}...
    <br>
    <br>
    <time datetime="${dateEvent}">${dateEvent}</time>`;

    cardContent.appendChild(content);
    cardContent.appendChild(document.createElement('hr'));


    if (isDashboard) {
        const a = document.createElement('a');
        a.href = `event.html#${evento.id}`;
        a.innerText = 'Detalhes';

        cardContent.appendChild(a);
    } else {
        const a = document.createElement('a');
        a.href = `subscribe.html#${evento.id}`;
        a.innerText = 'Ver mais';

        cardContent.appendChild(a);
    }



    card.appendChild(cardContent);
    divColumn.appendChild(card);


    return divColumn;
}