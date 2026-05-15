# MeDirect Test

## Documentation

Create a free account on [https://massive.com/](https://massive.com/) to get an API key allowing up to 5 API calls per minute. Once you have an API key, create a `.env.local` file in the project root with the following line, replacing `{MASSIVE_API_KEY}` with your own API key.

```
VUE_APP_API_KEY={MASSIVE_API_KEY}
```

Run `npm run serve` for a dev server. Navigate to [http://localhost:8080/](http://localhost:8080/).

On initial load, the app will display two dropdowns. The _Exchange_ dropdown is disabled as the app only supports the selected option. Selecting an option from the _Primary Symbol_ dropdown will load data related to the selected pair, including the country flags and the currency codes, along with a history of the close price for the past month charted on a line graph. There is also the option to select a different date range from a list of available buttons which will in turn update the data displayed to the user accordingly.

### Testing

Run `npm run test:unit` to run all test suites.

Run `npm run coverage:unit` to get a summary of the project coverage by all test suites.

### Limitations

- The user might frequently be faced with toast error messages due to the 5 API calls per minute limit.

- The first endpoint called is done on initial page load to retrieve the full list of FX tickers. However there is a maximum limit of 1000 on the amount of tickers retrieved. The workaround to this limitation was to make two API calls to the same endpoint, one retrieving 1000 records in ascending order and another retrieving 300 records in descending order. The second API call was done to retieve the remaining records along with some duplicates. The duplicates were filtered out, and both results were merged and sorted to get the complete list of tickers.

### Future Improvements

- The _Primary Symbol_ dropdown can be further updated to display the last value selected which did not return an API error. With its current implementation the user can select other options, resulting in a mismatch between the selected option and the data displayed.

- Addition of E2E tests.
