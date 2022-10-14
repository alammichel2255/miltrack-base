export const cardBuilder = (props) => {

    const colorHelper = (amber, red,) => {

        if (red) {
            return 'bg-red-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';

        } else if (amber) {
            return 'bg-amber-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';

        } else {
            return 'bg-green-400 border border-2 border-black border-double py-2 px-8 rounded-md shadow-lg break-all';
        }
    }

    const currentLabelHelper = (currentLabel) => {

        if (currentLabel == "Annual Training") {
            return "Annual"
        } else {
            return currentLabel;
        }

    }

    const currentLabelHelper2 = (currentLabel) => {

        if (currentLabel === "Annual Training") {
            return "Training"
        } else {
            return;
        }

    }

    return (
        <ul key="0" className="w-10/12 h-8/12 width: 'vw' list-none flex flex-row flex-wrap gap-8 border border-2 border-gray border-double mx-auto my-8 p-4 bg-[#A3BD8A] rounded-lg shadow-2xl ">
            <h2 className="text-3xl font-bold border-r-2 py-8 pr-8">Special Training</h2>
            {props.elements.map((element, index) => {

                let currentLabel = "";
                let currentLabelStatus = "";
                let amber = false;
                let red = false;



                Object.keys(element).map((key, key_index) => {

                    if (key === "id") {
                        return;
                    }

                    // console.log(key_index)
                    let currentValue = "";
                    Object.values(element).map((value, value_index) => {
                        if (value_index === key_index) {
                            currentValue = value;
                        }
                    })
                    if (index <= 10) {
                        console.log(key);
                        console.log(currentValue);

                        if (key === "current_status") {
                            currentLabel = "Status";

                            if (currentValue === "TDY") {
                                currentLabelStatus = "TDY";
                                red = true;
                            } else if (currentValue === "Leave") {
                                amber = true;
                                currentLabelStatus = "Leave"
                            } else {
                                currentLabelStatus = "PDY"
                            }