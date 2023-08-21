import React from 'react';


const jsonContext=React.createContext()

const  GlobalState=(props)=> {
  const [myjson,setMyjson]=React.useState(null) 
  const [callStore,setCallStore]=React.useState(false) 
  const [globalAcc,setGlobalAcc]=React.useState('live') 
  const [earningmodal,setEarningmodal]=React.useState(false) 
  const [hedge,setHedge]=React.useState(false) 
  const [safemode,setSafeMode]=React.useState(false) 
  const [home,setHome]=React.useState(true) 
  const [otpMode,setOtpMode]=React.useState(false) 
  const [AgreeSuperbot,setAgreeSuperbot]=React.useState('false') 
  const[appVer,setAppVer]=React.useState('') 
  const [UID,setUID]=React.useState('') 
  const [amt,setAmt] = React.useState('')
  const [isHedgeBot,setIsHedgeBot]=React.useState('0') 
  const [isSuperBot,setIsSuperBot]=React.useState('0') 
  const [mainBal,setMainBal]=React.useState('') 
 return (
  <jsonContext.Provider 
   value={{
      myjson,
      setMyjson,
      callStore,
      setCallStore,
      globalAcc,
      setGlobalAcc,
      earningmodal,
      setEarningmodal,
      hedge,
      setHedge,
      safemode,
      setSafeMode,
      home,
      setHome,
      otpMode,setOtpMode, 
      AgreeSuperbot,setAgreeSuperbot, 
      appVer,setAppVer, 
      UID,setUID,
      amt,setAmt,
      isSuperBot,setIsSuperBot,
      isHedgeBot,setIsHedgeBot,
      mainBal,setMainBal
  }}
  >
   {props.children}
  </jsonContext.Provider>
 );
 }


export {GlobalState,jsonContext};

