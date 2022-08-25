import React, { PropsWithChildren } from 'react'
import { createStateContext, IStateContext } from './context'

interface IGroupProps<T> {
  disabled?: boolean
  values: T[]
  onChange: (values: T[]) => void
}

export const ToggleSelectorGroup = <T extends number | string>({
  disabled,
  values,
  onChange,
  children,
}: PropsWithChildren<IGroupProps<T>>) => {
  const Context = createStateContext<T>()
  const context: IStateContext<T> = {
    click: (key) => {
      if (disabled) return
      const keySet = new Set(values)
      keySet.has(key) ? keySet.delete(key) : keySet.add(key)
      onChange?.(keySet.values() as unknown as T[])
    },
    disabled: false,
    checkedKeys: [],
  }

  return (
    <Context.Provider value={context as IStateContext<T>}>
      {children}
    </Context.Provider>
  )
}
