
const notfound = async (req,res)=> {
    res.status(404).send('route not found in server.')
}

module.exports = notfound