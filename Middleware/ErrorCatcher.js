const ErrorCatcher = async(err,req,res,next) => {
  if(err.errors){
    const errors = err.errors.map(e => e.message)
    console.log(err)
    return res.status(400).send({ error:errors })
  }
  if(err.code){
    return res.status(err.code).send(err.message).end()
  }

  if(err.message.includes('jwt')){
    return res.status(401).send(err.message).end()
  }
  console.log(err)
  return res.status(404).send(err.message).end()
}

module.exports = ErrorCatcher