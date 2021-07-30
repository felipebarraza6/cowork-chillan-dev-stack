import React from 'react'
import { Table } from 'antd'


const TableContent = ({
    title,
    columns,
    loading, 
    data
}) => {

   
    return(
        <Table 
            title={()=>title} 
            size='small'
            dataSource={data} 
            loading={loading} 
            columns={columns}            
            rowKey='id'
            pagination= {{
                pageSize:10
            }}
            />
        
    )    

}


export default TableContent
