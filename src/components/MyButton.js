const MyButton = ({text, type, onClick}) => {

    const btnType = ['positive', 'negative'].includes(type) ? type : 'defalut';

    return (
        <button 
            className={["MyButton", `MyButton_${btnType}`].join(" ")} 
            onClick={onClick}>
         {text}
        </button>
    )

}

MyButton.defaultProps = {
    type: "defalut",
}

export default MyButton;