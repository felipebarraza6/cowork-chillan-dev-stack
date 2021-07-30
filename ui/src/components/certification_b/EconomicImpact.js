import React from 'react'
import { Col, Row, Input, 
        Form, Button, Select,
        Checkbox, Typography } from 'antd'
import { PlusCircleOutlined} from '@ant-design/icons'

const {TextArea}=Input
const {Item:ItemForm}=Form
const {Text} = Typography

const EconomicImpact = () => {

    return(
        <Form layout={'vertical'}>
            <Row>    
                <Col span={12} style={styles.col}>
                    <ItemForm label='Categoría empresa: Ventas acumuladas al 31 dic del año anterior' name='accumulated_salves'>
                        <Select placeholder='Selecciona tu categoria...' style={{width:'300px'}}>
                         </Select>
                    </ItemForm>
                    <ItemForm label='Cuanto has gastado en costos fijos de oficiina antes de llegar a cowork?'>
                        <Select placeholder='Selecciona tu rango...' style={{width:'300px'}}>
                        </Select>
                    </ItemForm>
                    <ItemForm label='Mipyme es el único ingreso para la famila?' >
                        <Checkbox /> SI
                    </ItemForm>
                    <ItemForm label='Los trabajadores de la Mipyme han sido beneficiados de  subsidios'>
                        <Checkbox/> SI
                    </ItemForm>
                    <ItemForm label='Tu empresa se a adscrito a la ley de protección del empleo' >
                        <Checkbox /> SI
                    </ItemForm>
                    <ItemForm label='Que beneficios de subsidios o ayudas economicas has recibido, de que instituciones del estado(corfo, sercotec, entre otras...) EXPLIQUE CUALES' >
                        <Checkbox /> SI
                    </ItemForm>
                </Col>
                <Col span={12} style={styles.col}>
                    <Text>Pago de iva al 31 diciembre del año anterior (incluir años para individualizar a qué año se refiere)</Text>
                    <Row style={{marginTop:'10px', marginBottom:'20px'}}>
                        <Col>
                            <Input placeholder='Año' />
                        </Col>
                        <Col>
                            <Input placeholder='Monto (CLP)' />
                        </Col>

                        <Col>
                            <Button icon={<PlusCircleOutlined />} type='primary' />
                        </Col>
                    </Row>
                    <ItemForm label='% de variación ventas en relación al año anterior (selecciona 2 años para realizar el caculo):' name='percentage variation'>
                    </ItemForm>                                                        
                </Col>        
                <Col span={24} style={{textAlign: 'right'}}>
                    <Button type='primary'>Guardar</Button>
                </Col>
            </Row> 
        </Form>
 
    )

}


const styles = {
    col: {
        paddingRight:'5px',
        paddingLeft:'5px'
    }
}


export default EconomicImpact
