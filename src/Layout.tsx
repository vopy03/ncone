import { useState, useCallback } from 'react'

import { setGlobalState, useGlobalState } from './states/index';

import { Outlet, useLoaderData } from 'react-router-dom';

interface elProps {
  id: number,
  name: string,
  price: number,
  src: string
}


export default function Layout() {

  const data = useLoaderData() as Array<elProps>
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
