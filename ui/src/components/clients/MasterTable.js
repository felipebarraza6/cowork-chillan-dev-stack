import React from 'react'

import { Table, Typography, Row, Col } from 'antd'


const { Title } = Typography

const MasterTable = ({ 
    data, 
    loading, 
    page, 
    title, 
    icon, 
    columns, 
    totals,
    pagination,
    }) =>{
        
    return(
        <React.Fragment>        
        <Table 
            size='middle'
            title={() => 
                <React.Fragment>
                    <Row>
                        <Col span={12}>
                            <Title level={4}>
                                {icon} 
                                {title}
                            </Title>
                        </Col>
                        <Col span={12}>
                            <Title 
                                level={4} 
                                style={{textAlign: 'right'}}
                                mark >
                                    {totals}
                            </Title>    
                        </Col>
                    </Row>                    
                </React.Fragment>
                }
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey='id'
            pagination={{
                total:totals,
                simple:true,
                current:page,
                onChange: page=> pagination(page)
            }}
            />
        </React.Fragment>
    )
}

export default MasterTable
