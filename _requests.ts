interface ApiCallOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; 
    data?: any; 
    headers?: Record<string, string>; 
  }
  
  // Generic type for the response data
  export async function apiCall<T>(url: string, options: ApiCallOptions = {}): Promise<T> {
    const { method = 'GET', data = null, headers = {} } = options;

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (data && method !== 'GET') {
        fetchOptions.body = JSON.stringify(data);
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error: ${errorResponse.message}`);
    }

      const result: T = await response.json();
      return result;
    } catch (error) {
    
      console.log('API call error:', error);
      throw error;
    }
  }
  