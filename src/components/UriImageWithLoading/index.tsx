import * as React from 'react'
import { omit } from 'lodash'
import classNames from 'classnames'
import './index.scss'

const PREFIX = 'UriImageWidthLoading'
interface IProps {
  imageUri?: string
  placeholder?: React.ReactNode
  placeholderNode?: React.ReactNode
  forwardedRef?: React.Ref<HTMLImageElement>
  onLoaded?: (image?: HTMLImageElement) => void
  onError?: () => void
  timeout?: number
  [key: string]: any
  loadingNode?: React.ReactNode
  loadingImg?: string
}

interface IState {
  imageUri: string
  status: string
  timestamp: number
}
/**
 * The pic will load for 6secs before showing error and reload message.
 * If pic is loaded within 6secs the timer is cleared.
 */
export class UriImageWithLoading extends React.PureComponent<IProps, IState> {
  state = { imageUri: '', status: 'loading', timestamp: Date.now() }
  timer = 0

  componentDidMount() {
    if (this.props.timeout !== undefined && this.props.timeout !== 0) {
      this.setTimer()
    }
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.imageUri !== prevState.imageUri) {
      return {
        imageUri: nextProps.imageUri,
        status: nextProps.imageUri ? 'loading' : 'error',
      }
    }
    return {
      imageUri: nextProps.imageUri,
    }
  }

  componentDidUpdate() {
    this.state.status === 'loading' &&
      this.props.timeout !== undefined &&
      this.props.timeout !== 0 &&
      this.setTimer()
  }
  componentWillUnmount() {
    this.clearTimer()
  }
  setTimer = () => {
    this.clearTimer()
    this.timer = window.setTimeout(() => {
      this.setState({ status: 'error' })
      this.props.onError?.()
    }, this.props.timeout)
  }
  clearTimer = () => {
    this.timer > 0 && window.clearTimeout(this.timer)
  }
  onReload = () => this.setState({ status: 'loading', timestamp: Date.now() })
  onError = () => {
    this.setState({ status: 'error' })
    this.props.onError?.()
  }
  onLoad = (image: React.ChangeEvent<HTMLImageElement>) => {
    const { onLoaded } = this.props
    if (this.state.status !== 'error') {
      this.clearTimer()
      this.setState({ status: 'loaded' })
      onLoaded && onLoaded(image.target)
    }
  }
  render() {
    const {
      imageUri,
      forwardedRef,
      placeholder,
      loadingImg,
      loadingNode,
      className,
      placeholderNode,
      ...rest
    } = this.props
    const { status } = this.state
    const otherProps = omit(this.props, [
      'imageUri',
      'forwardedRef',
      'className',
    ])
    const imageSrc = imageUri
    return (
      <div className={classNames(className, `${PREFIX}`)} {...rest}>
        {status === 'loading' && (
          <div className={classNames(`${PREFIX}-loading`, 'u-noEvent')}>
            {loadingNode ? (
              loadingNode
            ) : loadingImg ? (
              <img className={`${PREFIX}-img`} src={loadingImg} alt="" />
            ) : null}
          </div>
        )}
        <img
          alt=""
          ref={forwardedRef}
          {...otherProps}
          src={imageSrc}
          key={this.state.timestamp}
          onLoad={this.onLoad}
          onError={this.onError}
          className={classNames(
            `${PREFIX}-img`,
            `${PREFIX}-contentImg`,
            'u-noEvent',
            {
              'u-hidden': status !== 'loaded',
            }
          )}
        />
        {status === 'error' &&
          (placeholderNode ? (
            placeholderNode
          ) : (
            <div
              className={classNames(`${PREFIX}-error`)}
              onClick={this.onReload}
            >
              {typeof placeholder === 'string' ? (
                <img className={`${PREFIX}-img`} src={placeholder} alt="" />
              ) : (
                placeholder || ''
              )}
            </div>
          ))}
      </div>
    )
  }
}

export const UriImageWithRefAndLoading = React.forwardRef<
  HTMLImageElement,
  IProps
>((props, ref) => <UriImageWithLoading {...props} forwardedRef={ref} />)
