const formSignIn = document.querySelector('form.signin');
const formFieldsSignIn = document.querySelectorAll('form.signin input');

formSignIn.addEventListener('submit', (e) => {
    e.preventDefault();
    // alert('criando sua conta');
    console.log(formFieldsSignIn);
    const formData = new FormData();
    formFieldsSignIn.forEach(field => {
        formData.append(field.name, field.value);
    });

    this.firebase.auth().signInWithEmailAndPassword(formData.get('email'), formData.get('password'))
        .then(data => {
            formFieldsSignIn.forEach(campo => campo.value = '');
            modalSignIn.classList.toggle('is-active');
        })
        .catch(err => {
            alert('Falha ao efetuar o login');
            console.error(err);
        });


    // console.log(formFields.get);
});