import React, {useState} from "react";
import GoalDisplay from "../components/GoalDisplay.jsx";
function AllGoals(){
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth()); //month is 0-indexed
    const [year, setYear] = useState(today.getFullYear());
    function handleChange(e){
        const str = e.target.value;
        const year = Number(str.slice(0, 4));
        const month = Number(str.slice(5)) - 1;
        setMonth(month);
        setYear(year);
    }
    const displayMonth = month < 10 ? "0" + (month + 1): month + 1;
    return (
    <>
    <input type="month" id="start" name="start" min="2000-01" value={`${year}-${displayMonth}`} onChange={handleChange} />
    <GoalDisplay displayLength="month" month={month} year={year}/>
    </>
    );
}
export default AllGoals;