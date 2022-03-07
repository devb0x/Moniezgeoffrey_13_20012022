import React from 'react'

import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p className={`${classes['footer-text']}`}>Copyright 2020 Argent Bank</p>
    </footer>
  )
}

export default Footer