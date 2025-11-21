// Mock API functions - in real app would make actual HTTP requests

export const api = {
  auth: {
    register: async (data: any) => {
      // Mock register
      return { success: true, user: data };
    },
    login: async (data: any) => {
      // Mock login
      return { success: true, token: 'mock-token', user: data };
    },
    verify: async (token: string) => {
      // Mock verify
      return { success: true };
    },
    me: async () => {
      // Mock get user
      return { success: true, user: {} };
    },
  },
  land: {
    create: async (data: any) => {
      // Mock create land
      return { success: true, land: data };
    },
    list: async (params?: any) => {
      // Mock list lands
      return { success: true, lands: [] };
    },
    get: async (id: string) => {
      // Mock get land
      return { success: true, land: {} };
    },
    update: async (id: string, data: any) => {
      // Mock update land
      return { success: true, land: data };
    },
    delete: async (id: string) => {
      // Mock delete land
      return { success: true };
    },
  },
  proposal: {
    send: async (data: any) => {
      // Mock send proposal
      return { success: true, proposal: data };
    },
    listReceived: async () => {
      // Mock list received proposals
      return { success: true, proposals: [] };
    },
    listSent: async () => {
      // Mock list sent proposals
      return { success: true, proposals: [] };
    },
    accept: async (id: string) => {
      // Mock accept proposal
      return { success: true };
    },
    reject: async (id: string) => {
      // Mock reject proposal
      return { success: true };
    },
  },
  chat: {
    start: async (data: any) => {
      // Mock start chat
      return { success: true, chat: data };
    },
    sendMessage: async (data: any) => {
      // Mock send message
      return { success: true, message: data };
    },
    getConversations: async () => {
      // Mock get conversations
      return { success: true, conversations: [] };
    },
    getMessages: async (conversationId: string) => {
      // Mock get messages
      return { success: true, messages: [] };
    },
  },
};