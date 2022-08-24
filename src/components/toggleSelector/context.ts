import { once } from 'lodash'
import React, { useContext } from 'react'
import { IDocument } from '../../domain'

export interface IStateContext<T extends IDocument> {
  // itemKey: K;
  disabled?: boolean
  isSelecting: boolean
  checkedKeys: T['id'][]
  click: (key: T['id']) => void
}

// https://stackoverflow.com/questions/51448291/how-to-create-a-generic-react-component-with-a-typed-context-provider
export const createStateContext = once(<T extends IDocument>() => {
  const defaultContextValue: IStateContext<T> = {
    // itemKey: 'id' as keyof T,
    disabled: false,
    isSelecting: false,
    checkedKeys: [],
    click: () => {},
  }
  return React.createContext(defaultContextValue)
})

export const useStateContext = <T extends IDocument>() =>
  useContext(createStateContext<T>())
