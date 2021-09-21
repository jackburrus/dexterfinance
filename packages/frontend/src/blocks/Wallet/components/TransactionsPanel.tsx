import React from 'react'
import { PanelComponent } from './AssetsPanel'

interface Props {}

const TransactionsPanel = (props: Props) => {
  return (
    <PanelComponent {...props}>
      <h1>Hello</h1>
    </PanelComponent>
  )
}

export default TransactionsPanel
