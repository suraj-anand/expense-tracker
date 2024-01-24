import { BS_TEXT_COLORS } from "@src/constants"

export default function Badges({text}){
    const randIndex = Math.floor(Math.random() * BS_TEXT_COLORS.length)
    return (
        <>
            <div className={`badge mx-1 ${BS_TEXT_COLORS[randIndex]} p-2`}>{text}</div>
        </>
    )
}
