export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    // Get token from localStorage or cookies
    const token = localStorage.getItem('authToken');

    // Add authorization header if token exists
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };

    // Make the request
    const response = await fetch(url, {
        ...options,
        headers,
    });

    // Handle 401 Unauthorized errors
    if (response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        throw new Error('Session expired. Please log in again.');
    }

    return response;
}