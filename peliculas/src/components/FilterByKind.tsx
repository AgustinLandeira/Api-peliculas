
interface Props{
    children: string,
    parenMethod : ()=> void
}
const FilterButton = ({parenMethod,children}:Props) =>{

    return (
        <button onClick={parenMethod}>{children}</button>
    )



}

export default FilterButton