import React from 'react'

import { Modal, Row, Col, Card, Button, Tooltip } from 'antd'
import { CloudDownloadOutlined, UserOutlined, BuildOutlined,
        ContactsOutlined } from '@ant-design/icons'

//React Router
import { BrowserRouter } from 'react-router-dom'       

import clients from '../../api/clients/endpoints'

export const ModalReport = () => {


    Modal.info({
        title: 'DESCARGAR REPORTE',
        width: '800px',
        okText: 'Volver',
        content: <React.Fragment>
            <Row style={{'marginTop':'70px', 'marginBottom':'40px'}}>
                <BrowserRouter>
                <Col span={8}>
                    <Card title={
                        <>
                        <UserOutlined style={{'marginRight':'10px'}} />
                        Personas Naturales
                        </>
                        }>
                        <p>
                            Descarga el listado de clientes como persona natural, se adjunta el detalle de cada cliente registrado...
                        </p>
                        <Tooltip title="Descargar reporte" style={{'float':'right'}}>
                        
                            <Button shape="circle" type="primary" size="large" style={{'float':'right'}} 
                                onClick={() => clients.report_natural_person()}
                            >
                                <CloudDownloadOutlined style={{'height':'40px'}} />
                            </Button>
                        
                        </Tooltip>                        
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={
                        <>
                        <BuildOutlined style={{'marginRight':'10px'}} />
                        Empresas
                        </>
                    }>
                        <p>
                            Descarga el listado de empresas registradas, junto con la información segmentada de su representante legal...
                        </p>
                        <Tooltip title="Descargar reporte" style={{'float':'right'}}>
                            <Button shape="circle" type="primary" size="large" style={{'float':'right'}}
                                onClick={() => clients.report_business()}
                            >
                                <CloudDownloadOutlined />
                            </Button>
                        </Tooltip>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={
                        <>
                        <ContactsOutlined style={{'marginRight':'10px'}} />
                        R. Legales
                        </>
                    }>
                        <p>
                            Descarga el listado de representantes legales el cual indica a que empresa pertenece cada representante legal...
                        </p>
                        <Tooltip title="Descargar reporte" style={{'float':'right'}}>
                            <Button shape="circle" type="primary" size="large" style={{'float':'right'}}
                                onClick={() => clients.report_legal_represent()}
                            >
                                <CloudDownloadOutlined />
                            </Button>
                        </Tooltip>
                    </Card>
                </Col>
                </BrowserRouter>
            </Row>
        </React.Fragment>
    })

}
