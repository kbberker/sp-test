interface WebServerLogResultsProps {
  rawLogData: string[];
}

interface PageVisitDetails {
  page: string;
  totalPageVisits: number;
  uniqueVisits: number;
}

const createPageVisitDetails = (log: string[], logIndex: number, allPageVisits: string[][]) => {
  const totalPageVisits = allPageVisits.filter((listItem) => log[0] === listItem[0]);
  const ipAddresses = totalPageVisits.map((pageVisit) => pageVisit[1]);
  const uniqueVisits = ipAddresses.filter(
    (ipAddress, index) => ipAddresses.indexOf(ipAddress) === index,
  );
  return {
    page: log[0],
    totalPageVisits: totalPageVisits.length,
    uniqueVisits: uniqueVisits.length,
  };
};

const WebServerLogResults = ({ rawLogData }: WebServerLogResultsProps): JSX.Element => {
  const formattedListOfSiteVisits = rawLogData.map((log) => log.split(' '));
  const pagesVisited = formattedListOfSiteVisits.map((siteVisit) => siteVisit[0]);

  const listOfPageVisitDetails: PageVisitDetails[] = formattedListOfSiteVisits.map(createPageVisitDetails);

  const listOfUniquePageVisitDetails = listOfPageVisitDetails.reduce<PageVisitDetails[]>(
    (list, siteVisit, currentIndex) => {
      if (pagesVisited.indexOf(siteVisit.page) === currentIndex && siteVisit.page !== '') {
        list.push(siteVisit);
      }
      return list;
    }, [],
  );

  const sortedByTotalVisits = [...listOfUniquePageVisitDetails].sort((a, b) => b.totalPageVisits - a.totalPageVisits);
  const sortedByUniqueVisits = [...listOfUniquePageVisitDetails].sort((a, b) => b.uniqueVisits - a.uniqueVisits);

  return (
    <div>
      <h2>Total Visits</h2>
      <ul>
        {listOfUniquePageVisitDetails.length > 0
          ? sortedByTotalVisits.map((pageVisitDetails) => (
            <li key={pageVisitDetails.page}>
              {`${pageVisitDetails.page} - ${pageVisitDetails.totalPageVisits} visits`}
            </li>
          )) : <p>No data to display</p>}
      </ul>
      <h2>Unique Visits</h2>
      <ul>
        {listOfUniquePageVisitDetails.length > 0
          ? sortedByUniqueVisits.map((pageVisitDetails) => (
            <li key={pageVisitDetails.page}>
              {`${pageVisitDetails.page} - ${pageVisitDetails.uniqueVisits} unique views`}
            </li>
          )) : <p>No data to display</p>}
      </ul>
    </div>
  );
};

export default WebServerLogResults;
export { createPageVisitDetails };
