import React, { useEffect, useState,useRef } from 'react';
import "./App.css"
function Sport(){

    const [fs,setfs]=useState('');
    const [fp,setfp]=useState('');
    const [players,setPlayers]=useState([]);

    useEffect(()=>{
      const lss=localStorage.getItem('FS');
         const lsp=localStorage.getItem('FP');

         if (lss && lsp){
             setfs(lss);
             setfp(lsp);
         }

     },[]);

    useEffect(()=>{
        if (fs==='Cricket'){
            setPlayers(['Virat','ABD','Kane']);
        }
        else if(fs==='Football'){
            setPlayers(['Messi','Ronaldo','Neymar']);
        }
        else if (fs==='Basketball'){
            setPlayers(['Lebron','Curry','Luka']);
        }
        else{
            setPlayers([]);
        }
        console.log(fs);
        localStorage.setItem('FS',fs);
        localStorage.setItem('FP',fp);
    },[fs,fp]);
    //  useEffect(()=>{
    //      if (fs && fp){
    //          localStorage.setItem('FS',fs);
    //          localStorage.setItem('FP',fp);
    //      }
    //  },[fs,fp]);
    function ssport(e){
        const ss=e.target.value;
        setfs(ss);
        setfp('');
    };
    function splayer(e){
        const sp=e.target.value;
        setfp(sp);
    }
    // const Cricketplayers=['Virat','ABD','Kane'];
    // const Footballplayers=['Messi','Ronaldo','Neymar'];
    // const Basketballplayers=['Lebron','Curry','Luka'];
    
    // if (fs=='Cricket'){
    //      setPlayers(Cricketplayers);
         
    // }else if(fs=='Football') {
    //      setPlayers(Footballplayers);
    // }
    //  else if (fs=='Basketball'){
    //      setPlayers(Basketballplayers);
    // }



    return(
        <div id='d1'>
            <h2>Your Favourite Player</h2>
            <label>Favourite Sport: </label>
            <input type='text' value={fs} ></input>

            <br/><br/>

            <label>Favourite player: </label>
            <input type='text' value={fp}></input>

            <br/><br/>
            <select  value={fs} onChange={ssport}>
                    <option defaultValue="">Select Sport</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                </select>

                <select value={fp} onChange={splayer} disabled={!fs}>
                    <option defaultValue="Select Players">Select Players </option>
                    {players.map((player,index)=>(
                        <option key={index} value={player}>
                            {player}
                        </option>
                    ))}
                </select>
            
        </div>

    );
}
export default Sport;
