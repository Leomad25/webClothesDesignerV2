module.exports = {
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
        deserialize: ['Ah ocurrdio un error al deserizar el usuario.', 'El usuario al que se intentan decerializar no se encuentra en la base de datos.']
    }
}