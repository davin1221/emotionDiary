import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({id, emotion, content, date}) => {

    const navigate = useNavigate();

    const strDate = new Date(parseInt(date)).toLocaleDateString();


    // 일기 상세조회 이동
    const goDetail = () => {
        navigate(`/diary/${id}`)
    }

    // 일기 수정하기 이동 
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }


    return <div className="DiaryItem">
        <div className={["emotion_img_wrapper", `emotion_img_wrapper${emotion}`].join(" ")}> 
            <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
        </div>

        <div className="info_wrapper" onClick={goDetail}>
            <div className="diary_date">{strDate}</div>
            <div className="diary_content_preview">
                {content.slice(0,25)}
            </div>
        </div>

        <div className="btn_wrapper">
            <MyButton text={'수정하기'} onClick={goEdit}/>
        </div>

    </div>
}

export default React.memo(DiaryItem);