import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import GlobalStyle from '../globalStyle'
import Head from 'next/head'
import wrapper from '../store/configureStore'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>MYSNS</title>
      </Head>

      <GlobalStyle />
      <Component {...pageProps}/>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

// export function reportWebVitals(metric) {
//   console.log(metric);    
// }

export default wrapper.withRedux(App);
