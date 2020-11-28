import axios from 'axios';
import { 
  LOGIN_USER,
  REGISTER_USER
} from './types'

// login action
export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
      .then(response => response.data);

    return {
      type: LOGIN_USER,
      payload: request
    }
}

// register action 
export function registerUser(dataToSubmit) {
  const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
      payload: request
  }
}