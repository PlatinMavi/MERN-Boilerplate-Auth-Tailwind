import { useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../usercontext";
import { useContext } from "react";

export default function LoginPage(){
  const [username,setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />}

  return(
    <main className=''>
      <div className="container mt-12 mx-auto ">
        <form onSubmit={login} className="w-max mx-auto p-12 flex flex-col gap-4 border border-black rounded-3xl">
            <h1 className="font-bold text-3xl text-center">Login</h1>

            <input type="text" placeholder="Username" name="username" id="username" className="p-2 border border-black rounded-xl"
            value={username} onChange={ev => setUsername(ev.target.value)}/>

            <input type="password" placeholder="Password" name="password" id="password" className="p-2 border border-black rounded-xl" 
            value={password} onChange={ev => setPassword(ev.target.value)}/>

            <button type="submit" className="p-2 border border-black rounded-2xl">Submit</button>
        </form>
      </div>
      
    </main>
  )
}