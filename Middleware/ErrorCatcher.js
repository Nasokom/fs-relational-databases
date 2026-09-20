const ErrorCatcher = async(err,req,res,next) => {
console.log(err)
 if(err.errors){
            const errors = err.errors.map(e=>e.message).join(' ')
            console.log(errors)
            return res.status(400).send(errors)
        }
            console.error(err)
    res.status(500)
}

module.exports = ErrorCatcher