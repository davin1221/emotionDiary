import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {

    useEffect(()=>{
        const tilteElement = document.getElementsByTagName('title')[0];
        tilteElement.innerHTML = `${id}번째 일기(수정)`
    })

    const navigate = useNavigate();
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);

    const [originData, setOriginDate] = useState();

    // 마운트되었을때 id와 일치하는 값 가져옴
    useEffect(()=> {
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find((it)=> parseInt(it.id) === parseInt(id))

            // 트루시 펄시 : 조건문안에 넣어 언디파인(없는 Id)일땐 홈으로 보냄 
            if(targetDiary) { 
                setOriginDate(targetDiary);
            } else { 
                navigate('/', {replace : true});
            }
        }
    },[diaryList, id])

    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    )
    
}


export default Edit;