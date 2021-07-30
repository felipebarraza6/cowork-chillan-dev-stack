import { POST } from './config'


const signup_event = async(data) => {
    
    const request = await POST(`signup_event/`, data)
    return request
  }


  export const callbacks = {
      signupEvent: signup_event
  }