import { useParams } from "react-router-dom";

const Diary = () => {

    // useParams: React가 제공하는 Hook은 아니지만 사용자 정의 Hook
    // 전달받아 들어오는 path variable를 모아 객체로 가져옴. (path variable을 id로 정의함) 
    const {id} = useParams();

    return <div>
        <h1>Diary</h1>
        <p>이곳은 Diary(일기상세페이지)</p>
    </div>
}


export default Diary;