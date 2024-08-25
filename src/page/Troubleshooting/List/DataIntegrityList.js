import PropTypes from 'prop-types'
import React, { useState, useMemo } from 'react'
import { ErrorOrLoading } from '../../../components'
import { CheckDetailsView } from '../Details/CheckDetailsView.js'
import {List} from "./List";
import css from './List.module.css'
import {EVENT, ListToolbar, ToolbarTabs} from './ListToolbar.js'
import {FILTER, SORT} from './sorter.js'
import {useJobErrors} from "../use-job-errors";

const filterCheck = (check, filter) => {
    if (!filter || !filter.trim().length === 0) {
        return true
    }
    return check.displayName?.toLowerCase().includes(filter.toLowerCase())
}

export const DataIntegrityList = () => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState(FILTER["status"].value)
    const [selectedTab, setSelectedTab] = useState(EVENT)
    const [selectedSort, setSelectedSort] = useState(SORT["latest"].value)

    const sorter = useMemo(() => SORT[selectedSort].sorter, [selectedSort])
    const [selectedCheck, setSelectedCheck] = useState(null)

    const {jobErrors, loading, error} = useJobErrors()

    const selectedEvent = selectedTab === EVENT

    /*const filteredChecks = useMemo(
        () =>
            checks
                ?.filter(
                    (check) =>
                        (selectedSlow ? check.isSlow : !check.isSlow) &&
                        filterCheck(check, filter)
                )
                .sort(sorter),
        [checks, filter, sorter, selectedSlow]
    )*/

    const filteredChecks = useMemo(
        () =>
            jobErrors
                ?.filter(
                    (check) =>
                        (selectedEvent ? check.isSlow : !check.isSlow) &&
                        filterCheck(check, filter)
                )
                .sort(sorter),
        [jobErrors, filter, sorter, selectedEvent]
    )

    return (
        <div className={css.listWrapper}>
            <ToolbarTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <ListToolbar
                search={search}
                setSearch={setSearch}
                setFilter={setFilter}
                filter={filter}
                sort={selectedSort}
                setSort={setSelectedSort}
                selectedEvent={selectedEvent}
            />
            <ListDetailsLayout>
                <ErrorOrLoading
                    //error={data}
                    //error={checksError}
                    loading={loading}>
                    <List
                        selectedCheck={selectedCheck}
                        setSelectedCheck={setSelectedCheck}
                        //checks={filteredChecks}
                        checks={jobErrors}
                    />
                </ErrorOrLoading>
                <CheckDetailsView
                    key={selectedCheck?.id}
                    selectedCheck={selectedCheck}
                />
            </ListDetailsLayout>
        </div>
    )
}

const ListDetailsLayout = ({ children }) => {
    return <div className={css.listDetailsWrapper}>{children}</div>
}

ListDetailsLayout.propTypes = {
    children: PropTypes.node,
}