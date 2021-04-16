import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { Client, createClient } from '@urql/core';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export interface IQueryManager {
  query: (query: TypedDocumentNode<any, object>, variables: Record<string, unknown>) => Promise<{ data?: any, error?: any }>;
}

export class UrqlQueryManager implements IQueryManager {
  client: Client;

  constructor() {
    this.client = this.createClient();
  }

  private createClient = (): Client => {
    return createClient({
      url: 'http://localhost:5002/proxy/ubff',
      fetchOptions: () => {
        const token = 'ajldhaskjdhaksjdhaskjhdaksjh';
        return {
          headers: { authorization: token ? `Bearer ${token}` : '' },
        };
      },
    });
  }

  public query = async (query: TypedDocumentNode<any, object>, variables: Record<string, unknown>): Promise<{ data?: any, error?: any }> => {
    return this.client.query(query, variables).toPromise();
  }
}

export class ApolloQueryManager implements IQueryManager {
  client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.client = this.createClient();
  }

  private createClient = (): ApolloClient<NormalizedCacheObject> => {
    const client = new ApolloClient({
      uri: 'http://localhost:5002/proxy/ubff',
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache',
        },
      }
    });
    return client;
  }

  public query = async (query: TypedDocumentNode<any, object>, variables: Record<string, unknown>): Promise<{ data?: any, error?: any }> => {
    return this.client.query({query, variables});
  }
}