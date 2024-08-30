const bcrypt=require('bcryptjs')
const UserModel=require('../models/user.model')
exports.signUp=async(req,res)=>{

    try{
        //1. first read the request from user nd create js object
    const userObj={
        name:req.body.name,
        email:req.body.email,
        userId:req.body.userId,
        password:bcrypt.hashSync(req.body.password,8),
        userType:req.body.userType,
     }
     if(!userObj.userType || userObj.userType==='CUSTOMER'){
        userObj.userStatus='APPROVED'
     }
     else{
        userObj.userStatus='PENDING'
     }
  //2.insert data of user into database
  const savingUser=await UserModel.create(userObj)
   //3.fetch data from database to show in frontend

  
  res.status(201).send(savingUser)


    }
    catch(err){
console.log("error while registering user",err.message)
   res.status(500).send({
    message:"some internal error while registering"
})
    }
}

exports.signIn=async(req,res)=>{
   try{
     // 1.first read the userid and password of user from request
     const userIdFromReq=req.body.userId;
     const passwordFromReq=req.body.password;
     // 2.check entered userId matches with registered userid
     const validUser=await UserModel.findOne({userId:userIdFromReq})
     if(!validUser){
         return res.status(401).send({
             message:"userId is not correct"
         })
     }
   //3.check entered password is correct or not
     const isValidPassword=bcrypt.compareSync(passwordFromReq,validUser.password)
 
     if(!isValidPassword){
         return res.status(401).send({
             message:"password is not correct"
         })
     }
     res.status(200).send(validUser)
   }
   catch(err){
    console.log('error while login ',err.message)
    res.status(500).send({
        message:"internal server error while signin"
    })
   }

}