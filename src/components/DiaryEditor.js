import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "../App";

// components
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import EmotionItem from "./EmotionItem";



// new Date를 알아볼수 있는 날짜로 변환하는 함수 
const getStringDate = (date) => {
    return date.toISOString().slice(0,10);
}

const emotionList = [
    {
        emotion_id : 1,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript : "완전 좋음"
    },
    {
        emotion_id : 2,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript : "좋음"
    },
    {
        emotion_id : 3,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript : "그럭저럭"
    },
    {
        emotion_id : 4,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript : "나쁨"
    },
    {
        emotion_id : 5,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript : "완전 나쁨"
    },
]


const DiaryEditor = () => {
    const nevigation = useNavigate();

    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState();
    const contentRef = useRef();

    const {onCreate} = useContext(DiaryDispatchContext);

    // 감정 아이템 클릭 시 수행 
    const handleClickEmotion = (emotion) => {
        setEmotion(emotion);
    }

    const handleSubmit = () => {
        if(content.length < 1) { 
            contentRef.current.focus();
            return;
        }

        onCreate(date, content, emotion);
        nevigation('/', {replace : true})
    }

    return (
    <div className="DiaryEditor">
        <MyHeader headText={'새 일기 쓰기'} 
                  leftChild={<MyButton text={'뒤로가기'} onClick={()=>nevigation(-1)}/>}
                  />
        
        <div>
            <section>
                <h4>오늘의 날짜</h4>
                <div className="input_box">
                    <input type="date" 
                           onChange={(e)=>setDate(e.target.value)}
                           value={date}
                           className="input_date"/>
                </div>
            </section>

            <section>
                <h4>오늘의 감정</h4>
                <div className="input_box emotion_list_wrapper">
                    {emotionList.map((it) => 
                            <EmotionItem key={it.id} {...it} 
                                         onClick={handleClickEmotion} 
                                         isSelected={it.emotion_id === emotion} 
                            /> 
                    )}
                </div>
            </section>

            <section>
                <h4>오늘의 일기</h4>
                <div className="input_box text_wrapper">
                    <textarea ref={contentRef}
                              value={content}
                              onChange={(e)=>setContent(e.target.value)}
                              placeholder="오늘은 어땠나요?"/>
                </div>
            </section>

            <seciton>
                <div className="control_box">
                    <MyButton text={'취소하기'} onClick={()=>nevigation(-1)}/>
                    <MyButton text={'작성완료'} 
                              type={'positive'} 
                              onClick={handleSubmit}/>
                </div>
            </seciton>

        </div>
    </div>
    );
}

export default DiaryEditor;