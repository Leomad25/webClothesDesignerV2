module.exports = function(req) {
    //console.log(req.session.flash)
    if (req.session.flash) {
        // Success
        if (req.session.flash.full_success) return {
            type_full: true,
            class: 'success',
            title: 'satisfactorio',
            message: req.flash('full_success')
        }
        // Errors
        if (req.session.flash.full_error) return {
            type_full: true,
            class: 'error',
            title: 'error',
            message: req.flash('full_error')
        }
        // Info
        if (req.session.flash.full_info) return {
            type_full: true,
            class: 'info',
            title: 'información',
            message: req.flash('full_info')
        }
    }
    return undefined;
}