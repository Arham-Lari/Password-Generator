import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'

function App(){
    const [lenght,setlenght] = useState(8);
    const [numberAllowed,setnumberAllowed] = useState(false);
    const [charAllowed,setcharAllowed] = useState(false);
    const [Password,setPassword] = useState("");

    const PasswordGenrator = useCallback(()=>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQESTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numberAllowed) str += "1234567890";
        if(charAllowed) str += "@!#%$^&**(){}<>?,[]";

        for(let i = 0; i< lenght; i++)
    {
            let rand = Math.random()*str.length + 1;
            pass += str.charAt(rand);
        }

        setPassword(pass);
    },[lenght,numberAllowed,charAllowed,setPassword]);

    useEffect(()=>{PasswordGenrator()},[lenght,charAllowed,numberAllowed,PasswordGenrator]);

    const passwordRef = useRef(null);

    const copyPasswordToClipboard = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.write(Password);
    },[Password])

    return (
        <>
            <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
                <h1 className='text-white text-center my-3'>Password generator</h1>
                <div className="flex shadow-2xl rounded-lg overflow-hidden mb-4">
                    <input
                        type='text'
                        value = {Password}
                        className='outline-none w-full py-1 px-3 bg-white rounded-lg text-center m-4'
                        placeholder='password'
                        readOnly
                        ref={passwordRef}
                    /> <button
                        onClick={copyPasswordToClipboard}
                        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
                    >copy</button>

                </div>
                <div className='flex text-sm gap-x-2'>
                    <div className='flex items-center gap-x-1'>
                        <input 
                            type="range"
                            min={6}
                            max={100}
                            value={lenght}
                            className='cursor-pointer'
                            onChange={(e) => {setlenght(e.target.value)}}
                        />
                        <label>Length: {lenght}</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            defaultChecked={numberAllowed}
                            id="numberInput"
                            onChange={() => {
                                setnumberAllowed((prev) => !prev);
                            }}
                        />
                        <label htmlFor="numberInput">Numbers</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            defaultChecked={charAllowed}
                            id="characterInput"
                            onChange={() => {
                                setcharAllowed((prev) => !prev )
                            }}
                        />
                        <label htmlFor="characterInput">Characters</label>
                    </div>
                </div>

            </div>
        </>
    )
}

export default App;
