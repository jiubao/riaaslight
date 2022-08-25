import React, { PropsWithChildren } from 'react'
import { createStateContext, IStateContext } from './context'

interface IGroupProps<T> {
  disabled?: boolean
  value: T[]
  onChange: (value: T[]) => void
}

export const ToggleSelectorGroup = <T extends unknown>({
  disabled,
  value,
  onChange,
  children,
}: PropsWithChildren<IGroupProps<T>>) => {
  const Context = createStateContext<T>()
  const context: IStateContext<T> = {
    click: (key) => {
      if (disabled) return
      const keySet = new Set(value)
      keySet.has(key) ? keySet.delete(key) : keySet.add(key)
      onChange?.(Array.from(keySet))
    },
    disabled: false,
    value,
  }

  return (
    <Context.Provider value={context as IStateContext<T>}>
      {children}
    </Context.Provider>
  )
}
