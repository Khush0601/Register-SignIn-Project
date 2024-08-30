const userController=require('../controllers/user.controller')
module.exports=(app)=>{
app.post('/signUpSignIn/api/v1/user/signUp',userController.signUp)
app.post('/signUpSignIn/api/v1/user/signIn',userController.signIn)
}