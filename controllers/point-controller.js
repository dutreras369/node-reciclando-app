
const panel = (req, res) => {
    res.render('point/panel', {
        page: "Panel", 
        session: true
    })
}

const createPoint = (req, res) => {
    res.render('point/create-point', {
        page: "Creando un Punto", 
        session: true
    })
}

export {
    panel,
    createPoint
}