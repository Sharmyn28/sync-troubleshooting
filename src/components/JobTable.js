import React from "react";
import {DataTable, TableHead, DataTableRow, DataTableColumnHeader, TableBody, DataTableCell} from '@dhis2/ui'

export const JobTable = ({rows}) => {

    return (
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>
                        Import Job ID
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Import Job type
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        User id
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Incident date
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Last executed
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Errors
                    </DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow
                        key={index}
                        jobID={row.id}
                        type={row.type}
                        user={row.user}
                        createdAt={row.created}
                        executedAt={row.executed}
                        errors={row.errors}
                    />
                ))}
            </TableBody>
        </DataTable>
    )
}

const TableRow = ({jobID, type, user, createdAt, executedAt, errors}) => (
    <DataTableRow>
        <DataTableCell>
            {jobID}
        </DataTableCell>
        <DataTableCell>
            {type}
        </DataTableCell>
        <DataTableCell>
            {user}
        </DataTableCell>
        <DataTableCell>
            {createdAt}
        </DataTableCell>
        <DataTableCell>
            {executedAt}
        </DataTableCell>
        <DataTableCell>
            {errors?.map((error) => (
                <ErrorList
                    key={error.id}
                    id={error.id}
                    type={error.type}
                    code={error.code}
                    message={error.message}
                />
            ))}
        </DataTableCell>
    </DataTableRow>
)

const ErrorList = ({id, message, code, type}) => (
    <p>
       <em>{id}</em> / <strong>{code}</strong> /<strong>{type}</strong>/ {message}
    </p>
)