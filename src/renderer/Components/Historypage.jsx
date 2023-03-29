/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react'
import Historyelement from './Historyelement';

export default function Historypage({page,setPage}) {
  const [history,setHistory]=useState([])
  useEffect(()=>{
    window.electron.ipcRenderer.sendMessage('ipc-history','req');
    window.electron.ipcRenderer.once('ipc-history',(res)=>{
      console.log(res)
      setHistory(res)
    })
  },[page])
    return (
      <div className="container">
        <div className="navbar" css={css`display:flex;align-items:center;justify-content:space-between;padding:12px 20px;`}>
          <h2 css={css`
          font-weight:700;
          margin: 0;
          color: #00314B;
          `}>History</h2>
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" css={css`cursor:pointer;padding:4px`} onClick={()=>{setPage('home')}}>
<path d="M8.27455 6L11.686 2.58852C12.1047 2.16989 12.1047 1.49114 11.686 1.07216L10.9278 0.313977C10.5092 -0.104659 9.83045 -0.104659 9.41148 0.313977L6 3.72545L2.58852 0.313977C2.16989 -0.104659 1.49114 -0.104659 1.07216 0.313977L0.313977 1.07216C-0.104659 1.4908 -0.104659 2.16955 0.313977 2.58852L3.72545 6L0.313977 9.41148C-0.104659 9.83011 -0.104659 10.5089 0.313977 10.9278L1.07216 11.686C1.4908 12.1047 2.16989 12.1047 2.58852 11.686L6 8.27455L9.41148 11.686C9.83011 12.1047 10.5092 12.1047 10.9278 11.686L11.686 10.9278C12.1047 10.5092 12.1047 9.83045 11.686 9.41148L8.27455 6Z" fill="#00314B"/>
</svg>

        </div>
        {history.length > 0 ? (
  <div className="res-cont">
    {history.map((entry, i) => {
      return <Historyelement el={entry} key={i} />;
    })}
  </div>
) : (
  <h3 css={css`
  text-align: center;
  color: #00314B;
  font-weight: 700;
  margin: 20px 0;

  `}>Your history is empty...</h3>
)}

      </div>
    );
  }
