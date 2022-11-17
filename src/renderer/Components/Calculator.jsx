/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react'
import Control from './Control'

export default function Calculator({setPage}) {
  const [formula,setFormula]=useState('')//stores the current formula/result
  const[prev,setPrev]=useState('') //Stores the previous formula
  const[toggleThemeSelector,setThemeSelector] = useState(false)

  const controls = ['%','÷','1','2','3','x','4','5','6','-','7','8','9','+']


    return (
      <div className="container">
        <div className="board" css={css`
        width: 385px;
        height: 90px;
        margin:  0 auto 20px auto;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 10px;
        padding:10px;
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        `}>
            <div className="nav">
              <div css={css`
              display:flex;
              justify-content:space-between;
              height:25px;
              align-items:center;
              `}>
              <div css={css`
              display:flex;
              width:40px;
              justify-content:space-evenly;
              height:25px;
              `}>
              <div css={css`cursor:pointer;`} onClick={()=>setPage('history')}>
              <svg width="16" height="16" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.75781 1.61133L0.960938 0.880859C0.607031 0.556445 0 0.786328 0 1.24395V3.60938C0 3.89512 0.250781 4.125 0.5625 4.125H3.14297C3.64453 4.125 3.89531 3.56855 3.54141 3.24414L2.81953 2.58242C3.63281 1.83691 4.75781 1.375 6 1.375C8.48438 1.375 10.5 3.22266 10.5 5.5C10.5 7.77734 8.48438 9.625 6 9.625C5.04375 9.625 4.15781 9.35215 3.42891 8.88594C3.08906 8.66895 2.62266 8.74414 2.38359 9.05566C2.14453 9.36719 2.22891 9.79473 2.56875 10.0139C3.54375 10.6348 4.72734 11 6 11C9.31406 11 12 8.53789 12 5.5C12 2.46211 9.31406 0 6 0C4.34297 0 2.84297 0.616602 1.75781 1.61133ZM6 2.75C5.68828 2.75 5.4375 2.97988 5.4375 3.26562V5.5C5.4375 5.6375 5.49609 5.76855 5.60156 5.86523L7.28906 7.41211C7.50938 7.61406 7.86562 7.61406 8.08359 7.41211C8.30156 7.21016 8.30391 6.88359 8.08359 6.68379L6.56016 5.2873V3.26562C6.56016 2.97988 6.30937 2.75 5.99766 2.75H6Z" fill="#00314B"/>
              </svg>
              </div>
              <div css={css`position:relative;cursor:pointer`} onClick={()=>{setThemeSelector(!toggleThemeSelector)}}>
              <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.66667 6C9.11333 6 8.66667 5.55333 8.66667 5C8.66667 4.44667 9.11333 4 9.66667 4C10.22 4 10.6667 4.44667 10.6667 5C10.6667 5.55333 10.22 6 9.66667 6ZM7.66667 3.33333C7.11333 3.33333 6.66667 2.88667 6.66667 2.33333C6.66667 1.78 7.11333 1.33333 7.66667 1.33333C8.22 1.33333 8.66667 1.78 8.66667 2.33333C8.66667 2.88667 8.22 3.33333 7.66667 3.33333ZM4.33333 3.33333C3.78 3.33333 3.33333 2.88667 3.33333 2.33333C3.33333 1.78 3.78 1.33333 4.33333 1.33333C4.88667 1.33333 5.33333 1.78 5.33333 2.33333C5.33333 2.88667 4.88667 3.33333 4.33333 3.33333ZM2.33333 6C1.78 6 1.33333 5.55333 1.33333 5C1.33333 4.44667 1.78 4 2.33333 4C2.88667 4 3.33333 4.44667 3.33333 5C3.33333 5.55333 2.88667 6 2.33333 6ZM6 0C2.68667 0 0 2.68667 0 6C0 9.31333 2.68667 12 6 12C6.55333 12 7 11.5533 7 11C7 10.74 6.9 10.5067 6.74 10.3333C6.58667 10.1533 6.48667 9.92 6.48667 9.66667C6.48667 9.11333 6.93333 8.66667 7.48667 8.66667H8.66667C10.5067 8.66667 12 7.17333 12 5.33333C12 2.38667 9.31333 0 6 0Z" fill="#00314B"/>
              </svg>
              {toggleThemeSelector &&<div className="dropdown" css={css`position:absolute;top:22px;background:white;padding:8px 2px;border-radius:10px`}>
                <div className='drdbtn' css={css`display:flex;margin-bottom:8px`} onClick={()=>{
                  requestTheme('orange')
                }}><div css={css`width:16px;height:16px;background:orange;margin-right:10px;border-radius:.3rem`}></div> <span css={css`font-size:14px`}>Orange</span></div>
                <div className='drdbtn' css={css`display:flex`} onClick={()=>{
                  requestTheme('blue')
                }}><div css={css`width:16px;height:16px;background:blue;margin-right:10px;border-radius:.3rem`}></div> <span css={css`font-size:14px`}>Blue</span></div>
              </div>}
              </div>
            </div>
            <div className="prev-formula">{prev}</div>
            </div>
          </div>
          <div className="formula" css={css`
              text-align:right;
              font-size:34px;
              font-weight:900;
              margin:6px 10px;
              color: #00314B;
            `}>{formula}</div>
          </div>
          <div className="control-container" css={css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(5, 1fr);
            grid-column-gap: 10px;
            grid-row-gap: 13px;
            width:90%;
            margin: 20px auto;
            `}>
              <button className='calculator-control' onClick={()=>{setFormula('');setPrev('')}}>AC</button>
              <button className='calculator-control' onClick={()=>{
                if(formula[0]=='-'){
                  setFormula(formula.slice(1,formula.length))
                }else{
                  setFormula('-'+formula)
                }
              }}>±</button>
              {controls.map((c,i)=>{
                return (<Control value={c} formula={formula} setFormula={setFormula} key={i}/>)
              })}
              <button className='calculator-control' css={css`
              grid-column: span 2;
              `} onClick={()=>setFormula(formula+'0')}>0</button>
              <button className='calculator-control' onClick={()=>setFormula(formula+'.')}>.</button>
              <button className='calculator-control' onClick={()=>requestCalculation()}>=</button>
            </div>
      </div>
    );

    function requestCalculation(){
      window.electron.ipcRenderer.sendMessage('ipc-calculator',[formula]);
      window.electron.ipcRenderer.once('ipc-calculator',(res)=>{
        setPrev(formula)
        setFormula(String(res))
      })
    }
    function requestTheme(theme){
      window.electron.ipcRenderer.sendMessage('ipc-change-bg-color',["set",theme]);
      window.electron.ipcRenderer.once('ipc-change-bg-color',(res)=>{
        window.location.reload(false);
      })
    }
  }
