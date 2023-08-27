import './App.css';
import IndexPage from "./pages/indexpage"
import LoginPage from "./pages/loginpage"
import RegisterPage from './pages/registerpage';
import  {Route,Routes} from "react-router-dom"
import { UserContextProvider } from './usercontext';
import Header from "./componments/header"

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Routes>

        <Route index element={<IndexPage/>}/>

        <Route path={"/login"} element={<LoginPage/>} />

        <Route path={"/register"} element={<RegisterPage/>} />

      </Routes>
    </UserContextProvider>
     
  );
}

export default App;
