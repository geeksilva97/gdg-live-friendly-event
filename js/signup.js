const formSignup = document.querySelector('form.signup');
const formFields = document.querySelectorAll('form.signup input');

formSignup.addEventListener('submit', (e) => {
    e.preventDefault();
    // alert('criando sua conta');
    console.log(formFields);
    const formData = new FormData();
    formFields.forEach(field => {
        console.log(field.name, field.value);
        formData.append(field.name, field.value);
    });


    if (formData.get('password') !== formData.get('confirm-password')) {
        alert('As senhas não correspondem');
        return;
    }

    // creating user
    this.firebase.auth().createUserWithEmailAndPassword(formData.get('email'), formData.get('password'))
        .then(data => {
            const user = data.user;//this.firebase.auth().currentUser;
            if (user) {
                // update profile
                user.updateProfile({ displayName: formData.get('name') });

                const usersCollection = this.firebase.firestore().collection('users');
                let key = user.uid;

                usersCollection.doc(key).set({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    occupation: 'Especialista em quarentena'
                }).catch(err => {
                    console.log('Erro ao registrar informações');
                    console.error(err);
                });

                alert('Conta criada com sucesso');
                modalSignUp.classList.toggle('is-active');

                // enviando o e-mail de confirmação
                // user.sendEmailVerification()
                //     .then(() => {
                //         alert('Sua conta foi criada com sucesso. Um link de confirmação foi enviado para o endereco ' + formData.get('email'));
                //         this.modal.classList.remove('is-active');
                //         this.camposFormCriarConta.forEach(campo => campo.value = '');
                //     })
                //     .catch(err => console.error(err));
            }
        })
        .catch(error => {
            alert('Houve um erro inesperado ao criar a conta');
            console.error(error);
        });


    // console.log(formFields.get);
});