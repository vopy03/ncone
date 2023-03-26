import { FC, useEffect, useState, useCallback } from 'react';
import { setGlobalState, useGlobalState } from '../states/index';

import FavoriteIcon from '@mui/icons-material/Favorite';

interface elProps {
    id:number,
    name:string,
    price:number,
    src:string
}

interface componentProps {
    addToFavorite:(id: number) => void,
    forceUpdate:() => void,
    [key:string]:any
}

interface fUpdate {
    (prevState: undefined): undefined
}

export default function Favorite(props:componentProps) {
    const [favorites] = useGlobalState('favorites')
    useEffect(() => {
        console.log(favorites)
    })

    const [, updateState] = useState<Object>();
    const forceUpdate = useCallback(() => updateState({}), []);
        // 
    return (
    <>
    <div className="favorite-list-div">
        <p>Favorites</p>
        <div className='favorite-list-content'>
            {favorites.map((el:elProps) => {
                return (
                    <>
                    <div className="fav-list-item">
                        <div className="fav-img"><img src={`https://testbackend.nc-one.com${el.src}`} alt={`${el.name} picture`} /></div>
                        <div className="fav-info">
                            <p className="fav-title">{el.name}</p>
                            <div className="fav-like-footer">
                                <p className="fav-price">{`$ ${el.price}`}</p>
                                <div className='fav-like-btn selected' onClick={() =>{ forceUpdate(); props.forceUpdate(); props.addToFavorite(el.id-1)}}><FavoriteIcon/></div>
                            </div>
                        </div>
                    </div>
                    </>
                )
            })}
        </div>
    </div>
    </>
    )
}