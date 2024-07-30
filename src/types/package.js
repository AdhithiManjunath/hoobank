// package.js

/**
 * Package data structure
 * @typedef {Object} Package
 * @property {string} name - Name of the package
 * @property {number} price - Price of the package
 * @property {string} invoiceDate - Date of the invoice (e.g., 'Jan 13, 2023')
 * @property {string} status - Status of the package (e.g., 'Paid', 'Unpaid', 'Pending')
 */

/**
 * Example package data
 * @type {Package[]}
 */
export const packageData = [
  {
    name: 'Free package',
    price: 0.0,
    invoiceDate: 'Jan 13, 2023',
    status: 'Paid',
  },
  {
    name: 'Standard Package',
    price: 59.0,
    invoiceDate: 'Jan 13, 2023',
    status: 'Paid',
  },
  {
    name: 'Business Package',
    price: 99.0,
    invoiceDate: 'Jan 13, 2023',
    status: 'Unpaid',
  },
  {
    name: 'Standard Package',
    price: 59.0,
    invoiceDate: 'Jan 13, 2023',
    status: 'Pending',
  },
];
