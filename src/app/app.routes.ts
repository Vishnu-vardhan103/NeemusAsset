import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MainLayoutComponent } from './core/layouts/main-layout/layout/layout';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { 
    path: 'dashboard', 
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent) },
      { path: 'ai-chatbot', loadComponent: () => import('./pages/chatbot/chatbot.component').then(m => m.ChatbotComponent) },
      { path: 'add-asset', loadComponent: () => import('./pages/admin/add-asset/add-asset').then(m => m.AddAssetComponent) },
      { path: 'asset-list', loadComponent: () => import('./pages/admin/asset-list/asset-list.component').then(m => m.AssetListComponent) },
    
    ]
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [
      { path: 'assign-role', loadComponent: () => import('./pages/admin/assign-emp-role/assign-emp-role.component').then(m => m.AssignEmpRoleComponent) },
      { path: 'add-employee', loadComponent: () => import('./pages/admin/add-employee/add-employee.component').then(m => m.AddEmployeeComponent) },
      { path: 'add-asset-class', loadComponent: () => import('./pages/admin/add-asset-class/add-asset-class.component').then(m => m.AddAssetClassComponent) },
      { path: 'asset-mapping', loadComponent: () => import('./pages/admin/asset-class-mapping/asset-class-mapping.component').then(m => m.AssetClassMappingComponent) },
      { path: 'hr-finance', loadComponent: () => import('./pages/admin/hr-finance-authority/hr-finance-authority.component').then(m => m.HrFinanceAuthorityComponent) },
      { path: 'view-departments', loadComponent: () => import('./pages/admin/view-departments/view-departments.component').then(m => m.ViewDepartmentsComponent) },
      { path: 'view-employees', loadComponent: () => import('./pages/admin/view-employees/view-employees.component').then(m => m.ViewEmployeesComponent) },
      { path: 'dept-custodian-list', loadComponent: () => import('./pages/admin/dept-custodian-list/dept-custodian-list.component').then(m => m.DeptCustodianListComponent) },
      { path: 'role-list', loadComponent: () => import('./pages/admin/role-list/role-list.component').then(m => m.RoleListComponent) },
      { path: 'employee-list', loadComponent: () => import('./pages/admin/employee-list/employee-list.component').then(m => m.EmployeeListComponent) },
      { path: 'asset-class-list', loadComponent: () => import('./pages/admin/asset-class-list/asset-class-list.component').then(m => m.AssetClassListComponent) },
      { path: 'asset-mapping-list', loadComponent: () => import('./pages/admin/asset-mapping-list/asset-mapping-list.component').then(m => m.AssetMappingListComponent) },
      { path: 'hr-finance-list', loadComponent: () => import('./pages/admin/hr-finance-list/hr-finance-list.component').then(m => m.HrFinanceListComponent) },
      { path: 'add-location', loadComponent: () => import('./pages/admin/add-location/add-location.component').then(m => m.AddLocationComponent) },
      { path: 'view-locations', loadComponent: () => import('./pages/admin/view-locations/view-locations.component').then(m => m.ViewLocationsComponent) },
    ]
  },
  {
    path: 'itadmin',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'ViewImportedAssets', 
        loadComponent: () => import('./pages/itadmin/print-qr-codes/print-qr-codes.component').then(m => m.PrintQrCodesComponent) },
      { path: 'AssetChangeUpdate', loadComponent: () => import('./pages/itadmin/asset-status-change/asset-status-change.component').then(m => m.AssetStatusChangeComponent) },
      { path: 'add-documents', loadComponent: () => import('./pages/itadmin/add-asset-documents/add-asset-documents.component').then(m => m.AddAssetDocumentsComponent) },
      { path: 'ExportHistory', loadComponent: () => import('./pages/itadmin/asset-export-history/asset-export-history.component').then(m => m.AssetExportHistoryComponent) },
      { path: 'assets/location', loadComponent: () => import('./pages/itadmin/asset-location-map/asset-location-map.component').then(m => m.AssetLocationMapComponent) },
      { path: 'AssetParking', loadComponent: () => import('./pages/itadmin/asset-parking/asset-parking.component').then(m => m.AssetParkingComponent) },
      { path: 'ViewAssetParking', loadComponent: () => import('./pages/itadmin/view-asset-parking/view-asset-parking.component').then(m => m.ViewAssetParkingComponent) },
      { path: 'AdminViewAssetRequest', loadComponent: () => import('./pages/itadmin/admin-approve-allocation/admin-approve-allocation.component').then(m => m.AdminApproveAllocationComponent) },
      { path: 'ViewAssetRequest', loadComponent: () => import('./pages/itadmin/view-asset-allocation/view-asset-allocation.component').then(m => m.ViewAssetAllocationComponent) },
      { path: 'AdminViewCustodianChangeRequests', loadComponent: () => import('./pages/itadmin/admin-approve-custodian-transfer/admin-approve-custodian-transfer.component').then(m => m.AdminApproveCustodianTransferComponent) },
      { path: 'ViewApprovedCustodianTransfer', loadComponent: () => import('./pages/itadmin/view-custodian-transfer/view-custodian-transfer.component').then(m => m.ViewCustodianTransferComponent) },
      { path: 'AdminViewLocationChange', loadComponent: () => import('./pages/itadmin/admin-approve-location-transfer/admin-approve-location-transfer.component').then(m => m.AdminApproveLocationTransferComponent) },
      { path: 'ViewApprovedLocationTransfer', loadComponent: () => import('./pages/itadmin/view-location-transfer/view-location-transfer.component').then(m => m.ViewLocationTransferComponent) },
      { path: 'ViewAllRequests', loadComponent: () => import('./pages/itadmin/view-all-requests/view-all-requests.component').then(m => m.ViewAllRequestsComponent) },
      { path: 'AdminViewBuyBackAssets', loadComponent: () => import('./pages/itadmin/admin-approve-buyback/admin-approve-buyback.component').then(m => m.AdminApproveBuybackComponent) },
      { path: 'ViewApprovedBuyBackAssets', loadComponent: () => import('./pages/itadmin/view-buyback-history/view-buyback-history.component').then(m => m.ViewBuybackHistoryComponent) },
      { path: 'AdminViewAssetReturn', loadComponent: () => import('./pages/itadmin/admin-approve-return/admin-approve-return.component').then(m => m.AdminApproveReturnComponent) },
      { path: 'ViewApprovedAssetReturn', loadComponent: () => import('./pages/itadmin/view-return-history/view-return-history.component').then(m => m.ViewReturnHistoryComponent) },
      { path: 'CreateAudit', loadComponent: () => import('./pages/itadmin/create-audit/create-audit.component').then(m => m.CreateAuditComponent) },
      { path: 'ApproveAuditedAssets', loadComponent: () => import('./pages/itadmin/approve-audited-assets/approve-audited-assets.component').then(m => m.ApproveAuditedAssetsComponent) },
      { path: 'AuditReports', loadComponent: () => import('./pages/itadmin/audit-list/audit-list.component').then(m => m.AuditListComponent) },
      { path: 'AuditAssets', loadComponent: () => import('./pages/itadmin/audit-assets/audit-assets.component').then(m => m.AuditAssetsComponent) },
      { path: 'AuditCompletion', loadComponent: () => import('./pages/itadmin/audit-completion/audit-completion.component').then(m => m.AuditCompletionComponent) },
      { path: 'EditAuditedAsset', loadComponent: () => import('./pages/itadmin/edit-audited-asset/edit-audited-asset.component').then(m => m.EditAuditedAssetComponent) },
      { path: 'AssetReports', loadComponent: () => import('./pages/itadmin/asset-reports/asset-reports.component').then(m => m.AssetReportsComponent) },
      { path: 'QRCodeManager', loadComponent: () => import('./pages/itadmin/qr-code-manager/qr-code-manager.component').then(m => m.QrCodeManagerComponent) },
    ]
  },
  {
    path: 'user',
    component: MainLayoutComponent,
    children: [
      { path: 'allocatedassets', loadComponent: () => import('./pages/requestor/allocated-assets/allocated-assets.component').then(m => m.AllocatedAssetsComponent) },
      { path: 'request-asset', loadComponent: () => import('./pages/requestor/request-asset/request-asset.component').then(m => m.RequestAssetComponent) },
      { path: 'view-asset-requests', loadComponent: () => import('./pages/requestor/view-asset-requests/view-asset-requests.component').then(m => m.ViewAssetRequestsComponent) },
      { path: 'buyback', loadComponent: () => import('./pages/requestor/buyback/buyback.component').then(m => m.BuybackComponent) },
      { path: 'buyback-history', loadComponent: () => import('./pages/requestor/buyback-history/buyback-history.component').then(m => m.BuybackHistoryComponent) },
      { path: 'location-transfer', loadComponent: () => import('./pages/requestor/location-transfer/location-transfer.component').then(m => m.LocationTransferComponent) },
      { path: 'location-transfer-history', loadComponent: () => import('./pages/requestor/location-transfer-history/location-transfer-history.component').then(m => m.LocationTransferHistoryComponent) },
      { path: 'custodian-transfer', loadComponent: () => import('./pages/requestor/custodian-transfer/custodian-transfer.component').then(m => m.CustodianTransferComponent) },
      { path: 'custodian-transfer-history', loadComponent: () => import('./pages/requestor/custodian-transfer-history/custodian-transfer-history.component').then(m => m.CustodianTransferHistoryComponent) },
      { path: 'asset-return', loadComponent: () => import('./pages/requestor/asset-return/asset-return.component').then(m => m.AssetReturnComponent) },
      { path: 'asset-return-history', loadComponent: () => import('./pages/requestor/asset-return-history/asset-return-history.component').then(m => m.AssetReturnHistoryComponent) },
    ]
  },
  {
    path: 'approver',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'asset-requests', loadComponent: () => import('./pages/approver/asset-requests/asset-requests.component').then(m => m.AssetRequestsComponent) },
      { path: 'location-transfer-requests', loadComponent: () => import('./pages/approver/location-transfer-requests/location-transfer-requests.component').then(m => m.LocationTransferRequestsComponent) },
      { path: 'custodian-transfer-requests', loadComponent: () => import('./pages/approver/custodian-transfer-requests/custodian-transfer-requests.component').then(m => m.CustodianTransferRequestsComponent) },
    ]
  },
  { path: '**', redirectTo: '' }
];

