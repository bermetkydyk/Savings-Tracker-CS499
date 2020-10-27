import styled from "styled-components";

export const AdviceCard = styled.div`
    margin: 10px;
    height: 200px;
    padding: 10px;
    font-size: 20px;
    background-color: #a5d6a7;
    background-position: center;
    background-size: cover;
    filter: contrast(100%);

    margin-top: 5px;
    transition-property: box-shadow margin-top filter;
    box-shadow: 0px 0px 2px 0px grey;
    transition-duration: 0.1s;
    &:hover {
        cursor: pointer;
        filter: contrast(100%);
        box-shadow: 0px 0px 10px 0px grey;
    }
`