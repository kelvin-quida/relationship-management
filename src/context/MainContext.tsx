import { TClient, TOffice } from '@/types'
import React, { createContext, useState, useContext } from 'react'

interface GlobalContextProps {
  isDialogOpen: boolean
  openDialog: () => void
  closeDialog: () => void
  
  setClientDataContext: (data: TClient | undefined) => void
  clientData: TClient | undefined

  setOfficeDataContext: (data: TOffice | undefined) => void
  officeData: TOffice | undefined
}


const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

function GlobalProvider(props: { children: React.ReactNode }) {
  const [isDialogOpen, setisDialogOpen] = useState(false)
  const [clientData, setClientData] = useState<TClient>()
  const [officeData, setOfficeData] = useState<TOffice>()

  const openDialog = () => {
    setisDialogOpen(true)
  }

  const closeDialog = () => {
    setisDialogOpen(false)
  }

  const setClientDataContext = (data: TClient | undefined) => {
    setClientData(data)
  }

   const setOfficeDataContext = (data: TOffice | undefined) => {
    setOfficeData(data)
  }

  

  return (
    <GlobalContext.Provider
      value={{ isDialogOpen, openDialog, closeDialog, clientData, officeData, setClientDataContext, setOfficeDataContext }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

const useDataContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useDialog must be used within a GlobalProvider')
  }
  return context
}

export { GlobalProvider, useDataContext }
