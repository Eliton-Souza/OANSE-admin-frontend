import React from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import logo from "../assets/images/OanseLogo.png"

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {

  return (
    <CSidebar
      position="fixed"
    >
    <CSidebarBrand className="d-none d-md-flex" to="/">
      <img src= {logo}className='mt-2 mb-3 ml-auto-mr-autoo' width= "70%" />
    </CSidebarBrand>
    <CSidebarNav>
      <SimpleBar>
        <AppSidebarNav items={navigation} />
      </SimpleBar>
    </CSidebarNav>
  </CSidebar>
  )
}

export default React.memo(AppSidebar)
