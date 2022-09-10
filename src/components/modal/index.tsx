import React, { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

const PREFIX = 'Modal'
const BU = 'ModalBU'

export const Modal0: React.FC<PropsWithChildren<{ visible: boolean }>> = ({
  children,
  visible,
}) => {
  if (!visible) return null
  return <div className={`${PREFIX} ${BU}`}>{children}</div>
}

const modalRoot = document.getElementById('modalRoot')
export const BUModal: React.FC<PropsWithChildren> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={`${PREFIX} ${BU}`}>{children}</div>,
    modalRoot!
  )
}

export const CommonModal: React.FC<PropsWithChildren> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={PREFIX}>{children}</div>,
    modalRoot!
  )
}
