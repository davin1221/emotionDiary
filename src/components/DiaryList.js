import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";


// 정렬 
const sortOptList = [
    {value:"latest", name:"최신순"},
    {value:"oldest", name:"오래된 순"},
];


// react Memo : 컴포넌트를 감싸면(컴포넌트를 메모의 인자로 전달하면) 강화된 컴포넌트를 돌려주는 고차 컴포넌트
//              리액트 메모를 통해서 만들어진 컴포넌트는 전달받는 프롭이 값이 바뀌지 않으면 렌더링이 일어나지 않게 메모이제이션해줌
const ControlMenu = React.memo(({ value, onChange, optList }) =>{

    return (
        <select value={value} onChange={(e)=> onChange(e.target.value)} className="ControlMenu">
            {optList.map((it,idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>))}
        </select>
    );
});

const filterOptList = [
    {value : "all" , name: "전부 다"},
    {value : "good" , name: "좋은 감정만"},
    {value : "bad" , name: "안 좋은 감정만"}
]

const DiaryList = ({diaryList}) => {

    const navigate = useNavigate();

    // 정렬 
    const [sortType, setSortType] = useState('latest');
    const [filter, setFilter] = useState("all");

    // 정렬 시 리스트 변화 (sort하면 원본도 망가지니까 깊은 복사 )
    const getProcessedDiaryList = () => {

        // 감정 필터 함수 
        const filterCallBack = (item) => {
            if(filter === "good") {
                return parseInt(item.emotion) <= 3;
            } else { 
                return parseInt(item.emotion) > 3;
            }
        }

         // 비교함수 
         const compare = (a,b) => {
            if(sortType === "latest") {
                return parseInt( b.date ) - parseInt(a.date);
            } else {
                return parseInt( a.date ) - parseInt(b.date);
            }
        }

        const copyList = JSON.parse(JSON.stringify(diaryList))
        // 다이어리시트가 배열이니 json으로 문자열로 변환, 다시 문자열을 parse로 배열로 복호화하여 copyList에 넣음

        const filteredList = filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it))

        const sortedList = filteredList.sort(compare);

        return sortedList;
    }

    return <div className="DiaryList">

        <div className="menu_wrapper">
            <div className="left_col">
                <ControlMenu value={sortType} 
                        onChange={setSortType} 
                        optList={sortOptList}
                />

                <ControlMenu value={filter}
                            onChange={setFilter}
                            optList={filterOptList}
                />
            </div>

            <div className="right_col">
                <MyButton type={'positive'} text={'새 일기 쓰기'} onClick={()=>navigate('/new')} />
            </div>
        </div>

        {getProcessedDiaryList().map((it)=> 
            <DiaryItem key={it.id} {...it} />
        )}
    </div>
};

DiaryList.defalutProps = {
    diaryList : [],
};

export default DiaryList;