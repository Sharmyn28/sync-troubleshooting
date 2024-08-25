import i18n from '@dhis2/d2-i18n'
import { Button, Tag, IconSync16, Divider } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useLayoutEffect, useState, useRef } from 'react'
import { getSeverityTranslation } from '../severityTranslation.js'
import css from './CheckDetails.module.css'

export const CheckInfo = ({check}) => {
    return (
        <div className={css.checkInfo}>
            <CheckHeader name={check.message}></CheckHeader>
            <Divider dense />

            <div className={css.keyInfoWrapper}>
                <div className={css.keyInfo}>
                    <h3>{i18n.t('Status')}</h3>
                    <Tag negative>{check.status}</Tag>
                </div>

                <div className={css.keyInfo}>
                    <h3>{i18n.t('Code')}</h3>
                    <Tag neutral>{check.code}</Tag>
                </div>

                <CheckKeyInfoItem value={check.type} label={i18n.t('Type')}/>
            </div>

            {/*<div className={css.keyInfoWrapper}>
                <CheckKeyInfoItem
                    label={i18n.t('Severity')}
                    value={getSeverityTranslation(check.severity)}
                />
                <CheckKeyInfoItem
                    label={i18n.t('Section')}
                    value={check.section}
                />
            </div>*/}

            {/*{check.introduction && (
                <CheckIntroduction introduction={check.introduction} />
            )}*/}
        </div>
    )
}

CheckInfo.propTypes = {
    /*check: PropTypes.shape({
        displayName: PropTypes.string,
        introduction: PropTypes.string,
        name: PropTypes.string,
        section: PropTypes.string,
        severity: PropTypes.string,
    }).isRequired,*/
}

const CheckHeader = ({ name, children }) => {
    return (
        <header>
            <h2>{name}</h2>
            {children}
        </header>
    )
}

CheckHeader.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
}

const CheckKeyInfoItem = ({ label, value }) => {
    return (
        <div className={css.keyInfo}>
            <h3>{label}</h3>
            <span>{value}</span>
        </div>
    )
}

CheckKeyInfoItem.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
}

const CheckIntroduction = ({ introduction }) => {
    const [expanded, setExpanded] = useState(false)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const textRef = useRef(null)

    useLayoutEffect(() => {
        if (!textRef.current) {
            return
        }
        // handle dynamic overflowing
        // hiding the "fade" and "Show more" button when there's enough space
        const observer = new ResizeObserver(() => {
            if (!textRef.current) {
                return
            }
            setIsOverflowing(
                textRef.current.offsetHeight < textRef.current.scrollHeight
            )
        })
        observer.observe(textRef.current)
        return () => observer.disconnect()
    }, [expanded])

    return (
        <div className={css.introduction}>
            <h3>{i18n.t('About this check')}</h3>
            <p
                ref={textRef}
                className={cx(css.introductionText, {
                    [css.overflowing]: isOverflowing,
                    [css.expanded]: expanded,
                })}
            >
                {introduction}
            </p>
            {isOverflowing && (
                <div className={css.showMoreButton}>
                    <Button small onClick={() => setExpanded(true)}>
                        {i18n.t('Show more')}
                    </Button>
                </div>
            )}
        </div>
    )
}

CheckIntroduction.propTypes = {
    introduction: PropTypes.string,
}
