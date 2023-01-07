import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useData } from '../contexts/DataContext'
import '../App.css'

function Table() {
  const { allData } = useData()

  const [sortField, setSortField] = useState('MSTID')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = (field) => {
    console.log(
      `Sort ${
        sortDirection === 'asc' ? 'ascending' : 'descending'
      } via field: ${field}`
    )
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedData = (data) =>
    data.sort((a, b) => {
      if (
        sortField == null ||
        !a.hasOwnProperty(sortField) ||
        !b.hasOwnProperty(sortField)
      ) {
        return 0
      }
      if (sortDirection === 'asc') {
        return a[sortField] < b[sortField]
          ? -1
          : a[sortField] > b[sortField]
          ? 1
          : 0
      }
      return b[sortField] < a[sortField]
        ? -1
        : b[sortField] > a[sortField]
        ? 1
        : 0
    })

  return allData.length > 0 ? (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          {allData.length > 0 &&
            Object.entries(allData[0]).map(([key]) => (
              <th
                className={`${
                  sortField === key
                    ? 'bg-gray-200 flex gap-1 items-center justify-center'
                    : 'bg-gray-100'
                } cursor-pointer px-5 py-3 border-b-2 border-gray-200 hover:bg-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider`}
                onClick={() => handleSort(`${key}`)}
              >
                {key}
                {sortField === key && (
                  <FontAwesomeIcon
                    icon={sortDirection === 'asc' ? faArrowUp : faArrowDown}
                  />
                )}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {sortedData(allData).map((row) => (
          <tr
            key={row.MSTID}
            className="px-5 py-5 border-gray-200 bg-white text-sm hover:bg-gray-100"
          >
            {Object.entries(row).map(([key, value]) => (
              <td
                className={`${
                  sortField === key ? 'bg-gray-100' : ''
                } border px-4 py-2`}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-3"
      role="status"
    >
      <h1 className="font-medium text-lg">Loading...</h1>
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  )
}

export default Table
