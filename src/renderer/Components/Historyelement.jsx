/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react'

export default function Historyelement({el}) {
    return (
      <div className="entry" css={css`
        width: 385px;
        height: 90px;
        margin: 20px auto;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 10px;
        padding:8px 6px;
      `}>
        <p css={css`
        font-weight:700;
        font-size:16px;
        color: #00314B;
        `}>{el.formula.replace('*','x')}</p>
        <h1 css={css`
        font-size:34px;
        font-weight:900;
        margin:10px 8px 4px 8px;
        color: #00314B;
        `}>{el.result}</h1>
      </div>
    );
  }
