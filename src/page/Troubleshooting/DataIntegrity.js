import PropTypes from 'prop-types'
import React from 'react'
import PageHeader from '../../components/PageHeader/PageHeader.js'
import { i18nKeys } from '../../i18n-keys.js'
import css from './DataIntegrity.module.css'
import { DataIntegrityList } from './List/DataIntegrityList.js'

export const DataIntegrity = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.header}>
                <PageHeader
                    className={css.header}
                    //sectionKey={sectionKey}
                    title={i18nKeys.dataIntegrity.title}
                />
            </div>
            <DataIntegrityList />
        </div>
    )
}

DataIntegrity.propTypes = {
    sectionKey: PropTypes.string,
}

//export default DataIntegrity