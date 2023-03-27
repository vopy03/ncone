import { FC, useEffect, useState, useCallback } from 'react'

import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { setGlobalState, useGlobalState } from './states/index';

import './style.scss'
import Header from './components/Header';
import Favorite from './components/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink, Outlet, useLoaderData } from 'react-router-dom';

interface elProps {
  id: number,
  name: string,
  price: number,
  src: string
}


// const res = await fetch('https://testbackend.nc-one.com/image')
// console.log(data)

export default function Layout() {

  const data = useLoaderData() as Array<elProps>
  console.log(data)
  const [favorites] = useGlobalState('favorites');

  const [, updateState] = useState<Object>();
  const forceUpdate = useCallback(() => updateState({}), []);


  const addToFavorite = (id: number) => {
    let favs = favorites;
    if (!(favs.find((el: elProps) => el.id === id + 1))) favs.push(data[id])
    else {
      const objWithIdIndex = favs.findIndex((obj: elProps) => obj.id === id + 1);
      favs.splice(objWithIdIndex, 1);
    }
    setGlobalState('favorites', favs)

  }


  return (
    <Outlet context={[data, forceUpdate, addToFavorite]} />
  )
}
