import React, { useState, useEffect } from 'react'
import '../build/css/Layout.css'
import { Layout } from 'antd'
import logo from './../build/images/cowork_horizontal.png'
import FormUpdate from './../components/certification_b/FormUpdate'
import HeaderOptions from '../components/certification_b/HeaderOptions'
import MenuHeader from '../components/home/MenuHeader'
import clients from '../api/clients/endpoints'

const { Header, Content, Footer } = Layout


const Certification_b = ({state}) => {
    
    var user = state.user
    const [data, setData] = useState(null)

    useEffect(() => {

        async function getClient (){
            if(state.user.first_name === 'Empresa'){
                const requestGet = await clients.retrieve_business(user.username)
                    .then((response)=> {
                        setData(response.data.profile_b)
                })
                return requestGet
            } else {
                const requestGet = await clients.retrieve_client(user.username)
                    .then((response)=> {
                        console.log(response)
                        setData(response.data.profile_b)
                })
                return requestGet
           }
        }

        getClient()
        
    }, [])


    return(
        <Layout>
      
        <Header style={{ paddingTop:'45px', paddingBottom:'64px' }}>
            <div className="logo">
                <img src={logo} alt="logo"style={{width: '100%'}} />
            </div>
            
        </Header>
        <Header>
            <MenuHeader />
        </Header>
        <Header>
            <HeaderOptions />
        </Header>
        <Content style={{ padding: '0 50px', paddingTop:'50px' }}>
            <div className="site-layout-content">  
            {data && 
                <FormUpdate initial={data} />                    
            }              
            </div>                
        </Content>
      
        <Footer style={{ textAlign: 'center' }}>Cowork Chillán 2020 - ERP</Footer>            
    </Layout>
    )
}

export default Certification_b
