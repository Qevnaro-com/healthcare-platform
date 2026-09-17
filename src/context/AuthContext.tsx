/**
 * Healthcare Staffing & Home Care Platform
 * Authentication & Role Context
 * Source of Truth: docs/11-Permissions-and-RBAC.md, docs/03-Information-Architecture.md
 *
 * DEMO MODE UTILITY:
 * In development/demo, includes a Demo Role Switcher behind `demoMode` configuration flag.
 * In production: users authenticate via standard JWT/OAuth and see ONLY their authorized portal.
 */

import React, { createContext, useContext, useState } from 'react';
import type { UserRole, User } from '../types';
import { MOCK_PLATFORM_SETTINGS } from '../data/mockData';

interface AuthContextType {
  currentUser: User;
  currentRole: UserRole;
  demoMode: boolean;
  switchRole: (newRole: UserRole) => void;
  isRole: (role: UserRole) => boolean;
  hasPermission: (permissionKey: string) => boolean;
}

const DEMO_USERS: Record<UserRole, User> = {
  client: {
    id: 'usr-clt-001',
    email: 'rahul.mehta@demo.healthplatform.test',
    phone: '+91-98800-11223',
    firstName: 'Rahul',
    lastName: 'Mehta',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  professional: {
    id: 'usr-pro-001',
    email: 'anjali.sharma@demo.healthplatform.test',
    phone: '+91-98450-44120',
    firstName: 'Dr. Anjali',
    lastName: 'Sharma',
    role: 'professional',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?w=150&q=80',
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    createdAt: '2025-01-08T10:00:00Z',
    updatedAt: '2026-03-01T12:00:00Z'
  },
  admin: {
    id: 'usr-adm-001',
    email: 'deepak.ops@demo.healthplatform.test',
    phone: '+91-98440-99182',
    firstName: 'Deepak',
    lastName: 'Kumar',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    createdAt: '2024-10-01T09:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  },
  organization: {
    id: 'usr-org-001',
    email: 'staffing@manipal.demo.test',
    phone: '+91-80-4920-8811',
    firstName: 'Manipal Hospital',
    lastName: '(East Campus)',
    role: 'organization',
    avatar: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=150&q=80',
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  super_admin: {
    id: 'usr-sup-001',
    email: 'rajesh.owner@demo.healthplatform.test',
    phone: '+91-99000-00001',
    firstName: 'Rajesh',
    lastName: 'Venkatesh',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  staff: {
    id: 'usr-stf-001',
    email: 'anita.nursing@pulsen-care.com',
    phone: '+91-98112-34567',
    firstName: 'Anita',
    lastName: 'Sharma',
    role: 'staff',
    avatar: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&q=80',
    isActive: true,
    isEmailVerified: true,
    isPhoneVerified: true,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2026-09-17T10:00:00Z'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('client');

  const switchRole = (newRole: UserRole) => {
    if (!MOCK_PLATFORM_SETTINGS.demoMode) {
      console.warn('Role switching is disabled in production.');
      return;
    }
    setCurrentRole(newRole);
  };

  const isRole = (role: UserRole) => currentRole === role;

  const hasPermission = (_permissionKey: string) => {
    // Admin & Super Admin have full system permissions in demo
    if (currentRole === 'admin' || currentRole === 'super_admin') return true;
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: DEMO_USERS[currentRole],
        currentRole,
        demoMode: MOCK_PLATFORM_SETTINGS.demoMode,
        switchRole,
        isRole,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
