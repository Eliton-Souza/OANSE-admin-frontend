import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span>OANSE JAPIIM</span>
        <span className="ms-1">&copy; 2023</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
