import React, { useContext, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import socketIOClient from 'socket.io-client'

const DataContext = React.createContext()

export function useData() {
  return useContext(DataContext)
}

export function DataProvider({ children }) {
  const [allData, setAllData] = useState([])

  useEffect(() => {
    // Connect to the server
    const socket = socketIOClient(
      'https://mst-full-stack-dev-test.herokuapp.com/'
    )

    // Listens for the 'data-update' event and updates the state with recieved data
    socket.on('data-update', (recievedData) => {
      const alreadyExists =
        allData.length > 0 &&
        allData.find((data) => data.MSTID === recievedData.MSTID)

      if (alreadyExists) {
        console.log(`Data already exists. Id: ${alreadyExists.MSTID}`)
        const newData = allData
        const index = newData.indexOf(alreadyExists)
        newData.splice(index, 1, recievedData)
        setAllData(newData)
      } else {
        console.log(`New data. Id: ${recievedData.MSTID}`)
        setAllData([...allData, recievedData])
      }
    })

    // returns a cleanup function to disconnect from the server when component unmounts
    return () => socket.disconnect()
  }, [allData])

  const value = { allData }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataProvider

DataProvider.propTypes = {
  children: propTypes.node,
}
