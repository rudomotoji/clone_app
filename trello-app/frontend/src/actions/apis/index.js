import axios from 'axios';
import { API_ROOT } from 'utils/constants';

export const fetchcBoardDetails = async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`);

  return request.data;
};
