import { signInWithGoogle } from '../services/firebase';
import '../App.css'

function Login() {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="grid row-span-2">
            <img src="./assets/logo.png"></img>
        </div>
        <div className="grid col-span-1">
        <h1 className="text-4xl text-center font-bold mb-4">Course Alerts</h1>
        </div>
        <div className="grid col-span-1">
          <button onClick={signInWithGoogle} className="button p-5">
            <div className="mt-1">
                <div className="flex gap-4">
                    <div className="w-1/6">
                        <img width="40px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    </div>
                    <div className="w-5/6">
                        <p className="text-center">Sign in with Google</p>
                    </div>
                </div>
            </div>
          </button>
        </div>
      </div>
        

    )
}

export default Login