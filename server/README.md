# Crypto check Express API

Welcome to the documentation for my crypto app Express API. This document provides an overview of the API's endpoints, how to run it locally, and other relevant information.

## Table of Contents

1. [Routes](#routes)
2. [Middleware](#middleware)
3. [Error Handling](#error-handling)
4. [Collections](#collections)

## Routes

The following endpoints are available:

- `GET /api/cryptos`: Retrieve all cryptocurrencies. Search and pagination queries are available. Searched cryptocurrencies are logged to the terminal.

- `GET /api/cryptos/:id`: Retrieve a single cryptocurrency OHLCV info by ID. Available queries for granularity and date from when the currency should be fetched. Selected cryptocurrency is logged to the terminal.

### Example Usage:

```http
GET /api/cryptos
```

Response:

```
{
    "pagedArray": [
        {
            "id": "BTC",
            "name": "Bitcoin",
            "logoUrl": "https://assetUrl",
            "symbol": "BTC/USD",
            "timestamp": 1693855902800,
            "datetime": "2023-09-04T19:31:42.800Z",
            "close": 25850.75,
            "last": 25850.75,
            "info": [
                1693854000,
                25840,
                25907.68,
                25906.93,
                25850.75
            ]
        },
    ],
    "totalCryptos": 246,
    "totalPages": 21,
    "curPage": 1,
    "searchTerm": ""
}
```

## Middleware

We use the following middleware in the crypto-app API

- `cors`: For enabling CORS

## Error handling

Errors are returned in JSON format.

## Collections

Postman collections are included in the `collections` directory.
