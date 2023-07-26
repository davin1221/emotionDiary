import { useContext, useEffect, useState } from "react";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from './../components/DiaryList';

import { DiaryStateContext } from "../App";

const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    // 날짜 저장 State
    const [curDate, setCurDate] = useState(new Date());

    // headText 
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1} 월`

    // month 조정
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()));
    }
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()));
    }

     // 월마다 리스트가 다름 
     const [data, setData] = useState([]);
    
     useEffect(()=> {
        // firstDay와 lastDay의 날짜 안에 작성된 일기 조회
        if(diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

    
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1, 
                0
            ).getTime();

            setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
        }
     },[diaryList, curDate])

    return (
        <div>
            <MyHeader headText={headText} 
                      leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
                      rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
                      />
            <DiaryList diaryList={data} />
        </div>
    )
}


export default Home;

