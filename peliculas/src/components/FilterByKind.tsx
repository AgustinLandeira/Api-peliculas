
interface Props{
    children: string,
    parenMethod : ()=> void
}
const FilterButton = ({parenMethod,children}:Props) =>{

    return (
        <button className="buttom-filter" onClick={parenMethod}>{children}</button>
    )



}

export default FilterButton