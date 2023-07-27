import { Navigate, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "../App";

// components
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import EmotionItem from "./EmotionItem";

// util 
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({isEdit, originData}) => {
    const nevigation = useNavigate();

    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState();
    const contentRef = useRef();

    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);

    // 감정 아이템 클릭 시 수행 
    const handleClickEmotion = useCallback((emotion) => {
        setEmotion(emotion); 
    },[]);

    const handleSubmit = () => {
        if(content.length < 1) { 
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "일기를 새로 작성하시겠습니까?")) { 
            if(!isEdit) { 
                onCreate(date, content, emotion);
            } else { 
                onEdit(originData.id, date, content, emotion);
            }
        }

        nevigation('/', {replace : true})
    }

    const handleRemove = () => {
        if(window.confirm("일기를 삭제하시겠습니까?")) {
            onRemove(originData.id);
            nevigation('/', {return:true})
        }
    }

    useEffect(()=> {
        if(isEdit) { 
            // setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }

    },[isEdit, originData]);

    return (
    <div className="DiaryEditor">
        <MyHeader headText={isEdit ? "일기 수정하기" : '새 일기 쓰기'} 
                  leftChild={<MyButton text={'뒤로가기'} onClick={()=>nevigation(-1)}/>}
                  rightChild={isEdit && <MyButton text={'삭제하기'} onClick={handleRemove} type={'negative'}/>}
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