module.exports = {
    middleware: {
        auth: {
            needUnlogin: ['No puedes acceder con una sesion iniciada a esta pestaña.'],
            needLogin: ['Primero tienes que iniciar sesion para acceder a esta pestaña.']
        },
        active: {
            needActiveAccount: ['Para acceder a esta pestaña necesitas activar tu cuneta'],
            yourAccountAlreadyActive: ['Tu cuneta ya se encuentra activada.']
        }
    },
    auth: {
        register: {
            error: {
                passwordNotMatch: ['La contraseña no coincide.'],
                genderNotSelected: ['Genero no seleccionado.'],
                emailIsRegistered: ['El email ingresado ya se encuentra registrado.'],
                dataNotStoraged: ['No se pudo almacenar el usario en la base de datos.', 'Puede intentarlo nuevamente.']
            }
        },
        login: {
            error: {
                emailNotRegistered: ['El email ingresado no se encuentra registrado.'],
                passwordIsInscorrect: ['La contraseña es incorrecta.']
            }
        },
        activation: {
            error: {
                NotStoreActivationKey: ['No se puedo guardar la clave de activación la base de datos.'],
                emailDontSend: (email) => {return ['El e-Mail no pudo ser enviado.', 'Verifique que el email ' + email + ', sea de correcto.']},
                exceededNumberOfAttempts: ['Usted ah exedido el nuemero maximo de intentos permitidos.', 'Una nueva clave fue enciada su direccion de correo.'],
                activateError: ['A ocurrido un problema al activar su cuenta.', 'Puede solicitar una nueva clave de activación'],
                keyDontMach: ['La clave de activación es incorrecta.', 'Trate nuevamente.']
            },
            success: {
                generatedActivationKey: ['Tu codigo fue generado satisfactoriamente.', 'Tu clave de activación fue enviada a tu correo electrónico.'],
                activateSuccess: ['Tu cuenta fue activada satisfactoriamente.']
            },
            info: {
                expiredKey: ['Su clave ah expirado.', 'Una nueva clave fue enciada su direccion de correo.']
            }
        },
        deserialize: ['A ocurrdio un error al deserizar el usuario.', 'El usuario al que se intentan decerializar no se encuentra en la base de datos.']
    }
}