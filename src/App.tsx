import { FC, useState } from 'react'

import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { setGlobalState, useGlobalState } from './states/index';

import './style.scss'
import Header from './components/Header';
import Favorite from './components/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';


// const res = await fetch('https://testbackend.nc-one.com/image')
const res = await fetch('src/list.json')
const data = await res.json()
console.log(data)

function App() {
  
  const COLS_COUNT = 4
  const ROWS_COUNT = Math.ceil(data.length/COLS_COUNT)

  const [favorites] = useGlobalState('favorites');
  interface elProps {
    id:number,
    [propName: string]: any;
  }
  const addToFavorite = (id:number) => {
    let favs = favorites;
    if(!(favs.find((el:elProps) => el.id === id+1))) favs.push(data[id])
    else {
      const objWithIdIndex = favs.findIndex((obj:elProps) => obj.id === id+1);
      favs.splice(objWithIdIndex, 1);
    }
    setGlobalState('favorites', favs)
  }
  

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
          <span className={`card-like-btn ${favorites.findIndex((el:elProps) => el.id === id+1) != -1 ? 'selected' : ''} `} onClick={()=> addToFavorite(id)} >
            <FavoriteIcon/>
          </span>
        </div>
      </div>
    </div>
  );}
    
  
  return (
    <>
    <Header title={`Product list Page `}/>
    <div className="wrapper">

      <Favorite/>

      <div className='list-div'>
        <AutoSizer >
          {({height, width}) => (
            <Grid
              columnCount={COLS_COUNT}
              rowCount={ROWS_COUNT}
              height={height}
              width={width}
              columnWidth={(width-80) / (COLS_COUNT)}
              rowHeight={430}
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
