import * as React from "react"; // for JSX rendering
import HeadingDataInterface from "../Interfaces/HeadingDataInterface";

export default (data: HeadingDataInterface) => (
    <div data-brickdata={JSON.stringify(data)} id={data.brickIdentifier}>
        <h1 className="snb-heading-title">
            {data.title}
            <span>{data.subtitle}</span>
        </h1>
    </div>
)

