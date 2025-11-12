import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';


const Week3_Updates = () => {

    const COLORS = ["#f87171", "#60a5fa", "#34d399"];

    

    const [count, setCount] = useState(0);
    const [bgColor, setBgColor] = useState("#fff");
    const [showMsg, setShowMsg] = useState(false);
    const [name, setName] = useState("");
    const [nameGreeting, setNameGreeting] = useState("");
    const [emailGreeting, setEmailGreeting] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    
    const MAX_NAME = 30;
    const nameLen = name.length; 
    const nameRemaining = MAX_NAME - nameLen;
    
    const handleReset = () => {
        setCount(0);
        setBgColor("#fff");
        setShowMsg(false);
        setName("");
        setNameGreeting("");
        setEmailGreeting("");
        setError("");
        setEmail("");
    }

    const handling_EmailSubmit = () => {
        if (!email.trim()) {
            alert("Please enter your email");
            return;
        }
        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email");
            return;
        } else {
            setEmailGreeting(`You entered email: ${email}`);
        }
    }


    const handling_NameSubmit = () => {
        {/* Still Debugging the Error Handlings to pop up */}
        setError (""); 
        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }
        if (name.trim().length < 3) {
            setError("Name must be at least 3 characters!");
            return; 
        }
        if (name.trim().length > 30) {
            setError("Name must be less than 30 characters!");
            return; 

        }
         setNameGreeting(`Hello, ${name.trim()}! Welcome to data analysis!`);
    }


    return (
    <div className="progress-container p-6 bg-white rounded-lg shadow-md max-w-md mx-auto" style = {{background: bgColor}}>
      {/* <h2 className="text-2xl font-bold text-center mb-6">Week 2 Progression</h2> */}
        <div className="space-y-4">
            {/* Counter row */}
            <div className="flex items-center justify-center gap-3">
                <Button onClick={() => setCount(c => c - 1)}>-</Button>
                <span className="text-lg font-medium">Count: {count}</span>
                <Button onClick={() => setCount(c => c + 1)}>+</Button>
                <Button onClick={() => setCount(0)}>Reset</Button>
            </div>
            <br></br>
            {/* Color picker row (stacked below counter) */}
            <div className="flex flex-col items-center">
                <span> PICK A BACKGROUND COLOR </span>
                <div className="flex items-center gap-3">
                    {COLORS.map(color => (
                        <Button
                            key={color}
                            style={{ background: color, width: 32, height: 32, borderRadius: '50%' }}
                            onClick={() => {
                                setBgColor(color);
                            }}
                        />
                    ))}
                </div>
            </div>
            <br></br>
            {/*Toggling Messages*/}
            <div className = "flex justify-center">
                <Button onClick = {() => setShowMsg(v => !v)}>
                    {showMsg ? "Hide?" : "Show Message"}
                </Button>
            </div>
            {showMsg && <p>Great Job! Now you can see the message, the message can toggle. </p>}
            <br></br>
            {/* Name Input Section */}
            <div className="flex flex-col items-center">
                <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange = {(e) => setName(e.target.value)}
                />
                <Button onClick={handling_NameSubmit}> Enter Your Name :/ </Button>
                {error && (<p className="text-center text-red-600 text-sm">{error}</p>)}
                {nameGreeting && <p className="text-green-600 font-medium">{nameGreeting}</p>}
                <br></br>
                <p
                aria-live="polite"
                className={`mt-1 text-sm ${nameLen > MAX_NAME ? 'text-red-600' : nameLen > MAX_NAME - 5 ? 'text-yellow-600' : 'text-muted-foreground'}`}
                >
                    {nameLen}/{MAX_NAME} {nameRemaining <= 5 && nameRemaining >= 0 ? `— ${nameRemaining} left` : ''}
                </p>
            </div>
            <br></br>
            {/*Email Input*/}
            <div className="flex flex-col items-center">
                <Input
                    placeholder = "Enter your email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <Button onClick = {handling_EmailSubmit}> Enter Your Email </Button>
                {emailGreeting && <p className="text-green-600 font-medium">{emailGreeting}</p>}
            </div>
            <br></br>
            {/*Resets Everything*/}
            <Button onClick= {handleReset}> Reset All </Button>
        </div>
    </div>
    );
};


export default Week3_Updates;



//Background color changing
