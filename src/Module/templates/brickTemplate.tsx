import * as React from "react"; // for JSX rendering
import HeaderDataInterface from "../Interfaces/HeaderDataInterface";

export default (data: HeaderDataInterface) => (
    <div data-brickdata={JSON.stringify(data)} id={data.brickIdentifier}>
        <h1 className="snb-header-title">{data.title}</h1>
    </div>
)

