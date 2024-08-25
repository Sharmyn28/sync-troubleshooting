import {useDataQuery} from "@dhis2/app-runtime";

const queryError = {
    errors: {
        resource: 'jobConfigurations/errors',
    },
}

export const useErrors = () => {
    const {loading, fetching, error, data} = useDataQuery(queryError)

    return {
        errorList: data && data?.errors,
        loading,
        error
    }
}

const queryErrorw = {
    errors: {
        resource: 'obConfigurations/errors',
    },
}

export const dataElementQuery = (list) => ({
    dataElements: {
        resource: 'dataElements',
        params: {
            paging: false,
            fields: ['id', 'displayName', 'valueType', 'optionSetValue'],
            filter: `id:in:[${list}]`,
        },
    },
})

export const useDataElements = (elements) => {
    const { data, fetching, error } = useDataQuery(dataElementQuery(elements))

    return {
        dataElement: data?.dataElements?.dataElements,
        fetching,
        error,
    }
}