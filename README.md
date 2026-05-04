# MeDirect Test

## Documentation

Run `npm run serve` for a dev server. Navigate to `http://localhost:8080/`.

On initial load, the app will display two dropdowns, one of which is disabled. Selecting a _Primary Symbol_ will load data related to the selected pair as well as a history of the last month's close price charted on a line graph by default. There is also the option to select a different date range from a list of available buttons.

### Limitations

Creating a free account on [https://massive.com/](https://massive.com/) allows for up to 5 API calls per minute. As a result, the user might frequently be faced with error messages.

The first endpoint called is done on initial page load to retrieve the full list of FX tickers. However there is a maximum limit of 1000 on the amount of tickers retrieved. The workaround to this limitation was to make two API calls, one retrieving 1000 records in ascending order and another retrieving 300 records in descending order. The second API call was done to retieve the remaining records along with some duplicates. The duplicates were filtered out, and both results were merged and sorted to get the required list of tickers.
