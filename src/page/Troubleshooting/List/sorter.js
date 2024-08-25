import i18n from '@dhis2/d2-i18n'

export const SORT = {
    latest: {
        label: i18n.t('Latest'),
        value: 'latest',
        sorter: (a, b) => a.section.localeCompare(b.section),
    },
    oldest: {
        label: i18n.t('Oldest'),
        value: 'oldest',
        sorter: (a, b) => a.section.localeCompare(b.section),
    },
    type: {
        label: i18n.t('Type'),
        value: 'type',
        sorter: (a, b) => a.section.localeCompare(b.section),
    },
    'A-Z': {
        label: i18n.t('A-Z'),
        value: 'A-Z',
        sorter: (a, b) => a.name.localeCompare(b.name),
    }
    /*section: {
        label: i18n.t('Section'),
        value: 'section',
        sorter: (a, b) => a.section.localeCompare(b.section),
    },*/
    /*severity: {
        label: i18n.t('Severity'),
        value: 'severity',
        sorter: (a, b) => {
            const severityOrder = {
                INFO: 0,
                WARNING: 1,
                SEVERE: 2,
                CRITICAL: 3,
            }
            const severityDiffs =
                (severityOrder[b.severity] || -1) -
                (severityOrder[a.severity] || -1)
            // sort by section if severity is the same
            if (severityDiffs === 0) {
                return SORT.section.sorter(a, b)
            }
            return severityDiffs
        },
    },
    errors: {
        label: i18n.t('Number of errors'),
        value: 'errors',
        sorter: (a, b) => {
            if (
                a.runInfo?.count == undefined ||
                b.runInfo?.count == undefined
            ) {
                return SORT.section.sorter(a, b)
            }
            return b.runInfo.count - a.runInfo.count
        },
    },*/
}

export const SORT_OPTIONS = Object.values(SORT).map((sort) => ({
    label: sort.label,
    value: sort.value,
}))

export const FILTER = {
    status: {
        label: i18n.t('Status'),
        value: 'status',
        sorter: (a, b) => a.section.localeCompare(b.section),
    },
    type: {
        label: i18n.t('Type'),
        value: 'type',
        sorter: (a, b) => a.section.localeCompare(b.section),
    },
    Code: {
        label: i18n.t('Code'),
        value: 'code',
        sorter: (a, b) => a.section.localeCompare(b.section),
    },
    user: {
        label: i18n.t('User'),
        value: 'user',
        sorter: (a, b) => a.section.localeCompare(b.section),
    }
}

export const FILTER_OPTIONS = Object.values(FILTER).map((sort) => ({
    label: sort.label,
    value: sort.value,
}))