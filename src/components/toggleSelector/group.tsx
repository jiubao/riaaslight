import React, { PropsWithChildren } from 'react'
import { createStateContext, IStateContext } from './context'

interface IGroupProps<T> {
  mode?: 'SINGLE' | 'MULTIPLE'
  disabled?: boolean
  value: T[]
  onChange: (value: T[]) => void
}

export const ToggleSelectorGroup = <T extends unknown>({
  mode = 'MULTIPLE',
  disabled = false,
  value,
  onChange,
  children,
}: PropsWithChildren<IGroupProps<T>>) => {
  const Context = createStateContext<T>()
  const context: IStateContext<T> = {
    click: (key) => {
      if (disabled) return
      if (mode === 'MULTIPLE') {
        const valueSet = new Set(value)
        valueSet.has(key) ? valueSet.delete(key) : valueSet.add(key)
        onChange?.(Array.from(valueSet))
      } else {
        onChange?.(value.length === 0 || value[0] !== key ? [key] : [])
      }
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
