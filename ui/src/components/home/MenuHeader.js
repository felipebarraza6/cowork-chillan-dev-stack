//React
import React, { useContext, useEffect, useState } from 'react'

//Antd
import { Button, Tag, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

//AuthContext
import { AuthContext } from '../../App'


const MenuHeader = () =>{

    const [userData, setUserData] = useState()
    
    
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user') || null)
    
        if(user){
          setUserData(user)
        }
    
      }, [])
    
    const { dispatch } = useContext(AuthContext)

    return(
        <React.Fragment>
        
        <div style={{position: 'absolute', top:'15px', right:'60px' }}>            
            {userData &&
            <>  
                <Tag color='processing' style={{fontSize:'18px', paddingTop:'4px', paddingBottom:'5px'}} >
                    @{userData.username}
                </Tag>
                <Tooltip title="Cerrar Sesión">
                 <Button onClick={() => dispatch({type:'LOGOUT'})} type="link">
                    <LogoutOutlined  style={{ fontSize:'25px' }} />            
                </Button>
                </Tooltip>
             </>
            } 
        </div>
        </React.Fragment>
    )
}

export default MenuHeader
