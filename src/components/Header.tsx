
interface headerProps {
    title:string
}

export default function Header(props:headerProps) {

    return (
    <>
    <header>
        <p>{props.title}</p>
    </header>
    </>
    )

}

