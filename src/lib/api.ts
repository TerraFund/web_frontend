// API client for TerraFund platform connecting Next.js frontend with Spring Boot backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const getAuthHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('terrafund_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
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
  healthCheck: async (): Promise<{ connected: boolean; version: string; error?: string }> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${API_BASE_URL}/actuator/health`, {
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeoutId);
      if (res && res.ok) {
        return { connected: true, version: '1.1.0-SPRING' };
      }
      return { connected: false, version: '1.1.0-STANDALONE', error: 'Spring Boot server offline' };
    } catch {
      return { connected: false, version: '1.1.0-STANDALONE', error: 'Connection refused' };
    }
  },
  auth: {
    register: async (data: any) => {
      try {
        const payload = {
          email: data.email,
          phoneNumber: data.phone || data.phoneNumber || '+250788000000',
          password: data.password,
          confirmPassword: data.confirmPassword || data.password,
        };
        const res = await request<any>('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        const token = res.accessToken || res.token;
        if (token && typeof window !== 'undefined') {
          localStorage.setItem('terrafund_token', token);
          setCookie('terrafund_token', token);
        }
        // Choose role if specified
        if (data.role) {
          const roleUpper = data.role.toUpperCase() === 'LANDOWNER' ? 'LAND_OWNER' : 'INVESTOR';
          try {
            await request<any>('/api/auth/choose-role', {
              method: 'POST',
              body: JSON.stringify({ role: roleUpper }),
            });
            if (typeof window !== 'undefined') {
              setCookie('terrafund_role', data.role.toLowerCase());
            }
          } catch {
            // Ignore if role already chosen
          }
          // Create initial profile if name provided
          if (data.name) {
            const names = data.name.trim().split(' ');
            const firstName = names[0] || 'User';
            const lastName = names.slice(1).join(' ') || 'User';
            if (roleUpper === 'LAND_OWNER') {
              try {
                await request<any>('/api/auth/account-info/land-owner', {
                  method: 'POST',
                  body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber: data.phone || data.phoneNumber,
                    address: data.location || 'Kigali, Rwanda',
                    nationalIdNumber: 'N/A',
                  }),
                });
              } catch {}
            } else {
              try {
                await request<any>('/api/auth/account-info/investor', {
                  method: 'POST',
                  body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber: data.phone || data.phoneNumber,
                    address: data.location || 'Kigali, Rwanda',
                    nationalIdNumber: 'N/A',
                  }),
                });
              } catch {}
            }
          }
        }
        const userObj = {
          id: res.id || 'new-user',
          name: data.name || data.email.split('@')[0],
          email: data.email,
          phone: data.phone || data.phoneNumber,
          role: data.role || 'investor',
          kyc_status: 'pending',
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('terrafund_user', JSON.stringify(userObj));
        }
        return { success: true, token, user: userObj, ...res };
      } catch (err: any) {
        return { success: false, error: err.message, user: data };
      }
    },
    login: async (data: any) => {
      try {
        const res = await request<any>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });
        const token = typeof res === 'string' ? res : res.token || res.accessToken;
        const role = typeof res === 'object' && res.role ? String(res.role).toLowerCase() : (data.email?.toLowerCase().includes('admin') ? 'admin' : (data.email?.toLowerCase().includes('owner') ? 'landowner' : 'investor'));
        const userObj = (typeof res === 'object' && res.user) ? res.user : {
          id: typeof res === 'object' && res.id ? String(res.id) : 'user-1',
          name: data.email.split('@')[0],
          email: data.email,
          role,
          kyc_status: 'verified',
        };

        if (token && typeof window !== 'undefined') {
          localStorage.setItem('terrafund_token', token);
          localStorage.setItem('terrafund_user', JSON.stringify(userObj));
          setCookie('terrafund_token', token);
          setCookie('terrafund_role', userObj.role || role);
        }
        return { success: true, token, user: userObj };
      } catch (err: any) {
        return { success: false, error: err.message };
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
    refresh: async () => {
      try {
        const res = await request<any>('/api/auth/refresh', { method: 'POST' });
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    logout: async () => {
      try {
        await request<any>('/api/auth/logout', { method: 'POST' });
      } catch {}
      if (typeof window !== 'undefined') {
        localStorage.removeItem('terrafund_token');
        localStorage.removeItem('terrafund_user');
        document.cookie = 'terrafund_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'terrafund_role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
      return { success: true };
    },
    forgotPassword: async (email: string) => {
      try {
        const res = await request<any>('/api/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email }),
        });
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    resetPassword: async (data: any) => {
      try {
        const res = await request<any>('/api/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    chooseRole: async (role: string) => {
      try {
        const roleUpper = role.toUpperCase() === 'LANDOWNER' ? 'LAND_OWNER' : role.toUpperCase();
        const res = await request<any>('/api/auth/choose-role', {
          method: 'POST',
          body: JSON.stringify({ role: roleUpper }),
        });
        if (typeof window !== 'undefined') {
          setCookie('terrafund_role', role.toLowerCase());
        }
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    saveInvestorAccountInfo: async (data: any) => {
      try {
        const res = await request<any>('/api/auth/account-info/investor', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    saveLandOwnerAccountInfo: async (data: any) => {
      try {
        const res = await request<any>('/api/auth/account-info/land-owner', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    updateLandOwnerAccountInfo: async (data: any) => {
      try {
        const res = await request<any>('/api/auth/account-info/land-owner/update', {
          method: 'PUT',
          body: JSON.stringify(data),
        });
        return { success: true, ...res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    updateInvestorAccountInfo: async (data: any) => {
      try {
        const res = await request<any>('/api/auth/account-info/investor/update', {
          method: 'PUT',
          body: JSON.stringify(data),
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
        const payload = {
          title: data.title || data.name || 'Agricultural Land Plot',
          description: data.description || '',
          location: data.location || (data.region ? `${data.region}, Rwanda` : 'Kigali, Rwanda'),
          sizeInHectares: parseFloat(data.sizeInHectares || data.size || '10') || 10.0,
          soilType: data.soilType || 'Volcanic Loam',
          waterSourceIsAvailable: data.waterSourceIsAvailable !== undefined ? Boolean(data.waterSourceIsAvailable) : true,
          roadAccessIsAvailable: data.roadAccessIsAvailable !== undefined ? Boolean(data.roadAccessIsAvailable) : true,
          region: data.region || 'Eastern Province',
          cropSuitability: data.cropSuitability || data.recommendedCrops || '',
          waterSource: data.waterSource || '',
          soilQuality: data.soilQuality || '',
          elevation: parseFloat(data.elevation || '1500') || 1500.0,
          annualPrice: parseFloat(data.annualPrice || data.annual_price || '15000') || 15000.0,
          published: data.published !== undefined ? Boolean(data.published) : true,
          demoImages: data.demoImages || data.images || (data.image ? [data.image] : []),
        };
        const res = await request<any>('/api/land/create', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message, land: data };
      }
    },
    uploadDocuments: async (landId: string | number, file: File | FormData) => {
      try {
        let body: FormData;
        if (file instanceof FormData) {
          body = file;
        } else {
          body = new FormData();
          body.append('file', file);
        }
        const res = await fetch(`${API_BASE_URL}/api/land/upload-documents/${landId}`, {
          method: 'POST',
          body,
          headers: getAuthHeader(),
        });
        const data = await res.json();
        return { success: true, ...data };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    list: async () => {
      try {
        const res = await request<any[]>('/api/land/list');
        const list = Array.isArray(res) ? res : (res as any)?.lands || (res as any)?.data || [];
        return { success: true, lands: list };
      } catch (err: any) {
        try {
          const fallback = await fetch('/api/lands').then(r => r.json());
          if (fallback.success && Array.isArray(fallback.data)) {
            return { success: true, lands: fallback.data };
          }
        } catch {}
        return { success: false, error: err.message, lands: [] };
      }
    },
    get: async (id: string | number) => {
      try {
        const res = await request<any>(`/api/land/${id}`);
        return { success: true, land: res };
      } catch (err: any) {
        try {
          const fallback = await fetch(`/api/lands/${id}`).then(r => r.json());
          if (fallback.success && fallback.land) {
            return { success: true, land: fallback.land };
          }
        } catch {}
        return { success: false, error: err.message, land: null };
      }
    },
    getByOwner: async (ownerId: string | number) => {
      try {
        const res = await request<any[]>(`/api/land/owner/${ownerId}`);
        return { success: true, lands: Array.isArray(res) ? res : [] };
      } catch (err: any) {
        try {
          const fallback = await fetch(`/api/lands?myLands=true&ownerId=${ownerId}`).then(r => r.json());
          if (fallback.success && Array.isArray(fallback.data)) {
            return { success: true, lands: fallback.data };
          }
        } catch {}
        return { success: false, error: err.message, lands: [] };
      }
    },
    update: async (id: string | number, data: any) => {
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
    publish: async (id: string | number) => {
      try {
        const res = await request<any>(`/api/land/publish/${id}`, {
          method: 'PATCH',
        });
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    delete: async (id: string | number) => {
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
        const payload = {
          landID: Number(data.landID || data.landId),
          title: data.title || data.landTitle || 'Investment Proposal',
          description: data.description || data.notes || data.message || '',
          purpose: data.purpose || data.intendedCrop || 'Agricultural Farming',
          durationInMonths: String(data.durationInMonths || data.proposedDurationMonths || data.duration || '12'),
          budget: Number(String(data.budget || data.offeredAmount || data.amount || '10000').replace(/[^0-9.]/g, '')),
          attachments: data.attachments || [],
        };
        const res = await request<any>('/api/land-proposal/create', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        return { success: true, proposal: res };
      } catch (err: any) {
        return { success: false, error: err.message, proposal: data };
      }
    },
    listReceived: async () => {
      try {
        const res = await request<any[]>('/api/land-proposal/my-received-proposals');
        return { success: true, proposals: Array.isArray(res) ? res : [] };
      } catch (err: any) {
        return { success: false, error: err.message, proposals: [] };
      }
    },
    listSent: async () => {
      try {
        const res = await request<any[]>('/api/land-proposal/my-proposals');
        return { success: true, proposals: Array.isArray(res) ? res : [] };
      } catch (err: any) {
        return { success: false, error: err.message, proposals: [] };
      }
    },
    get: async (id: string) => {
      try {
        const res = await request<any>(`/api/land-proposal/${id}`);
        return { success: true, proposal: res, data: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    accept: async (id: string) => {
      try {
        const res = await request<any>(`/api/land-proposal/accept/${id}`, {
          method: 'PATCH',
        });
        return { success: true, proposal: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    reject: async (id: string) => {
      try {
        const res = await request<any>(`/api/land-proposal/reject/${id}`, {
          method: 'PATCH',
        });
        return { success: true, proposal: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    cancel: async (id: string) => {
      try {
        const res = await request<any>(`/api/land-proposal/cancel/${id}`, {
          method: 'PATCH',
        });
        return { success: true, proposal: res };
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
    getAdmin: async () => {
      try {
        const res = await request<any>('/api/dashboard/admin');
        return { success: true, data: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    getMyDashboard: async () => {
      try {
        const res = await request<any>('/api/dashboard/me');
        return { success: true, data: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  },
  admin: {
    getUsers: async () => {
      try {
        const res = await request<any[]>('/api/admin/users');
        return { success: true, users: Array.isArray(res) ? res : [] };
      } catch (err: any) {
        return { success: false, error: err.message, users: [] };
      }
    },
    getLands: async () => {
      try {
        const res = await request<any[]>('/api/admin/lands');
        return { success: true, lands: Array.isArray(res) ? res : [] };
      } catch (err: any) {
        return { success: false, error: err.message, lands: [] };
      }
    },
    verifyLand: async (id: string | number) => {
      try {
        const res = await request<any>(`/api/admin/verify/land/${id}`, {
          method: 'PATCH',
        });
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    unverifyLand: async (id: string | number) => {
      try {
        const res = await request<any>(`/api/admin/unverify/land/${id}`, {
          method: 'PATCH',
        });
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    flagLand: async (id: string | number) => {
      try {
        const res = await request<any>(`/api/admin/flag/listing/${id}`, {
          method: 'PATCH',
        });
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    unhideLand: async (id: string | number) => {
      try {
        const res = await request<any>(`/api/admin/unhide/listing/${id}`, {
          method: 'PATCH',
        });
        return { success: true, land: res };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
  },
  files: {
    upload: async (fileOrFormData: File | FormData) => {
      try {
        let formData: FormData;
        if (fileOrFormData instanceof FormData) {
          formData = fileOrFormData;
        } else {
          formData = new FormData();
          formData.append('file', fileOrFormData);
        }
        const res = await fetch(`${API_BASE_URL}/api/files/upload`, {
          method: 'POST',
          body: formData,
          headers: getAuthHeader(),
        });
        const text = await res.text();
        let parsed: any;
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = { message: text };
        }
        const filename = parsed.filename || (text.includes(': ') ? text.split(': ')[1].trim() : text);
        const url = parsed.url || `/api/files/download/${encodeURIComponent(filename)}`;
        return { success: true, filename, url, data: parsed };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    },
    download: (filename: string) => {
      return `${API_BASE_URL}/api/files/download/${encodeURIComponent(filename)}`;
    },
  },
  chat: {
    start: async (data: any) => {
      return { success: true, chat: data };
    },
    sendMessage: async (data: any) => {
      try {
        if (data.receiverId) {
          const res = await request<any>('/api/chat/send', {
            method: 'POST',
            body: JSON.stringify({
              receiverId: Number(data.receiverId),
              message: data.message || data.content,
            }),
          });
          return { success: true, data: res };
        }
        const res = await request<any>('/api/chat', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return { success: true, data: res };
      } catch (err: any) {
        return { success: true, message: data };
      }
    },
    getConversations: async () => {
      try {
        const res = await request<any>('/api/chat');
        return { success: true, conversations: res?.data?.conversations || [] };
      } catch {
        return { success: true, conversations: [] };
      }
    },
    getMessages: async (user1: string | number, user2: string | number) => {
      try {
        const res = await request<any[]>(`/api/chat/messages?user1=${user1}&user2=${user2}`);
        return { success: true, messages: Array.isArray(res) ? res : [] };
      } catch (err: any) {
        return { success: false, error: err.message, messages: [] };
      }
    },
  },
};