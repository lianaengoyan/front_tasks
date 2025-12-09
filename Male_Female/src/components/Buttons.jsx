export default function Buttons ({setFilter}) {
    return (
        <div className='btns'>
            <button onClick={() => setFilter("male")}> Male </button>
            <button onClick={() => setFilter("female")}> Female </button>
            <button onClick={() => setFilter("all")}> All </button>
        </div>
    )
}