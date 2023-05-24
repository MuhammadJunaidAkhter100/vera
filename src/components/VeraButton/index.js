import React from 'react'
import { Button } from '@mui/material'

import styles from './veraBtn.module.scss'

const VeraButton = ({children, icon, iconPosition, variant, onClick, danger}) => {
  return (
    <Button
        onClick={onClick}
        variant={variant}
        className={`${styles.veraButton} ${iconPosition && iconPosition} ${danger && styles.danger}`}
    >
        {icon}{children}
    </Button>
  )
}

export default VeraButton
