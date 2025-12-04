

import React, {  useState,useEffect} from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Form = () => {

  const[showpassword,setShowPassword]=useState(false)

  useEffect(()=>{
    const form=document.getElementById("form");
    const errormessage=document.getElementById("errormessage");

if (!form || !errormessage) return;       //agar form ya error message element nahi mila to kuch na karo.

const handleSubmit=(e)=>{
  e.preventDefault();
}
    
    form.addEventListener('submit',function(e){
      e.preventDefault(); 
  
    
 

let name=document.getElementById("name").value.trim();    //name id wale input field se value lo, extra spaces hatao, aur usse name variable me store karo
let email=document.getElementById("email").value.trim();
let password=document.getElementById("password").value.trim();
let phone=document.getElementById("phone").value.trim();

  
 console.log(name,email,password,phone)
      
  if(name === ""){
    errormessage.textContent ="Name is required";
  return;
  }

  if(!email.includes("@") || !email.includes(".")){       //includes() ek JavaScript ka function hai jo check karta hai ki koi specific character ya word string ke andar present hai ya nahi.

    errormessage.textContent="Invalid email";
    return;
  }

  let at=email.indexOf("@");         //Email me “@” kidhar aaya hai, uska index dega
  let dot=email.lastIndexOf(".");    //Email me last wala dot (.) kidhar aaya hai

  if(at > dot || dot === email.length-1 || at===0){       //Agar @ dot ke baad aa jaye → email galat hai      //Last character agar dot ho → email invalid   //Email kabhi bhi @ se start nahi kar sakti
    errormessage.textContent="Invalid email format";
    return;
  }

 let charAfterAt=email[at+1];    //@ ke turant baad ka character
 if(!isNaN(charAfterAt)){        //check karta hai ki value number hai ya nahi.
  errormessage.textContent="Domain cannot start with a number";
  return;
 }

  if(password.length < 8){
    errormessage.textContent="password must be 8 cherecters long";
    return;
  }

  let hasupper = false;               //Starting me false rakha → matlab abhi tak uppercase letter nahi mila.
  for(let i=0; i < password.length ;i++){    //Password ke har character ko ek-ek karke check karenge.
    if(password[i] >= 'A' && password[i] <= 'Z'){
      hasupper=true;             //hasupper ko true kar diya (matlab uppercase mil chuka hai)
      break;                     //break se loop turant ruk jaata hai
    }
  }

  if(!hasupper){
    errormessage.textContent="password must have one uppercase letter";
    return;
  }

  if(phone.length!==10){     //phone no ka length 10 digit tak nhi ho tho message ye aaye 
    errormessage.textContent="phone no must be 10 digits";
    return;
  }

  if(isNaN(phone)){   //Agar value number Na ho → returns true    //Agar value number ho → returns false
    errormessage.textContent="phone must contain only number";
    return;
  }


  errormessage.style.color="green";
errormessage.textContent="form sumitted successfully";

});

form.addEventListener("submit",handleSubmit)        //Ye line form submit hone par handleSubmit function ko call karega.

return()=>{
  form.removeEventListener("submit",handleSubmit);  //cleanup ke liye listener hata dena
};
  },[]);

  



  return (
    <div className="w-full h-auto bg-gray-50 flex justify-center items-center flex-col ">
    <h1 id='errormessage' className="text-2xl font-black p-5">Form</h1>

       <form
       id='form'
        className="bg-white p-6 rounded-2xl shadow-2xl w-80"
      >
  
        <label className="font-semibold">Name:</label>
        <input
        id='name'
          type="text"
          name="name"
          className="w-full p-2 mt-1 border rounded-md bg-gray-100"
          />
       
        <label className="font-semibold">Email:</label>
        <input
        id='email'
          type="email"
          name="email"
          className="w-full p-2 mt-1 border rounded-md  bg-gray-100"
        />
      
       <div className='w-full relative'>
         <label className="font-semibold">Password:</label>
        <input
        id='password'
          type={showpassword ? "text" : "password"} 
          name="password"
          className="w-full p-2 mt-1 border rounded-md  bg-gray-100"
        />
        <button type='button' className=' absolute top-10 right-3 cursor-pointer' onClick={()=>setShowPassword(!showpassword)}>{showpassword ? <FaEye /> : <FaEyeSlash />}</button>

       </div>
      
        <label className="font-semibold">Phone Number:</label>
        <input
        id='phone'
          type="text"
          name="phone"
          className="w-full p-2 mt-1 border rounded-md  bg-gray-100"
        />
       
        <button
          type="submit"
          className="w-full bg-blue-400 text-white mt-4 p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}; 


export default Form;

