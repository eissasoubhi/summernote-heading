import * as React from "react"; // for JSX rendering
import HeadingDataInterface from "../Interfaces/HeadingDataInterface";

export default (data: HeadingDataInterface) => (
    <div data-brickdata={JSON.stringify(data)} id={data.brickIdentifier}>
        <h1 className="snb-heading-title" data-underlinecolor={data.underlineColor}>
            {data.title}
            <span>{data.subtitle}</span>
        </h1>
        <style>
            {`
                #${data.brickIdentifier} h1:before {
                    background-color: ${data.underlineColor};
    
                }
            `}
        </style>
    </div>
)

