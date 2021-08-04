import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import { updateIncidence } from '../../actions/incidences/ActionInsdicences'
const { TextArea } = Input


const AnswerIncidence = ({ insidence, state, setState }) => {    

    const [visible, setVisible] = useState(false)
    const [str_txt, setStr] = useState('')

    console.log(insidence)

    return(<>
        <Modal 
            visible={visible} 
            onCancel={()=>setVisible(false)}
            title={`Responder insidencia a ${insidence.user.email}`}
            width={'700px'}
            onOk={() => {
                updateIncidence(state,setState,insidence.id, {response: str_txt, is_response: 'true'}).then((res)=> {
                    setVisible(false)
                })
            }}
            okText='Enviar' >
                <TextArea rows="4" placeholder='Escribir respuesta...' onChange={(e)=>setStr(e.target.value)} />
            </Modal>
        <Button type='primary' onClick={()=>setVisible(true)} >Responder</Button>
    </>)

}


export default AnswerIncidence