import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useMostRecentCheck } from '../checkDetailsStore.js'
import { LastRunTime } from './LastRunTime.js'
import css from './List.module.css'
import { StatusIcon } from './StatusIcon.js'
//import {useJobErrors} from "../use-job-errors";

export const List = ({ setSelectedCheck, selectedCheck, checks }) => {
    return (
        <div className={css.list}>
            {/*{checks?.length === 0 ? (
                <p className={css.noItemsMessage}>
                    {i18n.t('No integrity check matches your search criteria.')}
                </p>
            ) : null}*/}
            {checks?.map((check) => (
                <ListItem
                    //key={check.name}
                    key={check.id}
                    setSelectedCheck={setSelectedCheck}
                    check={check}
                    //selected={check.name === selectedCheck?.name}
                    selected={check.id === selectedCheck?.id}
                />
            ))}
        </div>
    )
}

List.propTypes = {
    setSelectedCheck: PropTypes.func.isRequired,
    checks: PropTypes.array,
    selectedCheck: PropTypes.object,
}

// type | code | time

export const ListItem = memo(function ListItem({
                                                   setSelectedCheck,
                                                   check,
                                                   selected,
                                               }) {
    //const mergedCheck = useMostRecentCheck(check)
    //const {data} = useJobErrors()

    return (
        <div
            className={cx(css.listItem, { [css.selected]: selected })}
            onClick={() => setSelectedCheck(check)}
        >
            <div className={css.checkInfo}>
                <header>{check.message}</header>
                <div className={css.subtitle}>
                    {/*<span>{getSeverityTranslation(mergedCheck.severity)}</span>*/}
                    <span>{check.type}</span>
                    <VerticalDivider/>
                    <span className={css.subtitleSection}>
                        {check.code}
                    </span>
                    {check.finished ? (
                        <>
                            <VerticalDivider />
                            <LastRunTime
                                value={check.finished}
                            />
                        </>
                    ) : null}
                </div>
            </div>
            {/*<span className={css.statusIcon}>
                <StatusIcon
                    count={mergedCheck.runInfo?.count}
                    loading={check.loading}
                />
            </span>*/}
        </div>
    )
})

ListItem.propTypes = {
    check: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    setSelectedCheck: PropTypes.func.isRequired,
}

const VerticalDivider = () => <span>|</span>