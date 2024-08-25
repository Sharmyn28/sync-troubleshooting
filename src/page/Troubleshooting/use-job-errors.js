import {useEffect, useState} from "react";
import {useDataQuery} from "@dhis2/app-runtime";

const pollQuery = {
    errors:{
        resource: 'jobConfigurations/errors',
    }
}

const checkDone = (data) => {
    // On 2.37 and 2.38, an empty HTTP response is sent instead of `null`
    if (data instanceof Blob && data.size === 0) {
        return false
    }
    return data
}

export const useJobErrors = () => {
    const [jobErrors, setErrors] = useState(null)
    /*const wrappedQuery = useConst(() => ({
        poll: query,
    }))*/
    const {data: dataPR, loadingPR} = useDataQuery(programRuleQuery)
    const { refetch, error, loading, data } = useDataQuery(pollQuery, {
        //lazy: true,
        /*onComplete: (data) => {
            const {errorList} = usePrepareErrorList(data.errors, refetchPR)
            setErrors(errorList)
            if (checkDone(data.errors)) {
                console.error(data.errors)
                //cancel()
            }

            console.info({data, errorList})
        },*/
    })

        //useProgramRules({})

    useEffect(() => {
        if (data && data?.errors && dataPR && dataPR?.programRules) {
            const errorL = data?.errors
            const {errorList} = prepareErrorList({list: data.errors, prList: dataPR?.programRules?.programRules})
            console.info('useJobErrors', {data:data.errors, errorL, PR: dataPR?.programRules?.programRules, DE: dataPR.dataElements, errorList})
            setErrors(errorList)
        }
    }, [data, dataPR]);

    return {
        jobErrors,
        error,
        loading,
        refetch
    }
}



const prepareErrorList = ({list, prList}) => {
    const errorList = []
    const jobList = []
    console.log({list, prList})
    list?.forEach(item => {
        item.errors?.forEach((entry) => {
            const programRuleId = extractProgramRuleId(entry.message)
            const currentPR = prList.find(e => e.id === programRuleId)
            console.log({programRuleId, currentPR})
            //const programRuleList = []
            //programRuleList.push(extractProgramRuleId(entry.message))
            //console.log('programRules', programRuleList)
            /*refetchPR({programRuleList})
                .then((a) => {
                console.info('refetch then',{a, programRuleList})
            })*/
            const error = {
                ...entry,
                finished: item.finished,
                jobId: item.id,
                user: item.user,
                status: 'Error',
                orgUnit: '',
                program: currentPR?.program.name, //name
                enrollment: '',
                programStage: currentPR?.program.programStages[0].name, //name
                event: '',
                tei: '',
                dataElement: '', //name
                tea: '' //name
            }
            errorList.push(error)
        })
    })

    return {
        errorList
    }

    /*return {
        message,
        //type,
        code,
        timestamp
    }*/
}

const extractProgramRuleId = (inputString) => {
    const regex = /program rule \(`([^`]+)`\)/;
    const match = inputString.match(regex);

    if (match && match[1]) {
        return match[1];
    } else {
        return null; // or you can return an empty string or a specific message indicating no match found
    }
}

/**
 * How and what to get with Event/Program rules error:
 * - Program rule ID, you can extract it from the message error
 * - with a program rule, you can get the program (id and name) and programStage (please double-check if there is more than one PS)
 * - value next to program rule is a data element, with data element name
 *  You can do it girl! :)
 * */


const programRuleQuery = {
    programRules: {
        resource: 'programRules',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'name', 'program[id,name,programStages[id,name]]'],
            //filter: `id:in:[${list}]`,
        },
    },
    dataElements: {
        resource: 'dataElements',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'name', 'valueType', 'optionSetValue'],
            //filter: `id:in:[${list}]`,
        },
    },
}

/*const programQuery = (list) => ({
    dataElements: {
        resource: 'programs',
        params: {
            paging: false,
            fields: ['id', 'name','displayName', 'programStages'],
            filter: `id:in:[${list}]`,
        },
    },
})*/

export const dataElementQuery = (list) => ({
    dataElements: {
        resource: 'dataElements',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'name', 'valueType', 'optionSetValue'],
            filter: `id:in:[${list}]`,
        },
    },
})

const programRuleErrorQuery = ({programRuleList, dataElementList}) => ({
    programRules: {
        resource: 'programRules',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'name', 'program[id,name,programStages[id,name]]'],
            filter: `id:in:[dahuKlP7jR2${programRuleList}]`,
        },
    },
    dataElements: {
        resource: 'dataElements',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'name', 'valueType', 'optionSetValue'],
            filter: `id:in:[${dataElementList}]`,
        },
    },
})

const useProgramRules = ({programRuleList}) => (
    useDataQuery(programRuleErrorQuery, {
        variables: {
            list: programRuleList,
            //programRuleList: programRuleList,
            //dataElementList: dataElementList || '',
            lazy: true,
        },
        /*onComplete: (data) => {
            setProgram(data)
            console.log('programRules result',{data, programRules})
        }*/
    })
)



/*export const useReadDataElementsQuery = ({ programId }) =>
    useDataQuery(dataElementsQuery, {
        variables: { programId: programId || '' },
        lazy: true,
    })*/

const prepareMessage = (message) => {}

/*const mockPayload = {
    data:{
        errors: [
            {
                codes: "ValidationCode",
                created: "2024-06-05T17:47:47.124",
                executed: "2024-06-05T17:47:47.199777",
                file: "goZMRxnO0eJ",
                filesize: 1209,
                filetype: "application/json",
                finished: "2024-06-05T17:47:47.298963",
                id: "goZMRxnO0eJ",
                input: null,
                type: "TRACKER_IMPORT_JOB",
                user: "GOLswS44mh8",
                errors: [
                    {
                        args: ['MetadataIdentifier(idScheme=UID, identifier=WiDhAel3OZd, attributeValue=null)'],
                        code: "E1010",
                        id: "O9lD4Iv0AmG",
                        message: "Could not find Program: `MetadataIdentifier(idScheme=UID, identifier=WiDhAel3OZd, attributeValue=null)`, linked to Event.",
                        type: "EVENT"
                    },
                    {
                        args: ['MetadataIdentifier(idScheme=UID, identifier=GUb8BPpbk1X, attributeValue=null)'],
                        code: "E1013",
                        id: "O9lD4Iv0AmG",
                        message: "Could not find ProgramStage: `MetadataIdentifier(idScheme=UID, identifier=GUb8BPpbk1X, attributeValue=null)`, linked to Event.",
                        type: "EVENT"
                    }
                ]
            }
        ]
    }
}*/







