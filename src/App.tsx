/**
 * Healthcare Staffing & Home Care Platform
 * Master Application Routing & Context Providers
 * Source of Truth: p0_master_architecture_hardening_plan.md
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { OrgLayout } from './components/layout/OrgLayout';
import { StaffLayout } from './components/layout/StaffLayout';

// Public & Client Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { HomeNursingServicePage } from './pages/public/HomeNursingServicePage';
import { OrgLandingPage } from './pages/public/OrgLandingPage';
import { CareersPage } from './pages/public/CareersPage';
import { SearchPage } from './pages/client/SearchPage';
import { ProProfileViewPage } from './pages/client/ProProfileViewPage';
import { BookingWizardPage } from './pages/client/BookingWizardPage';
import { MyBookingsPage } from './pages/client/MyBookingsPage';
import { BookingDetailPage } from './pages/client/BookingDetailPage';
import { ClientSupportPage } from './pages/client/ClientSupportPage';
import { ClientProfilePage } from './pages/client/ClientProfilePage';
import { ClientNotificationsPage } from './pages/client/ClientNotificationsPage';
import { SavedPatientsPage } from './pages/client/SavedPatientsPage';
import { SavedAddressesPage } from './pages/client/SavedAddressesPage';
import { ClientDashboardPage } from './pages/client/ClientDashboardPage';

// Admin Operations Command Center Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminStaffPage } from './pages/admin/AdminStaffPage';
import { AdminAddStaffWizardPage } from './pages/admin/AdminAddStaffWizardPage';
import { AdminStaffDetailPage } from './pages/admin/AdminStaffDetailPage';
import { AdminCareersPage } from './pages/admin/AdminCareersPage';
import { AdminOrganizationRequestsPage } from './pages/admin/AdminOrganizationRequestsPage';
import { AdminKYCQueuePage } from './pages/admin/AdminKYCQueuePage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminOrganizationsPage } from './pages/admin/AdminOrganizationsPage';
import { AdminServicesPricingPage } from './pages/admin/AdminServicesPricingPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminMatchingPage } from './pages/admin/AdminMatchingPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminPayoutsPage } from './pages/admin/AdminPayoutsPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminSupportDeskPage } from './pages/admin/AdminSupportDeskPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminRolesPage } from './pages/admin/AdminRolesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Staff Duty Portal Pages
import { StaffLoginPage } from './pages/staff/StaffLoginPage';
import { StaffFirstLoginPage } from './pages/staff/StaffFirstLoginPage';
import { StaffDashboardPage } from './pages/staff/StaffDashboardPage';
import { StaffDutyDetailPage } from './pages/staff/StaffDutyDetailPage';
import { StaffSchedulePage } from './pages/staff/StaffSchedulePage';
import { StaffAvailabilityPage } from './pages/staff/StaffAvailabilityPage';
import { StaffLeavePage } from './pages/staff/StaffLeavePage';
import { StaffSecurityPage } from './pages/staff/StaffSecurityPage';

// B2B Organization Workspace Pages
import { OrgLoginPage } from './pages/organization/OrgLoginPage';
import { OrgDashboardPage } from './pages/organization/OrgDashboardPage';
import { OrgRequestsListPage } from './pages/organization/OrgRequestsListPage';
import { OrgRequestBuilderPage } from './pages/organization/OrgRequestBuilderPage';
import { OrgRosterPage } from './pages/organization/OrgRosterPage';
import { OrgSchedulePage } from './pages/organization/OrgSchedulePage';
import { OrgRequestDetailPage } from './pages/organization/OrgRequestDetailPage';
import { OrgTimesheetsPage } from './pages/organization/OrgTimesheetsPage';
import { OrgInvoicesPage } from './pages/organization/OrgInvoicesPage';
import { OrgProfilePage } from './pages/organization/OrgProfilePage';
import { OrgSupportPage } from './pages/organization/OrgSupportPage';

// Utility Pages
import { DesignSystemPage } from './pages/utility/DesignSystemPage';
import { NotFoundPage } from './pages/utility/NotFoundPage';
import { UnauthorizedPage } from './pages/utility/UnauthorizedPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              {/* Public & Client Portal Shell */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/home-nursing" element={<HomeNursingServicePage />} />
                <Route path="services/:id" element={<ServiceDetailPage />} />
                <Route path="organizations" element={<OrgLandingPage />} />
                <Route path="careers" element={<CareersPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="pros/:id" element={<ProProfileViewPage />} />
                <Route path="book" element={<BookingWizardPage />} />
                <Route path="client/search" element={<SearchPage />} />
                <Route path="client/booking/wizard" element={<BookingWizardPage />} />
                <Route path="client/bookings" element={<MyBookingsPage />} />
                <Route path="client/bookings/:id" element={<BookingDetailPage />} />
                <Route path="client/support" element={<ClientSupportPage />} />
                <Route path="client/profile" element={<ClientProfilePage />} />
                <Route path="client/notifications" element={<ClientNotificationsPage />} />
                <Route path="client/dashboard" element={<ClientDashboardPage />} />
                <Route path="client/patients" element={<SavedPatientsPage />} />
                <Route path="client/addresses" element={<SavedAddressesPage />} />
              </Route>

              {/* Staff Employee Duty Portal Shell */}
              <Route path="/staff/login" element={<StaffLoginPage />} />
              <Route path="/staff/first-login" element={<StaffFirstLoginPage />} />
              <Route path="/staff" element={<StaffLayout />}>
                <Route index element={<Navigate to="/staff/dashboard" replace />} />
                <Route path="dashboard" element={<StaffDashboardPage />} />
                <Route path="duties" element={<StaffSchedulePage />} />
                <Route path="duties/:dutyId" element={<StaffDutyDetailPage />} />
                <Route path="availability" element={<StaffAvailabilityPage />} />
                <Route path="leave" element={<StaffLeavePage />} />
                <Route path="security" element={<StaffSecurityPage />} />
              </Route>

              {/* B2B Organization Workspace Shell */}
              <Route path="/organization/login" element={<OrgLoginPage />} />
              <Route path="/organization" element={<OrgLayout />}>
                <Route index element={<Navigate to="/organization/dashboard" replace />} />
                <Route path="dashboard" element={<OrgDashboardPage />} />
                <Route path="requests" element={<OrgRequestsListPage />} />
                <Route path="requests/new" element={<OrgRequestBuilderPage />} />
                <Route path="requests/:id" element={<OrgRequestDetailPage />} />
                <Route path="roster" element={<OrgRosterPage />} />
                <Route path="schedule" element={<OrgSchedulePage />} />
                <Route path="timesheets" element={<OrgTimesheetsPage />} />
                <Route path="invoices" element={<OrgInvoicesPage />} />
                <Route path="profile" element={<OrgProfilePage />} />
                <Route path="support" element={<OrgSupportPage />} />
              </Route>

              {/* Legacy Pro Route Redirect to In-House Staff Duty Portal */}
              <Route path="/pro/*" element={<Navigate to="/staff/dashboard" replace />} />

              {/* Admin Operations Command Center Shell */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="staff" element={<AdminStaffPage />} />
                <Route path="staff/new" element={<AdminAddStaffWizardPage />} />
                <Route path="staff/:staffId" element={<AdminStaffDetailPage />} />
                <Route path="careers" element={<AdminCareersPage />} />
                <Route path="organization-requests" element={<AdminOrganizationRequestsPage />} />
                <Route path="professionals" element={<Navigate to="/admin/staff" replace />} />
                <Route path="kyc" element={<AdminKYCQueuePage />} />
                <Route path="clients" element={<AdminClientsPage />} />
                <Route path="organizations" element={<AdminOrganizationsPage />} />
                <Route path="services" element={<AdminServicesPricingPage />} />
                <Route path="pricing" element={<AdminServicesPricingPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
                <Route path="matching" element={<AdminMatchingPage />} />
                <Route path="payments" element={<AdminPaymentsPage />} />
                <Route path="payouts" element={<AdminPayoutsPage />} />
                <Route path="timesheets" element={<AdminPaymentsPage />} />
                <Route path="invoices" element={<AdminPaymentsPage />} />
                <Route path="reviews" element={<AdminReviewsPage />} />
                <Route path="support" element={<AdminSupportDeskPage />} />
                <Route path="notifications" element={<AdminNotificationsPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="roles" element={<AdminRolesPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* Utility Pages */}
              <Route path="/design-system" element={<DesignSystemPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
