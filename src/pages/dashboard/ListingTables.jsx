import React from 'react'
import DashboardCommanDt from './DashboardCommanDt';

export function IssuedCouponDt() {
    const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'code', headerName: 'Coupon Code', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 130 },
];

const rows = [
  { id: 1, code: 'SAVE50', amount: 50 },
  { id: 2, code: 'FLAT20', amount: 20 },
];

  return <DashboardCommanDt title="Issued Coupons" columns={columns} rows={rows} /> ;

}


export function RedeemedCouponDt() {
 const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'code', headerName: 'Coupon Code', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 130 },
];

const rows = [
  { id: 1, code: 'ABC', amount: 50 },
  { id: 2, code: 'XYZ', amount: 20 },
];
   return <DashboardCommanDt title="Redeemed Coupons" columns={columns} rows={rows} /> ;
}


export function TotalValueDt() {
     const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'code', headerName: 'Coupon Code', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 130 },
];

const rows = [
  { id: 1, code: 'Demo', amount: 50 },
  { id: 2, code: 'Demo2', amount: 20 },
];
    return <DashboardCommanDt title="Total Value" columns={columns} rows={rows} /> ;
}


export function TotalCustomerDt() {
 const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'customername', headerName: 'Customer Name', width: 150 },
  { field: 'mobile', headerName: 'Mobile', width: 130 },
];

const rows = [
  { id: 1, customername: 'Amrit', mobile: "8976774567" },
  { id: 2, customername: 'Parag', mobile: "9865437645" },
];
  return <DashboardCommanDt title="Total Customer" columns={columns} rows={rows} /> ;
}