import React, { useReducer, createContext } from 'react'

import { reducer } from '../reducers/memberships/lists'

import ListMemberships from './../components/memberships/ListMemberships'
import CreateMemberships from './../components/memberships/CreateMembership/CreateMemberships'
import { Row, Col } from 'antd'
import RetrieveMembership from '../components/memberships/RetrieveMembership'
export const MembershipContext = createContext()

const Memberships = () => {


    const initialReducerState = {
        memberships: [],
        count: 0,
        membershipSelected: {},
        retrieve_membership: false,
        createRenovation: false
    }

    const [state, dispatch] = useReducer(reducer, initialReducerState)

    return(
        <MembershipContext.Provider 
            value={{
                state,
                dispatch
            }}
        >
        <Row>
            <Col span={14} >
                {!state.retrieve_membership ? 
                <ListMemberships 
                    dataMemberships={state.memberships}
                    dispatch={dispatch} />:
                    <RetrieveMembership obj={state.membershipSelected.obj} />
                }
            </Col>
            <Col span={10} >
                <CreateMemberships />
            </Col>
        </Row>
        </MembershipContext.Provider>
    )
}


export default Memberships
