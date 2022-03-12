import Head from 'next/head'
import React from 'react'
import PropTypes from 'prop-types'

function Header(props) {
  return (
    <Head>
      <meta charSet='utf-8'/>
      <title>{props.title}</title>
    </Head>
  )
}



export default Header
