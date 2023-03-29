/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react'
import Calculator from './Calculator'
import Historypage from './Historypage';

export default function Menu() {
  const [theme,setTheme]= useState('linear-gradient(194.85deg, #83EAF1 3.35%, #009FFD 97.83%)')
  useEffect(()=>{
    window.electron.ipcRenderer.sendMessage('ipc-change-bg-color',["get",theme]);
      window.electron.ipcRenderer.once('ipc-change-bg-color',(res)=>{
        if(res=="blue"){
          setTheme('linear-gradient(194.85deg, #83EAF1 3.35%, #009FFD 97.83%)')
        }else{
          setTheme('linear-gradient(194.85deg, #EC9F05 3.35%, #FF4E00 97.83%);')
        }
      })
  })
  const [page,setPage]=useState('home');

  const containerStyles = css`
  width: 100vw;
  min-height: 100vh;
  padding: 22px 0;
  background: ${theme};
`;
return (
  <div css={containerStyles} className="cont">
    {page=='home' && <Calculator setPage={setPage}/>}
    {page=="history" && <Historypage setPage={setPage} page={page} />}
  </div>
);
  }
