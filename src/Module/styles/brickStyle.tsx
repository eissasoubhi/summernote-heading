// for JSX rendering
import * as React from "react";
import BrickStyleOptionsInterface from "snb-components/src/Module/Interfaces/BrickStyleOptionsInterface";

export default (options: BrickStyleOptionsInterface) => {

    const brickClass = `.${options.snbBrickClass}`

    return (
        <style className={options.styleIdentifier}>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
                
                ${brickClass} h1 {
                    position: relative;
                    padding: 0;
                    margin: 0;
                    font-family: "Raleway", sans-serif;
                    font-weight: 300;
                    font-size: 40px;
                    color: #080808;
                    -webkit-transition: all 0.4s ease 0s;
                    -o-transition: all 0.4s ease 0s;
                    transition: all 0.4s ease 0s;
                    
                    text-transform: capitalize;
                    
                    text-align:center;
                }
                
                ${brickClass} h1:before {
                    position: absolute;
                    left:50%; 
                    margin-left:-30px;
                    bottom: 0;
                    width: 60px;
                    height: 2px;
                    content: "";
                }
                
                ${brickClass} h1 span {
                    font-size: 13px;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    line-height: 3em;
                    padding-left: 0.25em;
                    color: rgba(0, 0, 0, 0.4);
                    padding-bottom: 10px;
                    
                    display: block;
                    font-size: 0.5em;
                    line-height: 1.3;
                }
            `}
        </style>
    )
}