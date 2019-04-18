import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames/bind'

import { getAriaLabel } from '../a11y'

import styles from '../index.css'

const cx = cn.bind(styles)

class Trigger extends PureComponent {
  static propTypes = {
    onTrigger: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    showDropdown: PropTypes.bool,
    label: PropTypes.string,
  }

  getAriaAttributes = () => {
    const { simpleSelect, label, showDropdown } = this.props

    const attributes = {
      role: 'button',
      tabIndex: 0,
      'aria-haspopup': simpleSelect ? 'listbox' : 'tree',
      'aria-expanded': showDropdown ? 'true' : 'false',
      ...getAriaLabel(label),
    }

    return attributes
  }

  handleTrigger = e => {
    // Just return if triggered from keyDown and the key isn't enter, space or arrow down
    if (e.key && e.keyCode !== 13 && e.keyCode !== 32 && e.keyCode !== 40) {
      return
    } else if (e.key && this.triggerNode && this.triggerNode !== document.activeElement) {
      // Do not trigger if not activeElement
      return
    } else if (!this.props.showDropdown && e.keyCode === 32) {
      // Avoid adding space to input on open
      e.preventDefault()
    }

    // Else this is a key press that should trigger the dropdown
    this.props.onTrigger(e)
  }

  render() {
    const { disabled, readOnly, showDropdown } = this.props

    const dropdownTriggerClassname = cx({
      'dropdown-trigger': true,
      arrow: true,
      disabled,
      readOnly,
      top: showDropdown,
      bottom: !showDropdown,
    })

    return (
      <a
        ref={node => {
          this.triggerNode = node
        }}
        className={dropdownTriggerClassname}
        onClick={!disabled ? this.handleTrigger : undefined}
        onKeyDown={!disabled ? this.handleTrigger : undefined}
        {...this.getAriaAttributes()}
      >
        {this.props.children}
      </a>
    )
  }
}

export default Trigger
