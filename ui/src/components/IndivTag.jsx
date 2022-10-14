

const IndivTag = (props) => {
    return (
        <ul className="w-5/12 list-none flex flex-row flex-wrap gap-8 border border-2 border-gray border-double mx-auto my-8 p-16 bg-[#A3BD8A] rounded-lg shadow-2xl justify-between">
            <h2 className="text-3xl font-bold">{props.component}</h2>
            {Object.keys(props.elements).map((key, key_index) => {

                if (key === 'id') {
                    return <></>
                }

                let currentValue = "";
                Object.values(props.elements).map((value, value_index) => {
                    if (value_index === key_index) {
                        currentValue = value;
                    }
                })

                return <li key={key_index} className="border border-2 border-black border-double p-8 rounded-md shadow-lg"><strong>{key}</strong>: {currentValue}</li>;
            })}
        </ul>
    )
};


export default IndivTag;