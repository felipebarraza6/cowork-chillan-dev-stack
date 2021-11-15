import React, { useState, useEffect } from 'react'
import { Button, Modal, Checkbox, Typography } from 'antd'
import clients from '../../api/clients/endpoints'

const ModalLinkedYou = ({ oldData, setEconomic }) => {
    
    const [visible, setVisible] = useState(false)
    const [data, setData]= useState(null)
    const [selected, setSelected]=useState([])

    useEffect(() => {
        const get = async () => {
            const rq = await clients.list_business(1)
            setData(rq.results)
        }
        get()
    }, [])
    let list_old = oldData.linked_enterprises
    return(<>
        <Modal title='EMPRESAS' visible={visible} 
            onCancel={()=>setVisible(false)} width='800px'
            okText='CARGAR VINCULADOS'
            onOk={()=> {      
                          
                setEconomic({
                    ...oldData,
                    linked_enterprises: [...selected]
                })
                setVisible(false)
             }}
             >
                 {data && <>
                    {data.map((obj)=> {
                        return(<Checkbox onChange={(x)=>{
                            const fn = obj.fantasy_name
                            if(x.target.checked){
                                setSelected(
                                    [...selected, fn] 
                                  ) 
                            }else {
                                setSelected(selected.filter(function(x) { 
                                    if(x !== obj.fantasy_name){
                                        return([...x])                                     
                                    }                                    
                                }))
                            }                            
                        }} style={{margin:'10px'}}>{obj.fantasy_name}</Checkbox>)
                    })}
                 </>}
                 <Typography.Title level={4} style={{marginTop:'20px'}}> Seleccionados: {selected.length} </Typography.Title>
                 <Typography.Title level={4} style={{marginTop:'40px'}}> Seleccionados anteriormente: </Typography.Title>
                 <Typography.Paragraph>
                     {list_old && <>
                        {list_old.map((x)=> {
                                return(<Typography.Paragraph> {x} </Typography.Paragraph>)
                        })}
                     </>}
                 </Typography.Paragraph>                
        </Modal>
        <Button style={{marginLeft:'10px', marginBottom:'10px'}} 
            type='primary' onClick={()=>setVisible(true)}>Seleccionar empresas vinculadas</Button>
    </>)

}


export default ModalLinkedYou