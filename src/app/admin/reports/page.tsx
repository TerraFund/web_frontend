'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { FileText, Download, Calendar, TrendingUp, Users, Map, DollarSign, BarChart3 } from 'lucide-react';

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState<string>('users');
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });

  const reports = [
    {
      id: '1',
      name: 'User Registration Report',
      type: 'users',
      description: 'Monthly user registration and verification statistics',
      lastGenerated: '2024-01-25',
      size: '2.3 MB',
    },
    {
      id: '2',
      name: 'Land Listings Report',
      type: 'lands',
      description: 'Comprehensive land listing and investment data',
      lastGenerated: '2024-01-24',
      size: '4.1 MB',
    },
    {
      id: '3',
      name: 'Transaction Summary',
      type: 'transactions',
      description: 'Investment transactions and escrow activity',
      lastGenerated: '2024-01-26',
      size: '1.8 MB',
    },
    {
      id: '4',
      name: 'Dispute Resolution Report',
      type: 'disputes',
      description: 'Dispute cases and resolution statistics',
      lastGenerated: '2024-01-23',
      size: '956 KB',
    },
  ];

  const generateReport = async (type: string) => {
    try {
      const response = await fetch('/api/admin/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, dateRange }),
      });
      const data = await response.json();
      if (data.success) {
        // Handle success
        console.log('Report generated:', data.data);
      }
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const downloadReport = (reportId: string) => {
    // Mock download
    console.log(`Downloading report ${reportId}`);
  };

  const exportData = (format: 'csv' | 'pdf' | 'xlsx') => {
    // Mock export
    console.log(`Exporting ${reportType} data as ${format}`);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Report Types</h3>
              <div className="space-y-2">
                {[
                  { id: 'users', label: 'User Reports', icon: Users },
                  { id: 'lands', label: 'Land Reports', icon: Map },
                  { id: 'transactions', label: 'Transaction Reports', icon: DollarSign },
                  { id: 'disputes', label: 'Dispute Reports', icon: FileText },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setReportType(type.id as any)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        reportType === type.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date Range */}
            <div className="bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                <Calendar className="h-5 w-5 mr-2" />
                Date Range
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600">Start Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">End Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Export</h3>
              <div className="space-y-2">
                <Button onClick={() => exportData('csv')} variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV
                </Button>
                <Button onClick={() => exportData('xlsx')} variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export as Excel
                </Button>
                <Button onClick={() => exportData('pdf')} variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Generate New Report */}
            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Generate New Report</h2>
              <div className="flex items-center space-x-4">
                <Button onClick={() => generateReport(reportType)}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
                </Button>
                <span className="text-sm text-gray-600">
                  For date range: {dateRange.start} to {dateRange.end}
                </span>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Reports</h2>
              <div className="space-y-4">
                {reports.filter(report => report.type === reportType).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Last generated: {report.lastGenerated}</span>
                        <span>Size: {report.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => downloadReport(report.id)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Preview */}
            <div className="bg-white">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Report Preview</h2>
              <div className="bg-gray-50">
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Select a report type and date range to preview data
                  </p>
                  <p className="text-sm text-gray-500">
                    Preview will show sample data and statistics for the selected period
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}