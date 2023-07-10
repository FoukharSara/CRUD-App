var Userdb = require('../model/model')


//create user and save it
exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    const user= new Userdb({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        contract:req.body.contract
    })
    user
    .save(user)
    .then((data)=>
        // res.send(data)
        res.redirect('/')
    )
    .catch(err=>{res.status(500).send({
        message : err.message || "Some error occurred while creating a create operation"
    })})
}


//find users
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }}

exports.update=(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body, { useFindAndModify: false})
    .then(data=>{
        res.send(data)
        res.redirect('/')})
    .catch(err=>{res.status(500).send({message : err.message || "Some error occurred while creating a create operation"})})
}