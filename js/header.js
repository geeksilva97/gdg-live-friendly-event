let currentUser;

logged = (user) => {
    document.querySelector('.not-logged').style.display = 'none';
    document.querySelectorAll('.logged').forEach(elem => elem.style.display = 'block');
    if(user.displayName) {
        document.querySelector('.user-displayName').innerText = user.displayName;
    }else {
        document.querySelector('.user-displayName').innerHTML = user.email + ' (<a href="">não confirmado</a>)';
    }
}

notLogged = () => {
    document.querySelector('.not-logged').style.display = 'block';
    document.querySelectorAll('.logged').forEach(elem => elem.style.display = 'none');
    document.querySelector('.user-displayName').innerText = '';
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        logged(user);
    } else {
        if(typeof IS_DASHBOARD !== 'undefined' && IS_DASHBOARD) {
            location.replace('index.html');
        }
        notLogged()
    }
});