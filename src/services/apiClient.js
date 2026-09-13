const RAW_URL = import.meta.env.VITE_API_URL || 'https://plateform-backend.vercel.app';
export const API_BASE_URL = RAW_URL.replace(/\/+$/, '');

export const getAuthToken = () => {
  return localStorage.getItem('token') || localStorage.getItem('elite_token') || null;
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user') || localStorage.getItem('elite_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export async function request(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const token = getAuthToken();
  const headers = {
    'Accept': 'application/json',
    ...(options.headers || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type') || '';
    let data = null;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        (data && (data.error || data.detail || data.message)) ||
        `خطأ في الخادم (${response.status})`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.');
    }
    throw err;
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => request(endpoint, {
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body),
  }),
  put: (endpoint, body) => request(endpoint, {
    method: 'PUT',
    body: body instanceof FormData ? body : JSON.stringify(body),
  }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
