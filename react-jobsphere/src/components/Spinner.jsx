import React from 'react'
import { ClipLoader } from 'react-spinners'

const override = {
    display: "block",
    margin: "100px auto"
};

const Spinner = ({loading}) => {
    return (
        <ClipLoader 
        loading={loading}
        color="#fb2c36"
        size={150}
        cssOverride={override} />
    )
}

export default Spinner