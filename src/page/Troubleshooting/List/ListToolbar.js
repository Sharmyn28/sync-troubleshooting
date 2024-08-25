import i18n from '@dhis2/d2-i18n'
import {
    Button,
    IconInfo16,
    Input,
    SingleSelect,
    SingleSelectOption,
    Tab,
    TabBar,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import css from './List.module.css'
import {FILTER_OPTIONS, SORT_OPTIONS} from './sorter.js'

export const ListToolbar = ({
                                search,
                                setSearch,
                                filter,
                                setFilter,
                                sort,
                                setSort
                            }) => {
    return (
        <div className={css.listToolbar}>
            <Input
                dense
                className={css.searchInput}
                placeholder={i18n.t('Search')}
                name="search"
                onChange={({ value }) => setSearch(value)}
                value={search}
            />
            <SingleSelect
                selected={sort}
                dense
                placeholder={i18n.t('Sort')}
                prefix={i18n.t('Sort by')}
                className={css.searchInput}
                onChange={({ selected }) => setSort(selected)}
            >
                {SORT_OPTIONS.map(({ label, value }) => (
                    <SingleSelectOption
                        key={value}
                        label={label}
                        value={value}
                    />
                ))}
            </SingleSelect>
            <SingleSelect
                selected={filter}
                dense
                placeholder={i18n.t('Filter by Status')}
                prefix={i18n.t('Filter by')}
                className={css.searchInput}
                onChange={({ selected }) => setFilter(selected)}
            >
                {FILTER_OPTIONS.map(({ label, value }) => (
                    <SingleSelectOption
                        key={value}
                        label={label}
                        value={value}
                    />
                ))}
            </SingleSelect>
        </div>
    )
}

ListToolbar.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    setSort: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
}

export const EVENT = 'event'
export const TRACKER = 'tracker'

export const ToolbarTabs = ({ selectedTab, setSelectedTab }) => {
    return (
        <TabBar className={css.toolbarTabs}>
            <Tab
                selected={selectedTab === EVENT}
                onClick={() => setSelectedTab(EVENT)}
            >
                {i18n.t('Event')}
            </Tab>
            <Tab
                selected={selectedTab === TRACKER}
                onClick={() => setSelectedTab(TRACKER)}
            >
                {i18n.t('Tracker')}
            </Tab>
        </TabBar>
    )
}

ToolbarTabs.propTypes = {
    selectedTab: PropTypes.string.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
}