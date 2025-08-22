// frontend/src/__tests__/api.test.js
import { searchImages, loginUser, getSearchHistory } from '../services/api';
import axios from 'axios';

jest.mock('axios');

describe('API Services', () => {
  test('searchImages makes correct API call', async () => {
    const mockResponse = { data: { results: [], total_count: 0 } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await searchImages('test query', { license: 'by' });
    
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:5000/search',
      { params: { q: 'test query', license: 'by' } }
    );
    expect(result).toEqual(mockResponse.data);
  });
});