import { useTimeZoneConversion } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { IconChevronDown24, IconChevronUp24, NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import {
    getDurationWithUnitFromDelta,
    selectedLocale,
} from '../../../utils'
import {ErrorIconF, StatusIcon} from '../List/StatusIcon.js'
import css from './CheckDetails.module.css'
import { CheckIssues } from './CheckIssues.js'
import { checkProps } from './checkProps.js'
import { Notice } from './Notice.js'

export const CheckRunCompleted = ({ detailsCheck }) => {
    const [expandSummary, setExpandSummary] = useState(true)

    const passed = detailsCheck.issues.length === 0

    return (
        <div className={css.runCompletedWrapper}>
            {!passed && detailsCheck.recommendation && (
                <Recommendation>{detailsCheck.recommendation}</Recommendation>
            )}
            <div
                className={css.completedTimeWrapper}
                onClick={() => setExpandSummary((prev) => !prev)}
            >
                <CompletedTime
                    finishedTime={detailsCheck.finishedTime}
                    issuesCount={detailsCheck.issues.length}
                    expanded={expandSummary}
                />
                {expandSummary ? <IconChevronUp24 /> : <IconChevronDown24 />}
            </div>
            {expandSummary && <RunSummary detailsCheck={detailsCheck} />}
        </div>
    )
}

CheckRunCompleted.propTypes = {
    detailsCheck: checkProps,
}

const RunSummary = ({ detailsCheck }) => {
    const jobDurationMs =
        new Date(detailsCheck.finishedTime).getTime() -
        new Date(detailsCheck.startTime).getTime()

    const passed = detailsCheck.issues.length === 0

    return (
        <div className={css.runSummary}>
            {passed ? (
                <CheckRunSuccess />
            ) : (
                <CheckIssues detailsCheck={detailsCheck} />
            )}
            <div className={css.completedDuration}>
                {i18n.t('Completed in {{time}}', {
                    time: getDurationWithUnitFromDelta(jobDurationMs),
                })}
            </div>
        </div>
    )
}

RunSummary.propTypes = {
    detailsCheck: checkProps,
}

const CompletedTime = ({ issuesCount, finishedTime }) => {
    const { fromServerDate } = useTimeZoneConversion()

    const latestRun = fromServerDate(finishedTime)
    const formattedLatestRun = Intl.DateTimeFormat([selectedLocale], {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(latestRun)

    return (
        <header title={latestRun.getClientZonedISOString()}>
            {i18n.t('Latest error {{time}}', {
                time: formattedLatestRun,
                interpolation: { escapeValue: false },
            })}
            <ErrorIconF/>
            {/*<StatusIcon count={issuesCount} />*/}
        </header>
    )
}

CompletedTime.propTypes = {
    finishedTime: PropTypes.string,
    issuesCount: PropTypes.number,
}

const CheckRunSuccess = () => {
    return <Notice status={'success'}>{i18n.t('Passed with 0 errors.')}</Notice>
}

const Recommendation = ({ children }) => (
    <NoticeBox title={i18n.t('Recommendation')}>{children}</NoticeBox>
)

Recommendation.propTypes = {
    children: PropTypes.node,
}

export const DetailsError = ({ check }) => {
    return (
        <div className={css.runCompletedWrapper}>
            <CompletedTime
                finishedTime={check.finished}
                /*issuesCount={check.issues.length}*/
            />
            <div
                className={css.completedTimeWrapper}
            >
                <Notice status="error" title={check.user}>
                    <>
                        <span className={css.detailsItem}>{check.message}</span>
                        <div className={css.detailsWrapper}>
                            <DetailsItem value={check.id} label={i18n.t('Error ID: ')}/>
                            <DetailsItem value={check.jobId} label={i18n.t('Import Job ID: ')}/>

                            {/*{check?.orgUnit && <DetailsItem value={check.orgUnit} label={i18n.t('Org Unit: ')}/>}*/}
                            {check?.program && <DetailsItem value={check.program} label={i18n.t('Program: ')}/>}
                            {/*{check?.enrollment && <DetailsItem value={check.enrollment} label={i18n.t('Enrollment: ')}/>}*/}
                            {check?.programStage && <DetailsItem value={check.programStage} label={i18n.t('Program Stage: ')}/>}
                           {/* {check?.event && <DetailsItem value={check.event} label={i18n.t('Event: ')}/ />}
                            {check?.tei && <DetailsItem value={check.tei} label={i18n.t('TEI: ')}/ />}
                            {check?.dataElement && <DetailsItem value={check.dataElement} label={i18n.t('Data Element: ')}/ />}
                            {check?.tea && <DetailsItem value={check.tea} label={i18n.t('TEA: ')}/ />}*/}

                        </div>
                    </>
                </Notice>
            </div>
        </div>
    )

}

const DetailsItem = ({label, value}) => (
    <div>
        <span className={css.detailsItemLabel}>{label}</span>
        <span className={css.detailsItem}>{value}</span>
    </div>
)