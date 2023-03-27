import { NavLink } from "react-router-dom"

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface headerProps {
    title: string,
    back?: boolean
}

export default function Header(props: headerProps) {

    return (
        <>
            <header>
                {props.back && (<NavLink to="/"><KeyboardBackspaceIcon /></NavLink>)}
                <p>{props.title}</p>
            </header>
        </>
    )

}

