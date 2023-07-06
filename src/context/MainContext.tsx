import { TClientWithOffice, TOffice } from '@/types'
import React, { createContext, useState, useContext } from 'react'

interface GlobalContextProps {
  isDialogOpen: boolean
  openDialog: () => void
  closeDialog: () => void

  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void

  setClientDataContext: (data: TClientWithOffice | undefined) => void
  clientData: TClientWithOffice | undefined

  setOfficeDataContext: (data: TOffice | undefined) => void
  officeData: TOffice | undefined
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

function GlobalProvider(props: { children: React.ReactNode }) {
  const [isDialogOpen, setisDialogOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clientData, setClientData] = useState<TClientWithOffice>()
  const [officeData, setOfficeData] = useState<TOffice>()

  const openDialog = () => {
    setisDialogOpen(true)
  }

  const closeDialog = () => {
    setisDialogOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const setClientDataContext = (data: TClientWithOffice | undefined) => {
    setClientData(data)
  }

  const setOfficeDataContext = (data: TOffice | undefined) => {
    setOfficeData(data)
  }

  return (
    <GlobalContext.Provider
      value={{
        isDialogOpen,
        openDialog,
        closeDialog,
        clientData,
        officeData,
        setClientDataContext,
        setOfficeDataContext,
        isModalOpen,
        openModal,
        closeModal,
      }}
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
