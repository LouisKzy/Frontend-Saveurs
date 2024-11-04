import { API_URL_USERS } from "../constants";
import axios from "axios";

async function RegisterFetch(email, password) {
  try {
    const response = await axios.post(API_URL_USERS, {
      user: {
        email: email,
        password: password,
      }
    });
    
    const data = response.data;
    
    return data
  } catch (error) {
    throw new Error('Failed to register: ' + error.message);
  }
}

async function LoginFetch(email, password) {
  try {
    const response = await axios.post(`${API_URL_USERS}/sign_in`, {
      user: {
        email: email,
        password: password
      },
    });
    console.log(response)
    return response;
  } catch (error) {
    throw new Error('Failed to login: ' + error.message);
  }
}

async function LogoutFetch() {
  try {
    const response = await axios.delete(`${API_URL_USERS}/sign_out`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to log out: ' + error.message);
  }
}

async function EditPasswordFetch(password, confirmPassword, resetPasswordToken) {
  try {
    const response = await axios.patch(`${API_URL_USERS}/password`, {
      user: {
        reset_password_token: resetPasswordToken,
        password: password,
        password_confirmation: confirmPassword
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to edit password: ' + error.message);
  }
}
async function ResetPasswordFetch(email) {
  try {
    const response = await axios.post(`${API_URL_USERS}/password`, { 
      user: { 
        email: email 
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to reset password: ' + error.message);
  }
}
export {
  RegisterFetch,
  LoginFetch,
  LogoutFetch,
  EditPasswordFetch,
  ResetPasswordFetch
};
