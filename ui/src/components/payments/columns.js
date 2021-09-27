import React from 'react'
import { Button } from 'antd'


export const  columns = [    
    {
        title: 'Membresia / Reserva',
        render: x => {
            if(x.membership){
                return `Membresia: ${x.membership.uuid}`
            }else{
                return 'Reserva'
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
        render: x => x.amount
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
        title: 'ACCIONES',
        render: x => {
            if(x.is_pay){                
                return(<Button danger type='primary' onClick={()=> { 
                    
                }}>Anular</Button>)
            }else {
                return(<Button type='primary'>Aprobar</Button>)
            }                
        }
    }        
  ]
