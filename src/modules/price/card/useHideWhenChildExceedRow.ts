/**
 * 适用与标签group，标签长度不定，当标签行数超过maxRow时会隐藏超过的标签，并用replaceRef.current替换第maxRow行的最后一个元素。
 */

import { useLayoutEffect } from 'react'

interface IUseHideWhenChildExceedRow {
  <T extends HTMLElement, P extends HTMLElement>(
    config: {
      ref: React.RefObject<T>
      maxRow?: number
      childSelector: string
      replaceRef: React.RefObject<P>
    },
    deps: any[]
  ): void
}

const DEFAULT_LEFT = '10000px'

export const useHideWhenChildExceedRow: IUseHideWhenChildExceedRow = (
  { ref, maxRow, childSelector, replaceRef },
  deps
) => {
  useLayoutEffect(() => {
    if (ref.current && replaceRef.current) {
      const tops: number[] = []
      let isShowTotal = false
      const nodes: NodeListOf<HTMLElement> | null =
        ref.current.querySelectorAll(childSelector)
      const clientHeight = ref.current.clientHeight
      let offsetTop: number = 10000
      let offsetLeft: number = 10000
      let lastShowNode: HTMLElement | null = null
      ;(nodes || []).forEach((node: HTMLElement) => {
        if (tops.includes(node.offsetTop)) {
          node.style.opacity = '1'
          offsetTop = node.offsetTop
          offsetLeft = node.offsetLeft
          lastShowNode = node
        } else {
          if (maxRow && maxRow > 0) {
            if (tops.length >= maxRow) {
              node.style.opacity = '0'
              isShowTotal = true
            } else {
              node.style.opacity = '1'
              tops.push(node.offsetTop)
            }
          } else {
            if (node.offsetTop > clientHeight - 20) {
              node.style.opacity = '0'
              isShowTotal = true
            } else {
              node.style.opacity = '1'
              tops.push(node.offsetTop)
            }
          }
        }
      })
      if (isShowTotal && lastShowNode) {
        ;(lastShowNode as HTMLElement).style.opacity = '0'
        replaceRef.current.style.top = `${offsetTop}px`
        replaceRef.current.style.left = `${offsetLeft}px`
      } else {
        replaceRef.current.style.left = DEFAULT_LEFT
      }
    }
  }, [childSelector, maxRow, ref, replaceRef, ...deps])
}
