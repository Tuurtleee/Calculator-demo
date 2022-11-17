/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react'

export default function Control({value,formula,setFormula}) {
    return (
      <button className='calculator-control' onClick={()=>setFormula(formula+value)}>{value}</button>
    );
  }
