export const fetchBreweries = async () => {
  const breweries = await fetch("https://api.openbrewerydb.org/breweries", {
    method: "GET",
  });

  const breweriesRes = await breweries.json();
  return breweriesRes;
};
