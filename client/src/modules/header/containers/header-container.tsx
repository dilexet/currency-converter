import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/header'

const HeaderContainer: React.FC = () => {
  const location = useLocation()
  return <Header currentPath={location.pathname}/>
}

export default HeaderContainer
