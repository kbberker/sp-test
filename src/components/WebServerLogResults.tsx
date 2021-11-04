interface WebServerLogResultsProps {
  listOfSiteVisits: string[]
}

const WebServerLogResults = ({ listOfSiteVisits }: WebServerLogResultsProps): JSX.Element => {
  console.log(listOfSiteVisits);

  const formattedListOfSiteVisits = listOfSiteVisits.map((log) => log.split(' '));

  console.log({ formattedListOfSiteVisits });

  const calculateSiteVisits = formattedListOfSiteVisits.map((log) => {
    const pageVisits = formattedListOfSiteVisits.filter((listItem) => log[0] === listItem[0]);
    const ipAddresses = pageVisits.map((pageVisit) => pageVisit[1]);
    const uniqueVisits = ipAddresses.filter(
      (ipAddress, index) => ipAddresses.indexOf(ipAddress) === index,
    );
    return [log[0], pageVisits.length - 1, uniqueVisits.length];
  });

  console.log({ calculateSiteVisits });

  return (
    <div>
      {listOfSiteVisits.length > 0 ? <h1>hello</h1> : null}
    </div>
  );
};

export default WebServerLogResults;
