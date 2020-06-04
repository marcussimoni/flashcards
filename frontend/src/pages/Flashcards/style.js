import styled, {keyframes} from 'styled-components'

const FlashcardAnimation = keyframes`
    0% {
        margin-left: -1000px;
        margin-top: -1000px;
    }
    100% {
        margin-left: 0px;
        margin-top: 0px;
    }
`

const Flashcard = styled.div`
    position: relative;
    width: 230px;
    height: 320px;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 7px 10px 22px -6px rgba(0,0,0,0.58);
    font-size: 28px;
    background-color: #4f5d75;
    font-style: italic;
    color: #fff;
    cursor: pointer;
    animation-fill-mode: forwards;
    animation-name: ${FlashcardAnimation};
    animation-duration: 0.5s;
`

const FlashcardContent = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 38px;
` 

const FlashcardTemplate = styled.div`
    height: 135px;
    font-style: normal;
    font-size: 28px;
    font-weight: 400 !important;
    margin: 0 auto;
    vertical-align: bottom;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FlashcardFrontAnimation = keyframes`
    0% {
        bottom: 0;
        height: 135px;
    }
    100% {
        top: 0;
        height: 50px;
        font-size: 22px;
    }
`

const FlashcardFront = styled(FlashcardTemplate)`
    font-style: italic;
    text-decoration: underline;
    animation-fill-mode: forwards;
    animation-name: ${FlashcardFrontAnimation};
    animation-duration: 1.5s;
`

const FlashcardBackAnimation = keyframes`
    0% {
        bottom: 0;
        height: 135px;
        opacity: 0;
    }
    100% {
        top: 0;
        height: 220px;
        opacity: 1;
    }
    `
    
const FlashcardBack = styled(FlashcardTemplate)`
    animation-fill-mode: forwards;
    animation-name: ${FlashcardBackAnimation};
    animation-duration: 1.5s;
`

const FlashcardsButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 0 auto;
    width: 80%;
    padding: 0 10px 20px;
` 

const FlashcardButton = styled.span`
    transition: color 0.5s ease-out;
    &:hover {
        color: ${props => props.type === 'easy' ? 'rgb(150, 253, 150)' : 
                props.type === 'medium' ? 'rgb(255, 251, 43)' : 'rgb(255, 154, 154)'}
    }
`

const SidedBar = styled.div`
    position: fixed;
    width: 280px;
    height: 310px;
    border: 1px solid #000;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #aaa;
    font-size: 18px;
    padding: 40px;
    left: 10%;
`

const SidedBarItem = styled.label`
    font-style: italic;
    font-weight: 600;
`

const FlexContainer = styled.div`
    margin-top: 60px;
    width: 80%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`

const ArrowAnimation = keyframes`
    25% {
        transform: translate(5px);
    }
    50% {
        transform: translate(0px);
    }
    75% {
        transform: translate(5px);
    }
    100% {
        transform: translate(0px);
    }
`

const Arrow = styled.div`
    font-size: 50px;
    cursor: pointer;
    padding: 0 40px;
    &:hover {
        color: darkslateblue;
        animation: ${ArrowAnimation} 0.8s infinite ease-in-out;
    }
`

const List = styled.ul`
    list-style-type: upper-roman;
    list-style-position: outside;
    list-style-image: none;
`

export {
    Flashcard, FlashcardContent, FlashcardsButtons, FlashcardButton, 
    FlashcardFront, FlashcardBack, SidedBar, SidedBarItem, FlexContainer, 
    Arrow, List
}