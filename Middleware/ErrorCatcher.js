const ErrorCatcher = async(err,req,res,next) => {
 if(err.errors){
            const errors = err.errors.map(e=>e.message)
            console.log(err)
            return res.status(400).send({error:errors})
        }

    return res.status(401).send(err.message).end()
    res.status(500)
}

module.exports = ErrorCatcher