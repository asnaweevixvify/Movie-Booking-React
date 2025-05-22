import { useState , useEffect } from 'react'
import '../components/App.css'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import Swal from 'sweetalert2'

function Nav(){

    const [status, setStatus] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
          if (user) {
            setStatus(true);
            navigate('/');
          } else {
            setStatus(false);
          }
        });
        return () => unsubscribe();
      },[]);

    return(
        <div className="nav-container">
            <ul>
                <Link to='/'><li>Home</li></Link>
                {status && <Link to='/history'><li>History</li></Link>}
                {!status && <Link to='/login'><li>Login</li></Link>}
                {status && <li onClick={logOut}>Sign out</li>}
            </ul>
        </div>
    )
    function logOut(){
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Log out!",
                icon: "success"
              }).then(()=>{
                return signOut(auth)
              })
            }
          });
    }
}

export default Nav