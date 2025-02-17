import axios from 'axios';

export class ExternalApiService {
    async callVerifyStaffPolicyApi(data: any): Promise<any> {
        try {
            const response = await axios.post('https://example.com/verify-staff-policy', data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to call VerifyStaffPolicy API: ${error.message}`);
        }
    }

    async callVerifyTransactionApi(data: any): Promise<any> {
        try {
            const response = await axios.post('https://example.com/verify-transaction', data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to call VerifyTransaction API: ${error.message}`);
        }
    }

    async callVerifyDopaApi(data: any): Promise<any> {
        try {
            const response = await axios.post('https://example.com/verify-dopa', data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to call VerifyDopa API: ${error.message}`);
        }
    }

    async callRecognizeFaceApi(data: any): Promise<any> {
        try {
            const response = await axios.post('https://example.com/recognize-face', data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to call RecognizeFace API: ${error.message}`);
        }
    }

    async callCompleteTransactionApi(data: any): Promise<any> {
        try {
            const response = await axios.post('https://example.com/complete-transaction', data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to call CompleteTransaction API: ${error.message}`);
        }
    }
}
