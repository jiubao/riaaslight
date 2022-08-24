import React, { PropsWithChildren } from 'react'
import { IDocument } from '../../domain'
import { createStateContext, IStateContext } from './context'

interface IGroupProps<T extends IDocument> {
  items: T[]
  disabled?: boolean
  values: T['id'][]
  onChange: (values: T['id'][], isSelecting: boolean) => void
}

export const ToggleSelectorGroup = <T extends IDocument>({
  children,
}: PropsWithChildren<IGroupProps<T>>) => {
  const Context = createStateContext<T>()

  const context: IStateContext<T> = {
    click: (key) => {},
    disabled: false,
    isSelecting: false,
    checkedKeys: [],
  }

  return (
    <Context.Provider value={context as IStateContext<T>}>
      {children}
    </Context.Provider>
  )
}
