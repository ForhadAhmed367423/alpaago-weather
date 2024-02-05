import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css'
import Lottie from "lottie-react";
import loginAnimation from "../../../public/login.json"
import { GoogleAuthProvider, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import { app } from "../../../Firebase-config";
import { Authcontext } from "../../AuthProviders/AuthProvider";
import Swal from "sweetalert2";
const Login = () => {
    const [register, setRegister] = useState(false);

    // google login code

    const GoogleProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const navigate = useNavigate();



    const googleHandler = ()=>{
        signInWithPopup(auth,GoogleProvider)
        .then(result=>{
            const logIn = result.user;
            console.log(logIn)
            
            // userContext.setUser(logIn)
            // localStorage.setItem('userData', JSON.stringify(logIn))
            navigate('/');
            return alert("login succesfully")
        })
        .catch(error=>{
            console.error(error)
        })
    }


    // create Account with email and password

    const {createAccountWithEmail}= useContext(Authcontext);

    const handleSign=event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        

        

        createAccountWithEmail(email,password)
        .then(result=>{
            const user = result.user;
            updateProfile(user,{
                displayName: `${name} `
              })
            console.log(user);
            navigate('/');
            return alert("new user created")
        })
        .catch(error =>console.log(error))

        const date = new Date();
        const day = date.getDate();
        const month = date.getFullMonth();
        const year =date.getFullYear();
        const currentDate = `${day} ${month} ${year}`
        const propertyData = {email,currentDate};
        console.log(propertyData);


        fetch("http://localhost:5000/users",{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(propertyData),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "user added successfully.",
                        icon: "success",
                        confirmButtonText: "cool",
                    });
                }
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
            });
    } 
    


        // email pass login
        const { loginWithEmail }=useContext(Authcontext);
        const handleLog = event =>{
            
            event.preventDefault();
            const form = event.target;
            const email = form.email.value;
            const password = form.password.value;
            // const date = curre
            loginWithEmail(email,password)
                .then(result=>{
                    const loggedUser = result.user;
                    console.log(loggedUser);
                    
                    navigate('/');
                    return alert("User logged in");
                    })
                    .catch(error =>console.log(error))
        

        }


        
    return (
        <div className="w-80 md:w-96 lg:w-[800px] mx-auto bg-[#1D3557] login flex items-center relative overflow-hidden shadow-xl">
                {/* register form  */}
                <form onSubmit={handleSign} className={`p-8 w-full ${register ? 'lg:translate-x-0' : 'lg:-translate-x-full hidden lg:block'} duration-500`}>
                    <h1 className=" text-3xl font-bold  text-white lg:text-4xl pb-4">Register</h1>
                    <div className="space-y-5">
                        <label htmlFor="name" className="block  text-white">Name</label>
                        <input name="name"  required type="name" placeholder="John Doe" className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                        <label htmlFor="u_email" className="block text-white">Email</label>
                        <input name="email" required type="email" placeholder="example@example.com" className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                        <label htmlFor="u_password" className="block text-white">Password</label>
                        <input name="password" required type="password" placeholder=".............." min={5} className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"/>
                    </div>
                    {/* button type will be submit for handling form submission*/}
                    <button type="submit" className="py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-white text-white block">Submit</button>
                    <p className="mb-3 text-center  text-white">Already have an account?<Link onClick={() => {setRegister(!register);}} className="underline font-semibold text-white" >Login</Link></p>
                    <hr />
                    <button onClick={googleHandler} type="button" className="py-2 px-5 mb-4 mt-8 mx-auto block shadow-lg border rounded-md border-white text-white"><svg viewBox="-0.5 0 48 48" version="1.1" className="w-6 inline-block mr-3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>Google-color</title> <desc>Created with Sketch.</desc><defs></defs><g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Color-" transform="translate(-401.000000, -860.000000)"><g id="Google" transform="translate(401.000000, 860.000000)"><path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path><path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path><path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path><path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path></g></g></g></g></svg>Continue with Google</button>
                </form>
                {/* img */}
                <div className={`hidden lg:block absolute w-1/2 h-full top-0 z-50 duration-500 overflow-hidden bg-black/20 ${register ? 'translate-x-full rounded-bl-full duration-500' : 'rounded-br-full'}`}>
                    {/* <img src="https://source.unsplash.com/random" className="object-cover h-full" alt="img" /> */}
                    <Lottie className="object-cover h-full" animationData={loginAnimation} />

                </div>
                {/* login form */}
                <form onSubmit={handleLog} className={`p-8 w-full mr-0 ml-auto duration-500 ${register ? 'lg:translate-x-full hidden lg:block' : ''}`}>
                    <h1 className="text-3xl text-white font-bold lg:text-4xl pb-4">Login</h1>
                    <div className="space-y-5">
                        <label htmlFor="_email" className="block text-white">Email</label>
                        <input name="email" type="email" placeholder="example@example.com" className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                        <label htmlFor="_password" className="block text-white">Password</label>
                        <input name="password" type="password" placeholder=".............." min={5} className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"/>
                    </div>
                    {/* button type will be submit for handling form submission*/}
                    <button  type="submit" className="py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-white block  text-white">Submit</button>
                    <p className="mb-3 text-center  text-white">Don't have an account?<Link onClick={() => {setRegister(!register);}} className="underline font-semibold  text-white">Register</Link></p>
                    <hr />
                    <button onClick={googleHandler} type="button" className="py-2 px-5 mb-4 mt-8 mx-auto block shadow-lg border rounded-md border-white  text-white"><svg viewBox="-0.5 0 48 48" version="1.1" className="w-6 inline-block mr-3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>Google-color</title> <desc>Created with Sketch.</desc><defs></defs><g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Color-" transform="translate(-401.000000, -860.000000)"><g id="Google" transform="translate(401.000000, 860.000000)"><path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"></path><path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"></path><path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"></path><path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"></path></g></g></g></g></svg>Continue with Google</button>
                </form>
            </div>
    );
};

export default Login;