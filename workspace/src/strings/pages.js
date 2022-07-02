module.exports = {
    pageNotFound: {
        title: 'Dirección no encontrada',
        article: [
            {
                title: 'Ups...',
                text: [
                    {p: 'Lo sentimos, la dirección a la intentaste acceder no puedo ser encontrada.'}
                ],
                btn: [
                    {btn: 'Regresar al inicio'}
                ]
            }
        ],
    },
    home: {

    },
    auth: {
        register: {
            title: 'Formulario de registro',
            article: [
                {
                    title: 'Registrar nuevo usuario',
                    text: [
                        {p: 'Nombre'},
                        {p: 'Apellido'},
                        {p: 'e-Mail'},
                        {p: 'Contraseña'},
                        {p: 'Confirmar contraseña'}
                    ],
                    input: [
                        {input: '- Seleccione su genero -'},
                        {input: 'Mujer (Sra.)'},
                        {input: 'Hombre (Sr.)'},
                    ],
                    btn: [
                        {btn: 'Registrarme'},
                        {btn: 'Ya tengo cuenta'},
                        {btn: 'Regresar al inicio'}
                    ]
                }
            ]
        },
        login: {
            title: 'Formulario de ingreso',
            article: [
                {
                    title: 'Registro de usuario',
                    text: [
                        {p: 'e-Mail'},
                        {p: 'Contraseña'}
                    ],
                    btn: [
                        {btn: 'Ingresar'},
                        {btn: '¿Olvidaste la contraseña?'},
                        {btn: 'No tengo cuenta'},
                        {btn: 'Regresar al inicio'}
                    ]
                }
            ]
        },
        activation: {
            title: 'Activación de cuenta',
            article: [
                {
                    title: 'Clave de activación',
                    text: [
                        {p: 'La clave de activación fue enviada a su direccion de correo.'},
                        {p: 'Tenga presente que la clave puede durar unos cuantos minutos en llegar.'},
                        {p: 'Clave'}
                    ],
                    btn: [
                        {btn: 'Validar'},
                        {btn: 'Reenviar la clave'},
                        {btn: 'Corregir mi direccion de correo'}
                    ]
                }
            ]
        }
    },
    tickets: {
        add: {
            title: 'Tickets',
            article: [
                {
                    title: 'Crear nuevo ticket',
                    text: [
                        {p: 'Tipo de trabajo:'},
                        {p: 'Descripción:'},
                        {p: 'Escriba una descripción del producto que desea.'},
                        {p: 'Tenga en cuenta que este proceso es para que una de nuestras modistas pueda leer su propuesta, las medidas se solicitaran mas adelante en el proceso.'},
                        {p: 'No ha agreado ninguna imagen de referencia.'}
                    ],
                    select: [
                        {opt: '- Seleccione una opción -'}
                    ],
                    btn: [
                        {btn: 'Agregar imagen de referencia'},
                        {btn: 'Eleminar imagen'},
                        {btn: 'Enviar tickets'}
                    ]
                }
            ]
        }
    }
}