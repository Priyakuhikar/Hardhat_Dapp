import { useState, useEffect} from 'react'
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Memos from"./components/Memos";
import Buy from './components/Buy';
import chai from "./Share Anything.png";
import './App.css'

function App() {
const [state,setstate]=useState({
  provider:null,
  signer:null,
  contract:null
})

const[account,setAccount]=useState('Not connected')
useEffect(()=>{
  const template=async()=>{
    const contractAddres="0xd8705D61D63C00f35291d6D1402003b4074395cc";
    const contractABI=abi.abi;
   //Metamask part
   //1. In order do transactions on goerli testnet
   //2. Metamask consist of infura api which actually help unn connecting to the blockchain
  try{
   const{ethereum}=window;
   const account =await ethereum.request({
    method:"eth_requestAccounts"
   })

  window.ethereum.on("accountsChanged",()=>{
    window.location.reload()
  })
   setAccount(account);
   const provider = new ethers.providers.Web3Provider(ethereum);
   const signer = provider.getSigner();

   const contract = new ethers.Contract(
    contractAddres,
    contractABI,
    signer
   )
   console.log(contract)
   setstate({provider,signer,contract});
   
   }catch(error){
    console.log(error)
  }
}
  


  template();
},[])
  return (
    <div >
    <img src={chai} className="img-fluid" alt=".." width="100%" />
    <p style={{ marginTop: "10px", marginLeft: "5px" }}>
      <small>Connected Account - {account}</small>
    </p>
   
      <Buy state={state} />
      <Memos state={state} />
   
  </div>
      
  )
}

export default App
