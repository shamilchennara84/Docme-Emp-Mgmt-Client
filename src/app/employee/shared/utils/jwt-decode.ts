import { jwtDecode } from 'jwt-decode';
import { DecodedJWT } from '../../../core/models/decodedJWT';

export const getIdFromJwtToken = (): string | null => {
  try {
    const token = localStorage.getItem('employeetoken') || '';
    const decodedToken = jwtDecode<DecodedJWT>(token);

    return decodedToken.hasOwnProperty('id') ? decodedToken.id : null;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};
