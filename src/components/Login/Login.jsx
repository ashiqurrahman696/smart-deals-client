import { use, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {singInWithGoogle, signInUser, setUser, setLoading} = use(AuthContext);

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            toast.error("Email can't be empty");
            return;
        }
        else if (!emailPattern.test(email)) {
            toast.error("Invalid email");
            return;
        }
        else if (password === "") {
            toast.error("Password can't be empty");
            return;
        }
        signInUser(email, password).then(result => {
            const userInfo = result.user;
            setLoading(false);
            setUser(userInfo);
            toast.success("Logged in successfully");
        }).catch(error => {
            toast.error(error.code);
        });
    }

    const handleGoogleSignIn = () => {
        singInWithGoogle()
            .then((result) => {
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL
                }
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setUser(user);
                        setLoading(false);
                        toast.success("Google signup successful");
                    })
            })
            .catch((error) => {
                toast.error(error.code);
            });
        }
    return (
        <div className="min-h-screen flex justify-center items-center bg-neutral-100">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h2 className="text-center font-semibold text-4xl">Login</h2>
                    <p className="text-center">Don't have an account? <Link to="/register" className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">Register Now</Link></p>
                    <form onSubmit={handleLogin} className="fieldset">
                        <div>
                            <label className="label">Email</label>
                            <input type="text" name="email" className="input w-full mt-1" placeholder="Email" />
                        </div>
                        <div className="relative">
                            <label className="label">Password</label>
                            <input type={showPassword ? "text" : "password"} name="password" className="input w-full mt-1" placeholder="Password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute text-2xl right-2 bottom-2 z-10 cursor-pointer">
                                {showPassword ? <LuEyeOff /> : <LuEye />}
                            </button>
                        </div>
                        <button className="btn text-base-100 mt-4 bg-linear-to-br from-[#632EE3] to-[#9F62F2]">Sign In</button>
                        <div className="divider">OR</div>
                        {/* Google */}
                        <button onClick={handleGoogleSignIn} type="button" className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Sign In with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;