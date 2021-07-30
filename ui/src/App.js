import React, { useReducer, useEffect, createContext } from 'react'

import { reducer } from './reducers/login/reducer'

//Containers
import Login from './containers/Login'
import Home from './containers/Home'
import Certification_b from './containers/Certification_b'

export const AuthContext = createContext()


function App() {

  const initialState = {
    isAuthenticated: false,
    access_token: null,
    user: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {

    const access_token = JSON.parse(localStorage.getItem('access_token') || null)
    const user = JSON.parse(localStorage.getItem('user') || null)

    if(user && access_token){
      dispatch({
        type: 'LOGIN',
        payload: {
          access_token,
          user
        }
      })
    }

  }, [])


  return (

    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className="App">
        {!state.isAuthenticated ? <Login /> : <> {!state.user.is_client? <Home />: <Certification_b state={state} /> } </>}
      </div>

    </AuthContext.Provider>

  )

}

export default App;
