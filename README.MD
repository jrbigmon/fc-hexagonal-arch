# Product CLI and Server Documentation

## Architecture

The Product CLI and Server use a Hexagonal Architecture, also known as Ports and Adapters Architecture.

### What is Hexagonal Architecture?

Hexagonal Architecture is a software architecture pattern that aims to separate the application's business logic from its infrastructure and presentation layers.

### Why Use Hexagonal Architecture?

There are several reasons why you might want to use Hexagonal Architecture:

- **Separation of Concerns**: Hexagonal Architecture helps to separate the application's business logic from its infrastructure and presentation layers, making it easier to maintain and evolve the application.
- **Testability**: By separating the business logic from the infrastructure and presentation layers, it becomes easier to write unit tests for the business logic.
- **Flexibility**: Hexagonal Architecture makes it easier to switch out different infrastructure and presentation layers, allowing you to use different databases, web frameworks, or messaging systems.
- **Reusability**: The business logic layer can be reused across different applications and infrastructure layers.

### How Does Hexagonal Architecture Work?

In a Hexagonal Architecture, the application is divided into several layers:

- **Business Logic Layer**: This layer contains the application's business logic, which is responsible for processing data and making decisions.
- **Infrastructure Layer**: This layer contains the infrastructure components, such as databases, file systems, and messaging systems.
- **Presentation Layer**: This layer contains the presentation components, such as web frameworks, APIs, and user interfaces.
- **Ports**: These are the interfaces between the business logic layer and the infrastructure and presentation layers.
- **Adapters**: These are the implementations of the ports, which map the business logic layer to the infrastructure and presentation layers.

**Final Considerations**

When using Hexagonal Architecture, there are several things to keep in mind:

- **Keep the business logic layer pure**: Avoid mixing infrastructure and presentation concerns into the business logic layer.
- **Use ports and adapters**: Define clear interfaces between the business logic layer and the infrastructure and presentation layers, and use adapters to implement these interfaces.
- **Test thoroughly**: Write unit tests for the business logic layer, and integration tests for the infrastructure and presentation layers.
- **Be flexible**: Be prepared to switch out different infrastructure and presentation layers as needed.

## Table of Contents

- [Getting Started](#getting-started)
- [Product CLI](#product-cli)
  - [Commands](#commands)
  - [Options](#options)
- [Product Server](#product-server)
  - [Endpoints](#endpoints)
  - [Request/Response Bodies](#requestresponse-bodies)
- [Validations](#validations)
- [Troubleshooting](#troubleshooting)
- [Running the Server and CLI](#running-the-server-and-cli)

## Getting Started

To use the Product CLI and Server, you need to have Node.js installed on your machine. You can download it from the official Node.js website.

## Product CLI

The Product CLI is a command-line interface that allows you to interact with the Product Server.

### Commands

The following commands are available:

- `create`: Create a new product
- `get`: Get a product by its ID
- `enable`: Enable a product
- `disable`: Disable a product
- `list`: List all products

## Product Server

The Product Server is a RESTful API that provides endpoints for creating, reading, enable and disable products.

### Endpoints

The following endpoints are available:

- `POST /products`: Create a new product

```json
// Body
{
  "name": "Controle de xbox",
  "price": 500
}
```

```json
// Response
{
  "id": "d514f280-f3f8-4195-b8ac-18c24845658a",
  "name": "Controle de xbox",
  "status": "enabled",
  "price": 500
}
```

- `GET /products/:id`: Get a product by its ID

```json
// Response
{
  "id": "d514f280-f3f8-4195-b8ac-18c24845658a",
  "name": "Controle de xbox",
  "status": "enabled",
  "price": 500
}
```

- `GET /products`: Get a list of products

```json
// Response
[
  {
    "id": "d514f280-f3f8-4195-b8ac-18c24845658a",
    "name": "Controle de xbox",
    "status": "enabled",
    "price": 500
  }
]
```

- `PUT /products/disable/:id`: Disable a product

```json
// Response
{
  "id": "d514f280-f3f8-4195-b8ac-18c24845658a",
  "name": "Controle de xbox",
  "status": "disabled",
  "price": 0
}
```

- `PUT /products/enable/:id`: Enable a product

```json
// Body
{
  "price": 500.5
}
```

```json
// Response
{
  "id": "d514f280-f3f8-4195-b8ac-18c24845658a",
  "name": "Controle de xbox",
  "status": "enabled",
  "price": 500.5
}
```

### Request/Response Bodies

The request and response bodies are in JSON format.

## Validations

The Product entity has the following validations:

- `name`: Required, string, max length 255
- `price`: Required, number, min value 0
- `status`: Required, string, one of "enabled" or "disabled" and the status will be generated automatically according to the price entered in the product. If it has a value greater than zero, it will be enabled, otherwise it will be disabled.

If any of these validations fail, the server will return a 400 Bad Request response with an error message.

The following error messages may be thrown by the Product entity:

- Product id is required (Generated from the application)
- Product status is not supported (Generated from the application)
- Product name is required
- Product price is required and must be a number
- Product price must be greater than or equal to zero
- Product status is enabled but the price is less or equal to zero
- Product status is disabled but the price is greater than zero

## Troubleshooting

If you encounter any issues while using the Product CLI or Server, you can try the following:

- Check the server logs for any error messages
- Verify that the request body is in the correct format
- Make sure that the product ID is correct and exists in the database

If none of these troubleshooting steps resolve the issue, you can contact the support team for further assistance.

## Running the Server and CLI

Install all dependencies

- `yarn install`: Will install all dependencies

To run the server and CLI, you can use the following commands in your terminal:

- `yarn start:web`: Start the server
- `yarn start:cli`: Run the CLI

These scripts are defined in the `package.json` file and can be modified to suit your needs.

Example `package.json` file:

```json
{
  "scripts": {
    "start:web": "npx tsc && node ./build/adapters/web/http/server/server.js",
    "start:web:dev": "npx ts-node-dev ./src/adapters/web/http/server/server.ts --watch",
    "test:jest": "jest --passWithNoTests --updateSnapshot --coverage",
    "start:cli": "npx tsc && node ./build/adapters/cli/product/product.exec.cli.js"
  }
}
```
