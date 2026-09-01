// API client for TerraFund platform connecting Next.js frontend with Spring Boot backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const getAuthHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('terrafund_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const errorText = await res.text();
      let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      try {
        const parsed = JSON.parse(errorText);
        errorMessage = parsed.message || parsed.error || errorMessage;
      } catch {
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    }
    return (await res.text()) as unknown as T;
  } catch (err: any) {
    console.warn(`API call failed for ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  auth: {
    register: async (data: any) => {
      try {
        const res = await request<any>('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message, user: data };
      }
    },
    login: async (data: any) => {
      try {
        const res = await request<any>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        if (res.token && typeof window !== 'undefined') {
          localStorage.setItem('terrafund_token', res.token);
        }
        return { success: true, token: res.token || 'token', user: res.user || data };
      } catch (err: any) {
        return { success: false, error: err.message, token: 'mock-token', user: data };
      }
    },
    verify: async (token: string) => {
      try {
        const res = await request<any>('/api/auth/verify', {
          method: 'POST',
          body: JSON.stringify({ token }),
        });
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    me: async () => {
      try {
        const res = await request<any>('/api/auth/me');
        return { success: true, user: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  },
  land: {
    create: async (data: any) => {
      try {
        const res = await request<any>('/api/land/create', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message, land: data };
      }
    },
    list: async (params?: any) => {
      try {
        const res = await request<any[]>('/api/land/list');
        return { success: true, lands: res || [] };
      } catch (err: any) {
        return { success: false, error: err.message, lands: [] };
      }
    },
    get: async (id: string) => {
      try {
        const res = await request<any>(`/api/land/${id}`);
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message, land: null };
      }
    },
    update: async (id: string, data: any) => {
      try {
        const res = await request<any>(`/api/land/update/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(data),
        });
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message, land: data };
      }
    },
    delete: async (id: string) => {
      try {
        await request<any>(`/api/land/delete/${id}`, {
          method: 'DELETE',
        });
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  },
  proposal: {
    send: async (data: any) => {
      try {
        const res = await request<any>('/api/land-proposal/create', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return { success: true, proposal: res };
      } catch (err: any) {
        return { success: false, error: err.message, proposal: data };
      }
    },
    listReceived: async () => {
      try {
        const res = await request<any[]>('/api/land-proposal/my-received-proposals');
        return { success: true, proposals: res || [] };
      } catch (err: any) {
        return { success: false, error: err.message, proposals: [] };
      }
    },
    listSent: async () => {
      try {
        const res = await request<any[]>('/api/land-proposal/my-proposals');
        return { success: true, proposals: res || [] };
      } catch (err: any) {
        return { success: false, error: err.message, proposals: [] };
      }
    },
    accept: async (id: string) => {
      try {
        await request<any>(`/api/land-proposal/accept/${id}`, {
          method: 'PATCH',
        });
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    reject: async (id: string) => {
      try {
        await request<any>(`/api/land-proposal/reject/${id}`, {
          method: 'PATCH',
        });
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  },
  dashboard: {
    getInvestor: async () => {
      try {
        const res = await request<any>('/api/dashboard/investor');
        return { success: true, data: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    getLandOwner: async () => {
      try {
        const res = await request<any>('/api/dashboard/landOwner');
        return { success: true, data: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  },
  chat: {
    start: async (data: any) => {
      return { success: true, chat: data };
    },
    sendMessage: async (data: any) => {
      return { success: true, message: data };
    },
    getConversations: async () => {
      return { success: true, conversations: [] };
    },
    getMessages: async (user1: string, user2: string) => {
      try {
        const res = await request<any[]>(`/api/chat/messages?user1=${user1}&user2=${user2}`);
        return { success: true, messages: res || [] };
      } catch (err: any) {
        return { success: false, error: err.message, messages: [] };
      }
    },
  },
};