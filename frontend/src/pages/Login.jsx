import { useEffect, useState } from "react";
import {AiOutlineUser} from 'react-icons/ai';
import axios from "axios";
export default function Login(){


// const [firstName, setFirstName] = useState("");
// const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

useEffect(()=>{
axios.defaults.withCredentials = true;
axios.get("http://localhost:8000/sanctum/csrf-cookie").then((data)=>{
  console.log(data)});
  
},[]); 
// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     nome: 'Victor',
//     sobrenome: 'Nogueira'
//   }
// });

const handleSubmit = () => {
  const token=document.cookie.split("=")[1];
  console.log(token);

axios.post("http://localhost:8000/api/login",{
  email,
  password
},{headers: {"Content-Type":"application/json","X-XSRF-TOKEN":token}})
.then((data)=>console.log(data)).catch((err)=>console.log(err));

}
return (
  <>
  <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-200  ">
    <div className="bg-white w-4/12 h-5/6">
    <form className="flex flex-col bg-white shadow-xl w-400 max-h-80 ">
      <div className=" w-20 h-20 bg-fuchsia-800 m-auto rounded-full
       flex justify-center items-center mt-3 mb-3 ">
        <span style={{fontSize:"2.0em" ,color:"white"}}>
          <AiOutlineUser
          />
        </span>
      </div>

      {/* <label htmlFor="firstName" >
      <input type="text" name="fistName" id="firtsName" placeholder="firstName"
        className="border-solid border-2 bg-slate-200 "
        value={firstName}
        onChange={({target})=>setFirstName(target.value)} />
      </label>

      <label htmlFor="lastName" >
      <input type="text" name="lastName" id="lastName" placeholder="lastName"
        className="border-style: solid "
        value={lastName}
        onChange={({target})=>setLastName(target.value)} />
      </label> */}

      <label htmlFor="email" >
      <input type="email" name="email" id="email" placeholder="email"
        className="border-style: solid "
        value={email}
        onChange={({target})=>setEmail(target.value)} />
      </label>

      <label htmlFor="password" >
      <input type="password" name="password" id="password" placeholder="password"
        className="border-style: solid "
        value={password}
        onChange={({target})=>setPassword(target.value)} />
      </label>
      <button type="button" className=" bg-fuchsia-800 rounded text-white " onClick={handleSubmit}>Enter</button>
    </form>
    </div>
  </main>
  </>
)
}