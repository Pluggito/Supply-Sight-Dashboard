import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $warehouse: String, $status: String) {
    products(search: $search, warehouse: $warehouse, status: $status) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      code
      name
      city
      country
    }
  }
`;

export const GET_KPIS = gql`
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      totalStock
      totalDemand
      fillRate
    }
  }
`;

export const GET_TRENDS = gql`
  query GetTrends($range: String!) {
    trends(range: $range) {
      date
      stock
      demand
    }
  }
`;

export const UPDATE_DEMAND = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const TRANSFER_STOCK = gql`
  mutation TransferStock(
    $id: ID!
    $amount: Int!
    $fromWarehouse: String!
    $toWarehouse: String!
  ) {
    transferStock(
      id: $id
      amount: $amount
      fromWarehouse: $fromWarehouse
      toWarehouse: $toWarehouse
    ) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;
