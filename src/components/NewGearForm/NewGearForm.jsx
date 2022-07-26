export default function  NewGearForm(){
    return (
        <main>
            {gear.map(gear => <p>{gear.name}</p>)}

<div className="listSearch">
  <div>
    <label>Name</label>
    <input

      type="text"
      name="name"
      value={formData.name}
      onChange={changeData}
      required
    />
  </div>
  <div>
    <label>Description</label>
    <input
      type="text"
      name="desc"
      value={formData.desc}
      onChange={changeData}
      required
    />
  </div>
  <div>
    <label>Price</label>

    <input
      className="SearchInput"
      type="number"
      name="price"
      value={formData.price}
      onChange={changeData}
      required
    />

    <input
      className="SearchInput"
      type="number"
      name="qty"
      value={formData.qty}
      onChange={changeData}
      required
    />
  </div>
  {/* onClick function sets the state of the rooms to the new input arguments */}
  <button
    className="searchBtn"
    
    onClick={async() => {
      await handleSubmit()
      callGet()
    }
    }
  >
    Modify Your Search
  </button>
</div>
        </main>
    )
}