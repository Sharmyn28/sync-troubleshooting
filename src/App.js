import {CssVariables} from '@dhis2/ui'
import React from 'react'
import styles from './App.module.css'
import i18n from '@dhis2/d2-i18n'
import {DataIntegrity, ImportJobs} from "./page";

const MyApp = () => (
    <div>
        <CssVariables spacers colors/>
        <div className={styles.container}>
            {/*<ImportJobs/>*/}
            <div className={styles.contentWrapper}>
                <DataIntegrity/>
            </div>
        </div>
    </div>
)

export default MyApp
