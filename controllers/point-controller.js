
const admin = (req, res) => {
    res.render('point/admin', {
        page: "Panel", 
        session: true
    })
}

export {
    admin
}