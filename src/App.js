import React from 'react'

import Table from './components/Table'
import DataProvider from './contexts/DataContext'

import './App.css'

function App() {
  return (
    <div className="App p-3 ">
      <DataProvider>
        <Table />
      </DataProvider>
    </div>
  )
}

export default App
