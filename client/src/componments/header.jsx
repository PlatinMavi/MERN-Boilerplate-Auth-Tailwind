import { useContext } from "react";
import { useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../usercontext";

export default function Header(){
  const {setUserInfo,userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/user/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      }).catch((err)=>{console.log(err)});
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/user/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(
      setUserInfo(null)
    )
    ;
  }

  const username = userInfo?.username;

  return(
      <header className=' flex justify-between font-bold text-2xl  p-4 border border-black '>
          <Link to="/" className="logo">Boilerplate</Link>
          <nav className=' flex gap-4'>
              {username && (
                  <>
                      <div onClick={logout} className="logout cursor-pointer">Logout</div>
                  </>
              )}
              {!username && (
                  <>
                      <Link to="/login" className="login ">Login</Link>
                      <Link to="/register" className="register ">Register</Link>
                  </>
              )}
              
          </nav>
    </header>
  )
}