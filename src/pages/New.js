import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {

    useEffect(()=>{
        const tilteElement = document.getElementsByTagName('title')[0];
        tilteElement.innerHTML = `새로운 일기 쓰기`
    })

    return <div>
        <DiaryEditor />
    </div>
}


export default New;