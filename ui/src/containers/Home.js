//React
import React from 'react'

//Antd
import { Layout, Breadcrumb, Tooltip } from 'antd'
import { FileDoneOutlined, DollarOutlined, LayoutOutlined,
        ClusterOutlined, ContactsOutlined, CalendarOutlined,
        WarningOutlined
    } from '@ant-design/icons'

//CSS
import './../build/css/Layout.css'

//Images
import logo from './../build/images/cowork_horizontal.png'

//Componenets
import MenuHeader from './../components/home/MenuHeader'
import Clients from './../components/clients/Clients'
import Services from './Services'
import Memberships from './Memberships'
import Incidences from './Incidences'


//React Router
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const user = JSON.parse(localStorage.getItem('user') || null)
var type_user = null

const Home = () => {

    if(user){
        type_user = user.type_user
    }

    const Breadcrumbs = () => <Route path="*" render={props => {
        let parts = props.location.pathname.split("/");
        const place = parts[parts.length-1]
        return (
            <Breadcrumb style={{position: 'absolute', top:160, left:80}}>
                <Breadcrumb.Item>
                    App
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {place}
                </Breadcrumb.Item>                
            </Breadcrumb>
            ) 
    }} />

    return (
        <Layout>
            <BrowserRouter >
            <Header style={{ paddingTop:'45px', paddingBottom:'64px' }}>
                <div className="logo">
                    <img src={logo} alt="logo"style={{width: '100%'}} />
                </div>
                <div style={{position: 'absolute', top:85, right:200}}>
                        <Tooltip title="Escritorio" color="red">  
                            <Link to="/" style={{marginRight:'20px', marginLeft:'20px'}}>
                                <LayoutOutlined style={{marginRight:'10px', fontSize: '30px', marginTop: '20px'}}/>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Clientes" color="geekblue">
                            <Link to="/clients" style={{marginRight:'20px', marginLeft:'20px'}}>                        
                                <ContactsOutlined style={{marginRight:'10px', fontSize: '30px'}}/>                        
                            </Link>
                        </Tooltip>                        
                        <Tooltip title="Servicios" color="volcano">
                            <Link to="/services"  style={{marginRight:'20px', marginLeft:'20px'}}>
                                <ClusterOutlined style={{marginRight:'10px', fontSize: '30px'}}/>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Membresias & Contratos" color="gold">
                            <Link to="/memberships" style={{marginRight:'20px', marginLeft:'20px'}}>
                                <FileDoneOutlined style={{marginRight:'10px', fontSize: '30px'}}/>
                            </Link>
                        </Tooltip>
                        {type_user === 'A' && 
                        <Tooltip title="Pagos & Gastos " color="magenta">
                            <Link to="/payments" style={{marginRight:'20px', marginLeft:'20px'}}>
                                <DollarOutlined style={{marginRight:'10px', fontSize: '30px'}}/>
                            </Link>
                        </Tooltip>}
                        <Tooltip title="Insidencias" color="lime">
                            <Link to="/incidences"  style={{marginRight:'20px', marginLeft:'20px'}}>
                                <WarningOutlined style={{marginRight:'10px', fontSize: '30px'}}/>
                            </Link>
                        </Tooltip> 
                        <Tooltip title="Reservas" color="green">
                            <Link to="/bookings"  style={{marginRight:'20px', marginLeft:'20px'}}>
                                <CalendarOutlined style={{marginRight:'10px', fontSize: '30px'}}/>
                            </Link>
                        </Tooltip>                                            
                </div>          

                
            </Header>
            <Header>
                <MenuHeader />
            </Header>

            <Content style={{ padding: '0 50px', paddingTop:'50px' }}>
                <Breadcrumbs />
                <div className="site-layout-content">
                <Switch>                
                    <Route exact path='/' component={()=><p style={{color:'red'}}>DASHBOARD</p>} />
                    <Route exact path='/clients' component={Clients} />                    
                    <Route exact path='/services' component={Services} />
                    <Route exact path='/memberships' component={Memberships} />
                    <Route exact path='/bookings' component={()=>'reservas'} />
                    <Route exact path='/payments' component={()=>'pagos'} />
                    <Route exact path='/incidences' component={Incidences} />
                 </Switch>
                </div>                
            </Content>
            </BrowserRouter>
            <Footer style={{ textAlign: 'center' }}>Cowork Chillán 2020 - ERP</Footer>            
        </Layout>
    )
}

export default Home
