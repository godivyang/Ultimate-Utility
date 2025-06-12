import { useEffect, useRef, useState } from "react";
import Card from "../component/Card";
import Button from "../component/Button";
import BusyIndicator from '../component/BusyIndicator';
import "./HomePage.css";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LogIn, EyeOff, Eye, Home } from "../component/Icons";
import { checkIfLogin, login, logout, signup } from "../api/userAuth";

let background = "";
const bwBG = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXlxZ2k5bWtjcGlqa3h1N21yaWY5ZGxucWoxdmdnejNsa3Y4eWc5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QXQ0YJ4REhflNzP25u/giphy.gif";
const greenBG = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXRidmE0YXV5cWZsaGdkYzJpbWt5OHMyczhvaTF4YnU4eDB4NTY5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BRLez2vAFQrgf0Thqx/giphy.gif";

const apps = [
    {
      app_title: "Typing Bliss",
      app_description: "From casual to pro, all your typing needs in one app.",
      app_link: "typing-bliss",
      app_color: "rgb(255, 255, 0)"
    },
    {
      app_title: "Tracking Budget",
      app_description: "Record, visualize and plan you expenditures.",
      app_link: "tracking-budget",
      app_color: "rgb(255, 0, 255)"
    },
    {
      app_title: "Dashboard",
      app_description: "One place to track all your progress.",
      app_link: "dashboard",
      app_color: "rgb(0, 0, 255)"
    }
];

const FormInput = ({label="", change=()=>{}, type="text", autoComplete="off"}) => {
    const [passIcon, setPassIcon] = useState(true);
    return(
        <div className="HomePage-LogIn-FormInput">
            <div className="HomePage-LogIn-Label">{label}&nbsp;
                {type === "password" ? 
                <Button icon={passIcon ? <Eye/> : <EyeOff/>} size={15} 
                    press={()=>setPassIcon(!passIcon)} type="minimal"/> 
                : 
                undefined}
            </div>
            <input placeholder={label} className="HomePage-LogIn-Input"
                type={type === "password" ? passIcon ? "password" : "text" : type}
                onChange={(e) => change(e.target.value)} autoComplete={autoComplete}/>
        </div>
    );
};

const HomePage = ({showBusyIndicator}) => {
    const [currentPage, setCurrentPage] = useState("Main");
    const [passwordLogIn, setPasswordLogIn] = useState("password");
    const [passwordSignUp, setPasswordSignUp] = useState("password");
    const [passwordSignUpConfirm, setPasswordSignUpConfirm] = useState("password");
    const [logInPage, setLogInPage] = useState("LogIn");
    const [errorText, setErrorText] = useState("");
    const [loginState, setLoginState] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loginModel, setLoginModel] = useState({ email: "", password: "" });
    const [signupModel, setSignupModel] = useState({ name: "", email: "", password: "", confPassword: "" });

    const emailSignUp = useRef(null);
    const passSignUp = useRef(null);
    const passConfSignUp = useRef(null);

    // const { signUp, logIn, logOut, currentUser } = useAuth();
    // const currentUser = null;
    background = greenBG;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get("redirect");
        const ref = urlParams.get("ref");
        checkIfLogin().then((user) => {
            if(redirect) {
                window.location.href = redirect;
            } else {
                setCurrentUser(user.name);
                setLoginState(true);
            }
        }).catch((error) => {
            // console.log(error);
            setCurrentUser(null);
            setLoginState(false);
            moveToLogIn();
        });
    }, []);

    useEffect(() => {
        let animationTimer = null;
        const timeout = setTimeout(() => {
        const alphas = document.querySelectorAll(".HomePage-Main-BigAlphabet");
        if(alphas.length) {
            animationTimer = (setInterval(()=>{
                alphas.forEach(alpha => {
                    if(Math.random() * 10 > 7) {
                        alpha.style.color = 
                        alpha.style.color === "rgb(0, 255, 0)" ? "transparent" : "rgb(0, 255, 0)";
                    }
                });
            }, 3000));
        }
        }, 1000);
        return () => {
            clearTimeout(timeout);
            animationTimer && clearInterval(animationTimer);
        };
    }, [currentPage]);

    const loginClick = () => {
        const {email, password} = loginModel;
        showBusyIndicator(true);
        login({email, password}).then((user) => {
            setLoginState(true);
            setErrorText("");
            setCurrentUser(user.name);
            showBusyIndicator(false);
            moveToMain();
        }).catch(e => {
            // console.log(e);
            setErrorText(e.response ? e.response.data : e.message);
            showBusyIndicator(false);
        });
    };

    const signupClick = () => {
        const {name, email, password, confPassword} = signupModel;
        
        if(password !== confPassword) {
            setErrorText("Passwords didn't match");
            return;
        }
        showBusyIndicator(true);
        signup({ name, email, password }).then((user) => {
            setLoginState(true);
            setCurrentUser(user.name);
            setErrorText("");
            showBusyIndicator(false);
            moveToMain();
        }).catch((e) => {
          setErrorText(e.response ? e.response.data.message : e.message);
          showBusyIndicator(false);
        });
    };

    const logoutClick = () => {
        logout().then((user) => {
            setLoginState(false);
            setCurrentUser(null);
        }).catch(e => {
            // console.log(e);
        });
    }

    const updateLoginModel = (key, value) => {
        loginModel[key] = value;
        setLoginModel({...loginModel});
    };

    const updateSignupModel = (key, value) => {
        signupModel[key] = value;
        setSignupModel({...signupModel});
    };

    const moveToApps = () => {
        if(loginState) setCurrentPage("Apps");
        else {
            moveToLogIn();
        }
    }
    const moveToMain = () => {
        setCurrentPage("Main");
    }
    const moveToLogIn = () => {
        setCurrentPage("LogIn");
    }
    const moveToLogInSection = () => {
        setLogInPage("LogIn");
        setErrorText("");
    }
    const moveToSignUpSection = () => {
        setLogInPage("SignUp");
        setErrorText("");
    }
    return (
        <div className="HomePage-Container">
            <img src={background} className="HomePage-Background" alt="background"/>
            {showBusyIndicator === true ?
            <BusyIndicator show={showBusyIndicator}/>
            : undefined}
            <AnimatePresence mode="wait">
            {currentPage === "Main" && <motion.div 
            key="Main"
            initial={{ x: -window.innerWidth, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -window.innerWidth, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={`HomePage-Main-Container`}>
            {/* className={`HomePage-Main-Container ${currentPage === "Main" ? "" : "Hidden"}`}> */}
            <div className="HomePage-NavBar-Container">
                <Button text="About us"/>
                {currentUser ?
                <Button icon={<LogOut size={15}/>} text="Log Out" press={logoutClick}/>
                :
                <Button icon={<LogIn size={15}/>} text="Log In" press={moveToLogIn}/>
                }
                {/* <Button/> */}
            </div>
            <div className="HomePage-Title-Container">
                Welcome {currentUser} to
                <div className="HomePage-Main-BigTitle">
                    <div className="HomePage-Main-BigWord">
                        {"ULTIMATE".split("").map((w, i) => 
                        <div className="HomePage-Main-BigAlphabet"
                        key={i}>{w}</div>)}
                    </div> 
                    <div className="HomePage-Main-BigWord">
                        {"UTILITY".split("").map((w, i) => 
                        <div className="HomePage-Main-BigAlphabet"
                        key={i}>{w}</div>)}
                    </div>
                </div>
                <div className="HomePage-Main-Description">
                {/* A collection of carefully designed feature-rich apps that helps to make passing time productive. */}
                Where productivity meets play — explore apps that are intuitive, enjoyable, and built to help you improve.
                </div>
                <Button text="Let's Go!" press={moveToApps}/>
            </div>
            </motion.div>}
            {currentPage === "Apps" && <motion.div 
            key="Apps"
            initial={{ y: window.innerHeight, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: window.innerWidth, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={`HomePage-Apps-Container`}>
            {/* className={`HomePage-Apps-Container ${currentPage === "Apps" ? "" : "Hidden"}`}> */}
                <div className={"HomePage-Apps-Apps"}>
                    {apps.map((app,i) => 
                        <Card title={app.app_title} description={app.app_description}
                        link={app.app_link} color={app.app_color} key={i}/>
                    )}
                </div>
                <Button icon={<Home />} press={moveToMain}
                />
            </motion.div>}
            {currentPage === "LogIn" && <motion.div 
                key="LogIn"
                initial={{ x: window.innerWidth, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: window.innerWidth, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className={`HomePage-LogIn-Container`}>
            {logInPage === "LogIn" ?
            <>
            <div className="HomePage-LogIn-Title">Log In</div>
            <div className="HomePage-LogIn-SubTitle">
                Don't have an account?&nbsp;
                <div className="HomePage-LogIn-Link"
                onClick={moveToSignUpSection}>Sign Up</div>
            </div>
            {errorText !== "" ? 
            <div className="HomePage-LogIn-Error">{errorText}</div>
            : undefined}
            <div className="HomePage-LogIn-LogIn">
                <div className="HomePage-LogIn-Section">
                    <FormInput label="Email" change={(value) => updateLoginModel("email", value)} 
                    type="email" autoComplete="email"/>
                    <FormInput label="Password" change={(value) => updateLoginModel("password", value)} 
                    type="password" autoComplete="current-password"/>
                    <Button text="Log In" press={loginClick}/>
                </div>
                <div className="HomePage-LogIn-Divider">
                    <div className="HomePage-LogIn-Line"></div>
                    or
                    <div className="HomePage-LogIn-Line"></div>
                </div>
                <div className="HomePage-LogIn-Section">
                    <Button text="Continue with Google"/>
                </div>
            </div>
            <Button icon={<Home/>} press={moveToMain} />
            </>
            :
            <>
            <div className="HomePage-LogIn-Title">Sign Up</div>
            <div className="HomePage-LogIn-SubTitle">
                Already have an account?&nbsp;
                <div className="HomePage-LogIn-Link" 
                onClick={moveToLogInSection}>Log In</div>
            </div>
            {errorText !== "" ? 
            <div className="HomePage-LogIn-Error">{errorText}</div>
            : undefined}
            <div className="HomePage-LogIn-LogIn">
                <div className="HomePage-LogIn-Section">
                    <FormInput label="Name" change={(value) => updateSignupModel("name", value)}
                        autoComplete="name"/>
                    <FormInput label="Email" change={(value) => updateSignupModel("email", value)} 
                        type="email" autoComplete="email"/>
                    <FormInput label="Password" change={(value) => updateSignupModel("password", value)} 
                        type="password" autoComplete="new-password"/>
                    <FormInput label="Confirm Password" change={(value) => updateSignupModel("confPassword", value)} 
                        type="password" autoComplete="new-password"/>
                    <Button text="Sign Up" press={signupClick}/>
                </div>
                <div className="HomePage-LogIn-Divider">
                    <div className="HomePage-LogIn-Line"></div>
                    or
                    <div className="HomePage-LogIn-Line"></div>
                </div>
                <div className="HomePage-LogIn-Section">
                <Button text="Continue with Google" />
                </div>
            </div>
            <Button icon={<Home/>} press={moveToMain} />
            </>
            }
            </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default HomePage;