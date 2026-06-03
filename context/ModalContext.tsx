'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type PlanKey = 'arranca' | 'crece' | 'sistema' | ''

interface ModalContextType {
  isOpen: boolean
  selectedPlan: PlanKey
  openModal: (plan?: PlanKey) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  selectedPlan: '',
  openModal: () => {},
  closeModal: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('')

  const openModal = (plan: PlanKey = '') => {
    setSelectedPlan(plan)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  return (
    <ModalContext.Provider value={{ isOpen, selectedPlan, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
