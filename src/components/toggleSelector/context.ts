import { once } from 'lodash'
import React, { useContext } from 'react'

export interface IStateContext<T> {
  disabled?: boolean
  checkedKeys: T[]
  click: (key: T) => void
}

// https://stackoverflow.com/questions/51448291/how-to-create-a-generic-react-component-with-a-typed-context-provider
export const createStateContext = once(<T>() => {
  const defaultContextValue: IStateContext<T> = {
    disabled: false,
    checkedKeys: [],
    click: () => {},
  }
  return React.createContext(defaultContextValue)
})

export const useStateContext = <T>() =>
  useContext(createStateContext<T>())
