interface WebServerLogResultsProps {
  rawLogData: string[];
}

interface PageVisitDetails {
  page: string;
  totalPageVisits: number;
  uniqueVisits: number;
}

const WebServerLogResults = ({ rawLogData }: WebServerLogResultsProps): JSX.Element => {
  console.log({ rawLogData });

  const formattedListOfSiteVisits = rawLogData.map((log) => log.split(' '));
  const pagesVisited = formattedListOfSiteVisits.map((siteVisit) => siteVisit[0]);
  const ipAddressList = formattedListOfSiteVisits.map((siteVisit) => siteVisit[1]);

  console.log({ formattedListOfSiteVisits, pagesVisited, ipAddressList });

  const calculateSiteVisits: PageVisitDetails[] = formattedListOfSiteVisits.map((log) => {
    const totalPageVisits = formattedListOfSiteVisits.filter((listItem) => log[0] === listItem[0]);
    const ipAddresses = totalPageVisits.map((pageVisit) => pageVisit[1]);
    const uniqueVisits = ipAddresses.filter(
      (ipAddress, index) => ipAddresses.indexOf(ipAddress) === index,
    );
    return {
      page: log[0],
      totalPageVisits: totalPageVisits.length,
      uniqueVisits: uniqueVisits.length,
    };
  });

  const listOfNoDuplicatePageVisits = calculateSiteVisits.reduce<PageVisitDetails[]>(
    (list, siteVisit, currentIndex) => {
      if (pagesVisited.indexOf(siteVisit.page) === currentIndex) {
        list.push(siteVisit);
      }
      return list;
    }, [],
  );

  console.log({ calculateSiteVisits, listOfNoDuplicatePageVisits });

  return (
    <div>
      <h2>Total Visits</h2>
      <ul>
        {listOfNoDuplicatePageVisits.length > 0
          ? listOfNoDuplicatePageVisits.map((pageVisitDetails) => (
            <li key={pageVisitDetails.page}>
              {`${pageVisitDetails.page} - ${pageVisitDetails.totalPageVisits} visits`}
            </li>
          )) : null}
      </ul>
      <h2>Unique Visits</h2>
      <ul>

        {listOfNoDuplicatePageVisits.length > 0
          ? listOfNoDuplicatePageVisits.map((pageVisitDetails) => (
            <li key={pageVisitDetails.page}>
              {`${pageVisitDetails.page} - ${pageVisitDetails.uniqueVisits} unique views`}
            </li>
          )) : null}
      </ul>
    </div>
  );
};

export default WebServerLogResults;
