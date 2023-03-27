import { FC, useEffect, useState, useCallback } from 'react'

import { setGlobalState, useGlobalState } from './states/index';

import './style.scss'
import Header from './components/Header';
import Favorite from './components/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { NavLink, useLoaderData, useOutletContext, useParams } from 'react-router-dom';

interface elProps {
  id: number,
  name: string,
  price: number,
  src: string
}



export default function ProductPage(props: any) {

  const [data, forceUpdate, addToFavorite] = useOutletContext() as Array<any>;

  const { pid } = useParams()
  const el = useLoaderData() as elProps;

  const [favorites] = useGlobalState('favorites');

  return (
    <>
      <Header title={`Product Page`} back={true} />
      <div className="wrapper">

        <Favorite favorites={favorites} forceUpdate={forceUpdate} addToFavorite={addToFavorite} />
        <div className='right-content'>
          <div className='product-item-content'>
            <div className="product-item-img">
              <img src={`https://testbackend.nc-one.com${el.src}`} alt={`${el.name} picture`} />
              <ZoomInIcon />
            </div>
            <div className="product-item-info">
              <p className="product-item-title">{el.name}</p>
              <div className="product-item-like-footer">
                <p className="product-item-price">{`$ ${el.price}`}</p>
                <div className={`like-btn ${favorites.findIndex((e: elProps) => e.id === el.id) != -1 ? 'selected' : ''} `} onClick={() => { forceUpdate(); addToFavorite(el.id - 1) }}><FavoriteIcon /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
