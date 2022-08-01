import { useState } from "react"
import GearDetailPage from "../../pages/GearDetailPage/GearDetailPage"

export default function GearIndexCard({ gear, user }) {
    const [showDetailPage, setShowDetailPage] = useState(false)

    return (
        <>
        <img src={gear.image_url} alt="" />
            <h2 id="gearH2">{gear.name}</h2>
            <button
              onClick={() => {setShowDetailPage(true)}}>
              More Info
            </button>
            <hr />
            <br />
        {showDetailPage && <GearDetailPage gearItem={gear} setShowDetailPage={setShowDetailPage} user={user}/>}
        </>
    )
}