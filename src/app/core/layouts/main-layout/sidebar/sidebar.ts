import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  name: string;
  path?: string;
  icon?: string;
  subMenu?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.html'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isCollapsed: boolean = true; // Default to mini state
  @Output() closeSidebar = new EventEmitter<void>();
  isHovered: boolean = false;
  userRole: string = 'Requester';
  menuItems: MenuItem[] = [];
  openMenus: { [key: string]: boolean } = {};
  private authSub?: Subscription;

  constructor(private authService: AuthService) { }

  close() {
    this.closeSidebar.emit();
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
    // Close all submenus when leaving if in mini state
    if (this.isCollapsed) {
      this.openMenus = {};
    }
  }

  get isEffectivelyCollapsed(): boolean {
    return this.isCollapsed && !this.isHovered;
  }

  ngOnInit() {
    this.authSub = this.authService.userRole$.subscribe(role => {
      this.userRole = role || 'Requester';
      this.generateMenu();
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  toggleSubMenu(menuName: string) {
    this.openMenus[menuName] = !this.openMenus[menuName];
  }

  generateMenu() {
    const role = this.userRole;

    const roleMenus: { [key: string]: MenuItem[] } = {
      "Admin": [
        { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
        {
          name: "Asset Register",
          icon: "inventory_2",
          subMenu: [
            { name: "View Assets", path: "/dashboard/asset-list" },

          ],
        },
        {
          name: "Masters",
          icon: "settings",
          subMenu: [
            { name: "Assign Admin & Approver", path: "/admin/assign-role" },
            { name: "Assign Non NRL User", path: "/admin/add-employee" },
            { name: "Assign Asset Class to Department", path: "/admin/add-asset-class" },
            { name: "Assign Dept wise Admin, Auditor", path: "/admin/asset-mapping" },
            {name:"Location Master", path:"/admin/add-location"},
            { name: "Hr Finance Master", path: "/admin/hr-finance" },
            { name: "Dept Master", path: "/admin/view-departments" },
            { name: "Employee Details", path: "/admin/view-employees" },
            { name: "Dept wise Employees", path: "/admin/dept-custodian-list" },
          ],
        },
      
      ],

      "IT-Admin": [
        { name: "Dashboard", path: "/itadmin", icon: "dashboard" },
        {
          name: "Asset Register",
          icon: "inventory_2",
          subMenu: [
            { name: "View Assets List", path: "/itadmin/ViewImportedAssets" },
            { name: "Asset Status Change", path: "/itadmin/AssetChangeUpdate" },
            { name: "Add Asset Documents", path: "/itadmin/add-documents" },
            { name: "View Asset Export History", path: "/itadmin/ExportHistory" },
            { name: "View Asset Location on map", path: "/itadmin/assets/location" },
          ],
        },
        {
          name: "Asset Allocation",
          icon: "assignment",
          subMenu: [
            { name: "Approve Allocation of Assets", path: "/itadmin/AdminViewAssetRequest" },
            { name: "View Allocation of Assets", path: "/itadmin/ViewAssetRequest" },
          ],
        },
        {
          name: "Asset Parking",
          icon: "local_parking",
          subMenu: [
            { name: "Asset park Screen", path: "/itadmin/AssetParking" },
            { name: "Allocate Asset Parked", path: "/itadmin/ViewAssetParking" },
          ],
        },
        {
          name: "Custodian Transfer",
          icon: "people",
          subMenu: [
            { name: "Approve Custodian Transfer", path: "/itadmin/AdminViewCustodianChangeRequests" },
            { name: "View Custodian Transfer", path: "/itadmin/ViewApprovedCustodianTransfer" },
          ],
        },
        {
          name: "Location Transfer",
          icon: "location_on",
          subMenu: [
            { name: "Approve Location Transfer", path: "/itadmin/AdminViewLocationChange" },
            { name: "View Location Transfers", path: "/itadmin/ViewApprovedLocationTransfer" },
          ],
        },
        {
          name: "Asset Return",
          icon: "keyboard_return",
          subMenu: [
            { name: "Approve Asset Return", path: "/itadmin/AdminViewAssetReturn" },
            { name: "View Returned Assets", path: "/itadmin/ViewApprovedAssetReturn" },
          ],
        },
        {
          name: "Asset Buyback",
          icon: "shopping_cart",
          subMenu: [
            { name: "Approve Buyback Assets", path: "/itadmin/AdminViewBuyBackAssets" },
            { name: "View Buyback Items", path: "/itadmin/ViewApprovedBuyBackAssets" },
          ],
        },
        { name: "View All Requests", path: "/itadmin/ViewAllRequests", icon: "list_alt" },
        {
          name: "Print QR Codes",
          icon: "qr_code",
          subMenu: [
            { name: "QRCodes for Selected Assets", path: "/itadmin/ViewImportedAssets" },
            { name: "QRCodes for Double Sticker", path: "/itadmin/QRCodeManager" },
            { name: "QRCodes for Single Sticker", path: "/itadmin/QRCodeManager" },
            { name: "QRCodes for Single Asset", path: "/itadmin/QRCodeManager" },
            { name: "QRCodes for Asset type", path: "/itadmin/QRCodeManager" },
            { name: "QRCodes for Asset Create Date", path: "/itadmin/QRCodeManager" },
          ],
        },
        {
          name: "Asset Auditing",
          icon: "fact_check",
          subMenu: [
            { name: "Create Audit", path: "/itadmin/CreateAudit" },
            { name: "Approve Audits Assets", path: "/itadmin/ApproveAuditedAssets" },
            { name: "Completed Audits", path: "/itadmin/AuditCompletion" },
            { name: "Edit Audit Assets", path: "/itadmin/EditAuditedAsset" },
          ],
        },
        {
          name: "View Reports",
          icon: "bar_chart",
          subMenu: [
            { name: "Audit Reports", path: "/itadmin/AuditReports" },
            { name: "Asset Reports", path: "/itadmin/AssetReports" },
          ],
        },
      ],

      "HR Admin": [
        { name: "Dashboard", path: "/admin", icon: "dashboard" },
        {
          name: "HR Masters",
          icon: "person_add",
          subMenu: [
            { name: "Hr Finance Master", path: "/admin/assign-buyback-mail" },
            { name: "Dept Master", path: "/admin/view-departments" },
            { name: "Employee Details", path: "/admin/view-employees" },
            { name: "Dept wise Employees", path: "/admin/dept-custodian-list" },
          ],
        },
        {
          name: "Reports",
          icon: "assessment",
          subMenu: [
            { name: "Employee Asset Reports", path: "/admin/AssetReports" },
          ],
        },
      ],

      "Requester": [
        { name: "Dashboard", path: "/user", icon: "dashboard" },
        { name: "View Allocated Assets", path: "/user/allocatedassets", icon: "assignment_turned_in" },
        { name: "Request Asset", path: "/user/request-asset", icon: "add_shopping_cart" },
        { name: "Buyback", path: "/user/buyback", icon: "shopping_cart" },
        { name: "Location Transfer", path: "/user/location-transfer", icon: "location_on" },
        { name: "Custodian Transfer", path: "/user/custodian-transfer", icon: "people_alt" },
        { name: "Asset Return", path: "/user/asset-return", icon: "keyboard_return" },
      ],

      "Approver": [
        { name: "Dashboard", path: "/approver", icon: "dashboard" },
        { name: "Asset Requests", icon: "inventory_2", path: "/approver/asset-requests" },
        { name: "Location Transfer Requests", icon: "location_on", path: "/approver/location-transfer-requests" },
        { name: "Custodian Transfer Requests", icon: "people_alt", path: "/approver/custodian-transfer-requests" },
      ],

      "Auditor": [
        { name: "Dashboard", path: "/user", icon: "dashboard" },
        {
          name: "Audits",
          icon: "inventory_2",
          subMenu: [
            { name: "View Audits", path: "/user/ViewAudits" },
            { name: "Asset Audits", path: "/user/AssetAudit" },
            { name: "Edit Audit Assets", path: "/user/EditAuditAsset" },
            { name: "Audit wise status", path: "/user/AuditWiseStatus" },
            { name: "Assets by Audits", path: "/user/AssetByAudit" },
          ],
        },
      ],
    };

    const menuItems = roleMenus[role] || roleMenus["Requester"] || [];

    this.menuItems = [
      ...menuItems,
      { name: "Profile", path: "/dashboard/profile", icon: "account_circle" },
      { name: "AI Chatbot", path: "/dashboard/ai-chatbot", icon: "smart_toy" },
    ];
  }

  logout() {
    this.authService.logout();
  }
}
