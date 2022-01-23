const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');


admin.initializeApp();

/**
 * Aqui utilizamos os GMail para envio de e-mails
 * para mais exemplos de utilização veja a documentação em https://nodemailer.com/about/
 */
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'youremail@gmail.com',
		pass: 'yourgmailpassword'
	}
});

/**
 * Atualiza quantidade de inscritos
 * @param {string} eventId 
 * @param {firestore.FieldValue.increment} increment 
 */
const _updateSubscribers = async (eventId, increment) => {
    try {
        return await admin.firestore().collection('events').doc(eventId)
            .update({
                subscribers: increment
            });
    }catch(e) {
        return await (Promise.resolve(e.toString()));
    }
};


exports.updateAtSub = functions.firestore.document('events/{eventId}/subscriptions/{subscriptionId}')
    .onCreate(async (snapshot, context) => {
        const user = snapshot.data();
        const eventId = context.params['eventId'];
        const eventDoc = await admin.firestore().collection('events').doc(eventId).get();
        const event = eventDoc.data();
        const mailOptions = {
            from: 'FromName <fromemail@gmail.com>',
            to: 'dest@gmail.com',
            subject: `Nova inscrição em ${event.title}`,
            html: `<p style="font-size: 16px;">Olá,</p>
                <p style="font-size: 16px;">
                    O(a) usuário(a) <b>${user.name}</b> se inscreveu em seu evento.
                </p>
            `
        };
  
        const increment = admin.firestore.FieldValue.increment(1);
        return _updateSubscribers(eventId, increment).then(snapshot => {
            return transporter.sendMail(mailOptions, (err, info) => {
                if(err) return err.toString();
                return `Mensagem enviada com sucesso. Id: ${info.messageId} | Response: ${info.response}`;
            });
        });
    });

exports.updateAtUnsub = functions.firestore.document('events/{eventId}/subscriptions/{subscriptionId}')
    .onDelete((snapshot, context) => {
        const eventId = context.params['eventId'];
        const increment = admin.firestore.FieldValue.increment(-1);
        return _updateSubscribers(eventId, increment);
    });