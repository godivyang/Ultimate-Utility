import { useEffect, useRef, useState } from "react";
import Card from "../component/Card";
import Button from "../component/Button";
import "./HomePage.css";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LogIn, EyeOff, Eye, Home } from "../component/Icons";
import { checkIfLogin, login, logout, signup } from "../api/userAuth";
import { apps, themes } from "../lib/constants";

const FormInput = ({label="", change=()=>{}, type="text", autoComplete="off"}) => {
    const [passIcon, setPassIcon] = useState(true);
    return(
        <div>
        <div className="Label">{label}&nbsp;
            {type === "password" ? 
            <Button icon={passIcon ? <Eye size={20}/> : <EyeOff size={20}/>} 
                press={()=>setPassIcon(!passIcon)} type="minimal"/> 
            : 
            undefined}
        </div>
        <input placeholder={label} className="Input"
            type={type === "password" ? passIcon ? "password" : "text" : type}
            onChange={(e) => change(e.target.value)} autoComplete={autoComplete}/>
        </div>
    );
};

const HomePage = ({showBusyIndicator}) => {
    const [theme, setTheme] = useState(themes[0]);
    const [currentPage, setCurrentPage] = useState("Main");
    const [logInPage, setLogInPage] = useState("LogIn");
    const [errorText, setErrorText] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [loginModel, setLoginModel] = useState({ email: "", password: "" });
    const [signupModel, setSignupModel] = useState({ name: "", email: "", password: "", confPassword: "" });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get("redirect");
        checkIfLogin().then((user) => {
            if(redirect) {
                window.location.href = process.env["REACT_APP_" + redirect];
            } else {
                setCurrentUser(user.name);
            }
        }).catch((error) => {
            // console.log(error);
            setCurrentUser(null);
            moveToLogIn();
        });
    }, []);

    useEffect(() => {
        let animationTimer = null;
        const timeout = setTimeout(() => {
        const alphas = document.querySelectorAll(".BigAlphabet");
        if(alphas.length) {
            animationTimer = (setInterval(()=>{
                alphas.forEach(alpha => {
                    if(Math.random() * 10 > 7) {
                        alpha.style.color = 
                        alpha.style.color === "var(--color-one)" ? "transparent" : "var(--color-one)";
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

    const changeToNextTheme = () => {
        const index = themes.findIndex((th) => th.name == theme.name);
        if(themes.length - 1 == index) setTheme(themes[0]);
        else setTheme(themes[index + 1]);
    }

    const moveToApps = () => {
        if(currentUser) 
            setCurrentPage("Apps");
        else moveToLogIn();
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
        <div className={`HomePage-Container ${theme.name}`}>
            <img src={theme.background} className="HomePage-Background"/>
            <AnimatePresence mode="wait">
            {currentPage === "Main" && <motion.div 
                key="Main"
                initial={{ x: -window.innerWidth, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -window.innerWidth, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className={`HomePage-Page`}>
            <div className="HomePage-Page-SubContainer NavBar">
                <Button text="About us"/>
                {currentUser ?
                <Button icon={<LogOut size={15}/>} text="Log Out" press={logoutClick}/>
                :
                <Button icon={<LogIn size={15}/>} text="Log In" press={moveToLogIn}/>
                }
                <Button text="Change Theme" press={() => changeToNextTheme()}/>
            </div>
            <div className="HomePage-Page-SubContainer Title">
                Welcome {currentUser} to
                <div className="BigTitle">
                    <div className="BigWord">
                        {"ULTIMATE".split("").map((w, i) => 
                        <div className="BigAlphabet" key={i}>{w}</div>)}
                    </div> 
                    <div className="BigWord">
                        {"UTILITY".split("").map((w, i) => 
                        <div className="BigAlphabet" key={i}>{w}</div>)}
                    </div>
                </div>
                <div className="Description">
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
                className={`HomePage-Page`}>
            <div className={"HomePage-Page-SubContainer Apps"}>
                <div className="AppsDrawer">
                {apps.map((app,i) => 
                    <Card title={app.app_title} description={app.app_description}
                    link={app.app_link} color={app.app_color} key={i}/>
                )}
                </div>
                <Button icon={<Home />} press={moveToMain}/>
            </div>
            </motion.div>}
            {currentPage === "LogIn" && <motion.div 
                key="LogIn"
                initial={{ x: window.innerWidth, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: window.innerWidth, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className={`HomePage-Page HomePage-Page-SubContainer LogIn`}>
            {logInPage === "LogIn" ?
            <>
            <div className="Title">Log In</div>
            <div className="SubTitle">
                Don't have an account?
                <Button press={moveToSignUpSection} text="Sign Up"/>
            </div>
            {errorText !== "" ? 
            <div className="Error">{errorText}</div>
            : undefined}
            <div className="HomePage-LogInPage">
                <div className="Section">
                    <FormInput label="Email" change={(value) => updateLoginModel("email", value)} 
                    type="email" autoComplete="email"/>
                    <FormInput label="Password" change={(value) => updateLoginModel("password", value)} 
                    type="password" autoComplete="current-password"/>
                    <Button text="Log In" press={loginClick}/>
                </div>
                <div className="Divider">
                    <div className="Line"></div>
                    or
                    <div className="Line"></div>
                </div>
                <div className="Section">
                    <Button text="Continue as a Guest"/>
                </div>
            </div>
            <div style={{marginTop: "20px"}}>
                <Button icon={<Home/>} press={moveToMain}/>
            </div>
            </>
            :
            <>
            <div className="Title">Sign Up</div>
            <div className="SubTitle">
                Already have an account?
                <Button press={moveToLogInSection} text="Log In"/>
            </div>
            {errorText !== "" ? 
            <div className="Error">{errorText}</div>
            : undefined}
            <div className="HomePage-LogInPage">
                <div className="Section">
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
                <div className="Divider">
                    <div className="Line"></div>
                    or
                    <div className="Line"></div>
                </div>
                <div className="Section">
                    <Button text="Continue as a Guest" />
                </div>
            </div>
            <div style={{marginTop: "20px"}}>
                <Button icon={<Home/>} press={moveToMain}/>
            </div>
            </>
            }
            </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default HomePage;