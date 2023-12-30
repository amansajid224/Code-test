
import fetchMock from 'fetch-mock-jest';
import { expect } from '@jest/globals';
import { getData } from '../utils/feature';



describe('getData function', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('should return data when the API call is successful', async () => {
        const mockData = [{ _id: 1, fullName: 'Test User', email: "amansajid@gmail.com" }];
        fetchMock.get('https://code-test-chi.vercel.app/api/users', mockData);

        const data = await getData();

        expect(data).toEqual(mockData);
    });

    it('should return an empty array when the API call fails', async () => {
        fetchMock.get('https://code-test-chi.vercel.app/api/users', 500);

        const data = await getData();

        expect(data).toEqual([]);
    });

    it('should return an empty array when the API call returns no data', async () => {
        fetchMock.get('https://code-test-chi.vercel.app/api/users', null);

        const data = await getData();

        expect(data).toEqual([]);
    });
});