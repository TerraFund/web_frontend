export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateCoordinates = (coordinates: string): boolean => {
  const coordRegex = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
  return coordRegex.test(coordinates);
};

export const validateAmount = (amount: number): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (amount > 10000000) {
    errors.push('Amount cannot exceed $10,000,000');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateArea = (area: number): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (area <= 0) {
    errors.push('Area must be greater than 0');
  }

  if (area > 10000) {
    errors.push('Area cannot exceed 10,000 acres');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateFileSize = (size: number, maxSize: number = 10 * 1024 * 1024): boolean => {
  return size <= maxSize;
};

export const validateFileType = (type: string, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(type);
};