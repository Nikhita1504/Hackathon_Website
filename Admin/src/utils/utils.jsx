import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";




 const handleSucess = (msg) => {
  toast.success(msg, {
      position: 'top-right'
  })
}

 const handleError = (msg) => {
  toast.error(msg, {
      position: 'top-right'
  })
}

const getToken = () =>{
  return sessionStorage.getItem('token')
}

const isTokenValid = () =>{
  const token = getToken();
  if(token){
    return true;
  }else{
    return false;
  }
}

const isAdmin = () =>{
  const token = getToken();
  if(!token){
    return false;
  }
  try{
  const decoded = jwtDecode(token);
  const { isAdmin } = decoded; 
  if(isAdmin){
    return true;
  }else{
    return false;
  }
  }catch(err){
    console.log(err)
   return false;
  }
}

export {handleError , handleSucess , isTokenValid , isAdmin}