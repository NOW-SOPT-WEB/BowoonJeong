import {styled} from 'styled-components';

export const Header = styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    margin-bottom: 5rem;
    color: darkgreen;
    font-size: 2rem;
    font-weight: 700;
    background-color: beige;
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;
export const IMG = styled.img`
    width: 50%;
    max-height: 40rem;
    border-radius: 2rem;
`;
export const MoveButton = styled.button`
    all: unset;
    padding: 0.8rem;
    margin-right: 1rem;
    font-size: 1rem;
    color: white;
    font-weight: 600;
    background-color: darkgreen;
    border-radius: 2rem;
    cursor: pointer;
`;

export const Area = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    padding: 1rem;
    width: 50%;
    min-height: 50%;
    border-radius: 3rem;
    background-color: white;
`;

export const InputContaier = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    width: 70%;
    height: 3rem;
`;
export const InputSort = styled.p`
    width: 15%;
`;

export const Input = styled.input`
    all: unset;
    &:focus {
        outline: none;
    }
    padding-left: 1rem;
    width: 100%;
    max-width: 34rem;
    height: 3rem;
    border-radius: 1rem;
    border: 1px solid gray;
`;
export const HelpP = styled.p`
    position: relative;
    top: -0.5rem;
    left: 1rem;
    font-size: 0.6rem;
    color: blue;
`;
export const OneLine = styled.div`
    display: flex;
    width: 70%;
`;
export const Info = styled.p`
    font-weight: 600;
    width: 20rem;
`;
export const PwEditBtn = styled.p`
    cursor: pointer;
    color: darkgreen;
    font-weight: 700;
`;
export const ShowORNot = styled.div`
    visibility: 'hidden';
`;
