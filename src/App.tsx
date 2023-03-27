import { FC, useEffect, useState, useCallback } from 'react'

import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { setGlobalState, useGlobalState } from './states/index';

import './style.scss'
import Header from './components/Header';
import Favorite from './components/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink, useLoaderData, useOutlet, useOutletContext } from 'react-router-dom';


interface elProps {
  id:number,
  name:string,
  price:number,
  src:string
}

interface ctxProps {
  data: elProps,
  forceUpdate:() => void
}


function App() {
    
  const [data, forceUpdate, addToFavorite] = useOutletContext() as Array<any>;

  const COLS_COUNT = 4
  const ROWS_COUNT = Math.ceil(data.length/COLS_COUNT)

  const [favorites] = useGlobalState('favorites');


  const Cell:FC<any> = ({ columnIndex, rowIndex, style}) => {

    const id = columnIndex+(rowIndex*COLS_COUNT)
    const el = data[id];
    
    return !(id < data.length) ? (<></>) : (
    <div className='list-item-container' style={style}>
      <div className='list-item' >
        <img className='card-img' src={`https://testbackend.nc-one.com${el.src}`}/><br/>
        <p className='card-title'>
          <NavLink to={`/products/${el.id}`}>{el.name.length > 35 ? el.name.substring(0, 35)+'...'  : el.name}</NavLink>
        </p>
        <div className='card-footer'>
          <p className='card-price'>{`$ ${el.price}`}</p>
          <span className={`like-btn ${favorites.findIndex((el:elProps) => el.id === id+1) != -1 ? 'selected' : ''} `} onClick={()=> { forceUpdate(); addToFavorite(id)}} >
            <FavoriteIcon/>
          </span>
        </div>
      </div>
    </div>
  );}
    
  
  return (
    <>
      <Header title={`Product list Page `} />
      <div className="wrapper">

        <Favorite favorites={favorites} forceUpdate={forceUpdate} addToFavorite={addToFavorite} />

        <div className='right-content'>
          <div className='list-div'>
            <AutoSizer >
              {({ height, width }) => (
                <Grid
                  columnCount={COLS_COUNT}
                  rowCount={ROWS_COUNT}
                  height={height}
                  width={width}
                  columnWidth={(width - 80) / (COLS_COUNT)}
                  rowHeight={430}
                  itemData={{ columnCount: COLS_COUNT, rowCount: ROWS_COUNT }}
                >
                  {Cell}
                </Grid>
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
