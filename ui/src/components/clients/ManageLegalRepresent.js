import React, { useState, useEffect } from 'react'
import { notification, Input, Button, Modal, Table } from 'antd'
import clients from '../../api/clients/endpoints'
import { UserOutlined } from '@ant-design/icons'
const { Search } = Input

const ManageLegalRepresent = ({business, accdata}) => {
  
  console.log(business)
  
  const initialState = {
      'modalVisible': false,
      'persons': null,
      'page': 1,
      'loading': true,
      'totals': 0,
      'dni_search': ''
  }

  const [state, setState] = useState(initialState)

  const columns = [
    {
      title:'Nombre',
      key:'id',
      render: (obj)=> `${obj.first_name} ${obj.surname}`
    },
    {
      title:'Rut',
      dataIndex:'dni',
      key:'dni'
    },
    {
      key:'id',
      render: (obj) => <Button type='primary' onClick={()=>{
     
        addRepresentToBusiness(obj.id)
      }}>Agregar</Button>
    }
  ]
  
  const get_persons_results = async(page, dni)=> {
    setState({
      ...state,
      loading:true
    })

    const request = await clients.list_clients(page, '', '', dni, true, true).then((response)=> {
      setState({
        ...state,
        loading:false,
        persons: response.results
      })
    })

    return request

  }

  useEffect(()=>{
    const get_persons = async()=>{
      const request = await clients.list_clients(1, '', '', '', true, true).then((response)=>{
          setState({
            ...state,
            loading: false,
            persons: response.results,
            totals: response.count
          })
      })

      return request
    }
    get_persons()
  }, [])

  const addRepresentToBusiness = async(person) => {

    var listData=[]
    var objSend = {}
    listData.push(person)

    for(var i = 0; i < accdata.length; i++){
      listData.push(accdata[i].id)
    }
    
    objSend = {
      "represent_legal": listData
    }



    const request = await clients.update_business(objSend, business).then((response)=> {
        notification.open({
         message: `Representante legal agregado`,
         icon: <UserOutlined  />
       })
        Modal.destroyAll()
    })

    return request
  }

  return(
    <div style={styles.contaier} >
      <Modal 
        visible={state.modalVisible} 
        title='Listado de Personas' 
        
        style={styles.modal}
        footer={[]}
        onCancel={()=> 
          setState({
              ...state, 
              modalVisible:false
            })
        }
      >
        <Search style={styles.search}  placeholder='Buscar por Rut' onSearch={(value)=> get_persons_results(state.page, value)}dd />
        <Table 
          size='middle'
          dataSource={state.persons} 
          columns={columns}
          loading={state.loading}
          rowKey='id'
          pagination={{ 
            total: state.totals,
            onChange: (page)=> get_persons_results(page)
          }}
        />
      </Modal>
      <Button type='primary' onClick={()=>setState({...state, modalVisible:true})}>
        Agregar Representante
      </Button>
    </div>
  )
}

const styles = {
  search: {
    marginBottom:'15px'
  },
  contaier: {
    float: 'right',
    marginTop: '10px',
    marginBottom: '10px'
  },
  modal: {
    top: '5px'
  }
}

export default ManageLegalRepresent
