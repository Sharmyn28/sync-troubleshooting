import React, { useEffect, useState } from "react";
import {JobTable} from "../components";
import {useErrors} from "../queries";


export const ImportJobs = () => {
    const {errorList} = useErrors()
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        console.log({jobs, errorList});
        if (errorList) {
            //setJobs((jobs) => [...jobs, errorList])
            setJobs([...errorList])
        }
    }, [errorList])

    return (
        <>
            <JobTable
                rows={jobs}
            />
        </>
    )
}

