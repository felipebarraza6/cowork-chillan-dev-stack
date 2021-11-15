import React from 'react'
import { Button } from 'antd'
import { updateStatusPayment } 
    from '../../actions/payments/ActionPayments'
import memberships from '../../api/memberships/endpoints'


export const columns = (state, dispatch) => {     
    

    return([    
        {
            title: 'Membresia / Reserva',
            render: x => {
                if(x.pay_for_service && x.membership){
                    return `Reserva: ${x.membership.uuid}`
                } else {
                    return `Reserva #${x.book}`
                }    
            }
        },
        {
            title: 'Cuenta Bancaria',
            render: x => x.bank_account.name
        },
        {
            title: 'Fecha',
            render: x => x.created.slice(0,16)
        },
        {
            title: 'Monto ($)',
            render: x => `$ ${x.amount}`
        }, 
        {
        title: 'Tipo',
        render: x => {
            if(x.is_invoice){
                return 'Factura'
            }else {
                return 'Boleta'
            }
        }         
        },
        {
            title: 'Descripcion',
            render: x => x.description
        },
        {
            title: 'ARCHIVO',
            render: x => {
                if(x.comprobant_file){                
                    return(<Button type='primary' onClick={()=> { 
                        window.open(x.comprobant_file)
                    }}>Descargar</Button>)
                }                
            }
        },
        {
            title: 'ESTADO',
            render: (x) => {
                return(<>
                    {x.is_null && <>ANULADO</>}                
                {x.is_pay && <>APROBADO</>}  
                </>)
            }
        },
        {
            title: 'ACCIONES',
            render: x => {
                return(<>
                    {!x.is_null && <Button style={styles.btn} danger type='primary' onClick={async()=> {                        
                        const get = await updateStatusPayment(x.id, true, false, state, dispatch)  
                        if(x.pay_for_service){
                            let old_amount = x.membership.payment_amount
                            let uuid = x.membership.uuid
                            let sustr = old_amount - x.amount                            
                            const update = await memberships.patchMembership(uuid, {payment_amount: sustr})
                            return update
                        }                        
                        return get
                    }}>Anular</Button>} 
                    {!x.is_pay && <Button style={styles.btn} type='primary' onClick={async()=> {
                        const get = await updateStatusPayment(x.id, false, true, state, dispatch)
                        if(x.pay_for_service){
                            let old_amount = x.membership.payment_amount
                            let uuid = x.membership.uuid
                            let sum = old_amount + x.amount
                            const update = await memberships.patchMembership(uuid, {payment_amount:sum})
                            return update
                        }                        
                        return get 
                    }}>Aprobar</Button>} 
                </>)            
            }
            
        }        
    ])
}


  const styles = {
      btn: {
          marginLeft: '10px',
          marginRight: '10px'
      }
  }
