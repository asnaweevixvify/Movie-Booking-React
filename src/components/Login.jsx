import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [sendFire,setFire] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(email === '' || pass === ''){
            setFire(false)
        }
        else{
            setFire(true)
        }
    },[email,pass])

    return(
        <div className="login-container">
            <form onSubmit={setInfo}>
                <p>Email</p>
                <input type="text" onInput={emailType}></input>
                <p>Password</p>
                <input type="password" onInput={passInput}></input>
                <button type="submit" disabled={!sendFire}>Log in</button>
                <Link to='../register'><h5>ยังไม่มีบัญชี</h5></Link>
            </form>
        </div>
    )
    function emailType(e){
        setEmail(e.target.value)
    }
    function passInput(e){
        setPass(e.target.value)
    }
    async function setInfo(e){
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth,email,pass)
            Swal.fire({
                title: "complete",
                icon: "success",
                draggable: true
              }).then(()=>{
                navigate('/');
              })
        }   
        catch(err){
            alert('เข้าสู่ระบบไม่สำเร็จ')
            console.log(err);
        }
    }
}

export default Login