export default function GearIndexCard({ gear, setShowDetailPage }) {
    return (
        <>
        <img src={gear.image_url} alt="" />
            <h2>{gear.name}</h2>
            <p>${gear.price}</p>
            <p>Stock Amount: {gear.qty}</p>
            <button
              onClick={() => {setShowDetailPage(true)
                // navigate(`/rentals/${gear.id}`,
                //   {
                //     state: {
                //       gear: { gear },
                //       user: { user }
                //     },
                //   })
              }}>
              More Info
            </button>
            <hr />
            <br />
        </>
    )
}