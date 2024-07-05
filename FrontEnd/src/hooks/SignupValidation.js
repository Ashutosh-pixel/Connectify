import toast from 'react-hot-toast'

export default function SignupValidation(userInfo)
{
    
    if(!userInfo.username || !userInfo.password || !userInfo.fullname || !userInfo.confirmpassword || !userInfo.gender){
        toast.error("please fill all details");
        return false;
    }

    if(userInfo.password !== userInfo.confirmpassword){
       toast.error("password not match");
       return false;
    }

    if(userInfo.password.length < 6){
        toast.error("password must be at least 6 characters");
        return false
    }
    return true;
}