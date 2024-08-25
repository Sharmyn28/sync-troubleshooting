import PropTypes from 'prop-types'
import React from 'react'
import styles from './PageHeader.module.css'

const PageHeader = ({ title, sectionKey }) => (
    <header className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
    </header>
)

PageHeader.propTypes = {
    sectionKey: PropTypes.string,
    title: PropTypes.string.isRequired,
}

export default PageHeader