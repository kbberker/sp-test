import React from 'react';
import { render } from '@testing-library/react';
import WebServerLogResults, { createPageVisitDetails } from './WebServerLogResults';

const mockData = [
  '/help_page/1 126.318.035.038',
  '/contact 184.123.665.067',
  '/home 184.123.665.067',
  '/about/2 444.701.448.104',
  '/help_page/1 929.398.951.889',
  '/index 444.701.448.104',
  '/help_page/1 722.247.931.582',
  '/about 061.945.150.735',
  '/help_page/1 646.865.545.408',
  '/home 235.313.352.950',
  '/contact 184.123.665.067',
  '/help_page/1 543.910.244.929',
];

const mockFormattedData = [
  ['/help_page/1', '126.318.035.038'],
  ['/contact', '184.123.665.067'],
  ['/home 184.123.665.067'],
  ['/about/2', '444.701.448.104'],
  ['/help_page/1', '929.398.951.889'],
  ['/index 444.701.448.104'],
  ['/help_page/1', '722.247.931.582'],
  ['/about 061.945.150.735'],
  ['/help_page/1', '646.865.545.408'],
  ['/home', '235.313.352.950'],
  ['/contact', '184.123.665.067'],
  ['/help_page/1', '126.318.035.038'],
];

test('WebServerLogResults snapshot is correct', () => {
  const page = render(<WebServerLogResults rawLogData={mockData} />);
  expect(page).toMatchSnapshot();
});

test('createPageVisitDetails correctly creates pageVisitDetails', () => {
  expect(createPageVisitDetails(['/help_page/1', '126.318.035.038'], 0, mockFormattedData))
    .toStrictEqual({ page: '/help_page/1', totalPageVisits: 5, uniqueVisits: 4 });
});
