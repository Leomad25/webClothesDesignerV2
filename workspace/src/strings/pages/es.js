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
    }
}