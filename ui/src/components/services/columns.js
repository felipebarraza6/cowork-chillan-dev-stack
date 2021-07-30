import React, { useState } from 'react'
import { Button, Modal, Tooltip } from 'antd'
import { LikeFilled, DislikeFilled, DeleteOutlined } from '@ant-design/icons'
import { deleteCategory } from '../../actions/services/services_categories'
import { updateService, deleteService } from '../../actions/services/services_manager'
import { deleteValoration } from '../../actions/services/services_valoration'
import FormValoration from './FormValoration'
import TableContent from './TableContents'


const ModalValorations = ({service, dispatch}) => {
    let valorations = service.valorations

    const [visible, setVisible] = useState(false)

    const columns = [
            {
                title:'DURACION',
                dataIndex: 'duration',
                key: 'duration',
                render:(obj)=> {
                    let str_print = ''
                    if(obj === '365 00:00:00'){
                        str_print = 'Anual'
                    }
                    if(obj === '182 12:00:00'){
                        str_print = 'Semestral'
                    }
                    if(obj === '90 00:00:00'){
                        str_print = 'Trimestral'
                    }
                    if(obj === '30 00:00:00'){
                        str_print = 'Mensual'
                    }
                    if(obj === '1 00:00:00'){
                        str_print = 'Dia'
                    }
                    if(obj === '01:00:00'){
                        str_print = 'Hora'
                    }

                    return(str_print)
                }           
            },
            {
                title:'NOTA',
                dataIndex: 'note',
                key:'note'
            },
            {
                title:'PRECIO($)',
                dataIndex: 'price',
                key:'price',
                render:(obj)=><>${obj}</>
            },
            {
                title: 'ACCIONES',
                render:(obj)=><>                    
                    <Tooltip title='Editar'>                                            
                        <FormValoration service={obj} dispatch={dispatch} initialData={obj} valoration={obj.id} />                
                    </Tooltip>
                    <Tooltip title='Eliminar'>
                        <Button danger shape='circle' onClick={()=> deleteValoration(dispatch, obj.id)}>
                            <DeleteOutlined/>
                        </Button>
                    </Tooltip>
                </>
            }             
        ]

    function openModal(){
        setVisible(true)
    }

    function closeModal(){
        setVisible(false)
    }

    return (
        <React.Fragment>
            <Button style={styles.btnUpdate} type='ghost' onClick={openModal}>Ver valoraciones</Button>
            <Modal 
                title={`Valoraciones de ${service.name}`}                
                visible={visible}  
                onCancel={closeModal}                                
                width={800}
                footer={[
                    <Button type='primary' onClick={closeModal} >
                      Volver
                    </Button>]}
            >
                <TableContent data={valorations} columns={columns} />
            </Modal>
        </React.Fragment>
    )
}


export const columnsCategories = (dispatch) => { 

    return [
            {
                title:'NOMBRE',
                dataIndex: 'name',
                key: 'id'                
            }, 
            {
                title:'ACCIONES',
                render: (obj) => <React.Fragment>                    
                    <Button onClick={()=> deleteCategory(dispatch, obj)} danger>Eliminar</Button>
                </React.Fragment>
            }
        ]
    
}

export const columnsServices = (dispatch, state) => {
    
    return [
        
        {
            title: 'NOMBRE',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'ESTADO',
            key: 'is_active',
            render: (obj) => <React.Fragment>
                
                {obj.is_active ? 
                    <Button type='primary' shape='circle'
                        onClick={()=> updateService(dispatch, {'is_active':false}, obj.id)}
                    >
                        <LikeFilled style={styles.iconActive} />
                    </Button> : 
                    <Button danger type='primary' shape='circle'
                        onClick={()=> updateService(dispatch, {'is_active':true}, obj.id)}
                    >
                        <DislikeFilled style={styles.iconNoActive} / >
                    </Button>
                }
            </React.Fragment>
        },
        {
            title: 'CATEGORIA',
            dataIndex: 'category',
            key: 'category',
            render: (obj) => <>{obj.name}</>           
        },

        {
            title: 'ACCIONES',
            render: (obj) => <React.Fragment>
                <Button onClick={async()=>{
                    obj = {
                        ...obj,
                        'category': obj.category.id
                    }                    
                    await dispatch({type:'RELOAD_FORM_SERVICES_OFF'})
                    await dispatch({type:'UPDATE_DATA', data: obj})
                    await dispatch({type:'RELOAD_FORM_SERVICES'})
                    
                    }} style={styles.btnUpdate} type='primary'>Modificar</Button>                
                <FormValoration service={obj} dispatch={dispatch} />                
                <ModalValorations service={obj} dispatch={dispatch} />              
                <Button onClick={()=> deleteService(dispatch, obj) } danger>Eliminar</Button>
            </React.Fragment>
        }
    ]
}


const styles = {
    btnUpdate:{
        marginRight:'10px'
    },
    iconActive: {
        fontSize:'20px',        
    },
    iconNoActive: {        
        fontSize:'20px'
    }
}
