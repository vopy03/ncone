import { FC, useState } from 'react'

import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import './style.scss'
import Header from './components/Header';

const res = await fetch('src/list.json')
const data = await res.json()
console.log(data)

function App() {
  
  const COLS_COUNT = 4
  const ROWS_COUNT = Math.ceil(data.length/COLS_COUNT)

  


  const Cell:FC<any> = ({ columnIndex, rowIndex, style}) => {

    const id = columnIndex+(rowIndex*COLS_COUNT)
    const el = data[id];
    
    return !(id < data.length) ? (<></>) : (
    <div className='list-item-container' style={style}>
      <div className='list-item' >
        <img className='card-img' src={`https://testbackend.nc-one.com${el.src}`}/><br/>
        <p className='card-title'>
          {el.name.length > 35 ? el.name.substring(0, 35)+'...'  : el.name}
        </p>
        <div className='card-footer'>
          <p className='card-price'>{`$ ${el.price}`}</p>
          <span className='card-like-btn'></span>
        </div>
      </div>
    </div>
  );}
    
  
  return (
    <>
    <Header title='Product list Page'/>
    <div className="wrapper">
      <div className='list-div'>
        <AutoSizer >
          {({height, width}) => (
            <Grid
              columnCount={COLS_COUNT}
              rowCount={ROWS_COUNT}
              height={height}
              width={width}
              columnWidth={312}
              rowHeight={450}
              itemData={{ columnCount: COLS_COUNT, rowCount: ROWS_COUNT }}
            >
              {Cell}
            </Grid>
          )}
        </AutoSizer>
      </div>
    </div>
    </>
  )
}

export default App
