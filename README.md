# Friendly Event

Esse é o código do projeto apresentado durante a Talk dia dia 09 de Abril de 2020 no canal do GDG Capinas. 

Veja a talk completa no YouTube https://www.youtube.com/watch?v=_Rlm8gU-748

## Overview
Esse projeto consiste em um pequeno Meetup. Onde é possível criar eventos e é possível se inescrever nos eventos disponíveis.

Para isso fazemos uso das ferramentas: **Firebase Authentication**, **Cloud Firestore**, **Cloud Storage**, **Cloud Functions** e **Firebase Hosting**

## Como usar esse projeto?

1. Faça o fork desse projeto e clone ele localmente em sua máquina

2. Crie um projeto no Console do Firebase em https://console.firebase.google.com/

3. No painel do seu projeto crie uma aplicação web.

4. Copie as configurações do app e adicione ao arquivo `firebase-config.js`

Após seguir os passos acima já será possível utilizar o projeto, porém as Cloud Functions não vão funcionar.

Nesse projeto as Cloud Functions é que vão atualizar a contagem de números de inscritos em um evento e enviar e-mails de notificação.


Para usar as funcionalidades do Functions e do Hosting siga as intruções da próxima seção.

## Configurando Hosting e Functions com a CLI

1. Tenha o Node instalado em sua máquina

2. Adicione a CLI do Firebase com o comando `npm i -g firebase-tools`

3. Use o comando `firebase login` para se autenticar.

4. Inicie o projeto Firebase com `firebase init`

5. Selecione as features **Functions** e **Hosting**

6. Selecione ou crie um novo projeto

7. Nossas features já estão adicionadas, então sempre que ele perguntar se é para sobrescrever algum arquivo selecione NÃO (N)

8. Após isso execute o comando `firebase deploy` para que as funções sejam enviadas para o servidor e para que a página seja publicada no Firebase Hosting.