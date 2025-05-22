import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";

function Register(){
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
                <input type="password" onInput={passType}></input>
                <button type="submit" disabled={!sendFire}>Register</button>
            </form>
        </div>
    )

    function emailType(e){
        setEmail(e.target.value)
    }   
    function passType(e){
        setPass(e.target.value)
    }
    async function setInfo(e){
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword(auth,email,pass)
            Swal.fire({
                title: "complete",
                icon: "success",
                draggable: true
              }).then(()=>{
                navigate('/login');
                return signOut(auth);
              })
        }   
        catch(err){
            alert('สร้างบัญชีไม่สำเร็จ')
            console.log(err);
        }
    }
}

export default Register