import { shallowEqual } from 'react-redux';

/**
 * Used for react-window with useIsScrolling.
 * https://github.com/bvaughn/react-window/issues/127
 */
export function areEqual(prevProps: any, nextProps: any) {
  // console.log('areEqual', prevProps, nextProps);
  const { style: prevStyle, isScrolling: prevIsScrolling, ...prevRest } = prevProps;
  const { style: nextStyle, isScrolling: nextIsScrolling, ...nextRest } = nextProps;

  return (
    shallowEqual(prevStyle, nextStyle) &&
    shallowEqual(prevRest, nextRest) &&
    (nextIsScrolling === prevIsScrolling || nextIsScrolling)
  );
}
