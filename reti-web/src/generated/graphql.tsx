import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Apartment = {
  __typename?: 'Apartment';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  floor: Scalars['Float'];
  areaSize: Scalars['Float'];
  price: Scalars['Float'];
  numberOfRooms: Scalars['Float'];
  realtorId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ApartmentInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  floor: Scalars['Float'];
  areaSize: Scalars['Float'];
  price: Scalars['Float'];
  numberOfRooms: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApartment: Apartment;
  updateApartment?: Maybe<Apartment>;
  deleteApartment: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateApartmentArgs = {
  input: ApartmentInput;
};


export type MutationUpdateApartmentArgs = {
  input: ApartmentInput;
  id: Scalars['String'];
};


export type MutationDeleteApartmentArgs = {
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  apartments: Array<Apartment>;
  apartment?: Maybe<Apartment>;
  me?: Maybe<User>;
};


export type QueryApartmentArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: string, email: string };

export type RegularUserReponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, email: string }> };

export type ApartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApartmentsQuery = { __typename?: 'Query', apartments: Array<{ __typename?: 'Apartment', id: string, name: string, description: string, floor: number, areaSize: number, price: number, numberOfRooms: number }> };

export type CreateApartmentMutationVariables = Exact<{
  input: ApartmentInput;
}>;


export type CreateApartmentMutation = { __typename?: 'Mutation', createApartment: { __typename?: 'Apartment', id: string, createdAt: string, updatedAt: string, name: string, description: string, floor: number, areaSize: number, numberOfRooms: number, price: number } };

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, email: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, email: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, email: string }> };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
}
    `;
export const RegularUserReponseFragmentDoc = gql`
    fragment RegularUserReponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ApartmentsDocument = gql`
    query Apartments {
  apartments {
    id
    name
    description
    floor
    areaSize
    price
    numberOfRooms
  }
}
    `;

export function useApartmentsQuery(options: Omit<Urql.UseQueryArgs<ApartmentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ApartmentsQuery>({ query: ApartmentsDocument, ...options });
};
export const CreateApartmentDocument = gql`
    mutation createApartment($input: ApartmentInput!) {
  createApartment(input: $input) {
    id
    createdAt
    updatedAt
    name
    description
    floor
    areaSize
    numberOfRooms
    price
  }
}
    `;

export function useCreateApartmentMutation() {
  return Urql.useMutation<CreateApartmentMutation, CreateApartmentMutationVariables>(CreateApartmentDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    ...RegularUserReponse
  }
}
    ${RegularUserReponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(options: {email: $email, password: $password}) {
    ...RegularUserReponse
  }
}
    ${RegularUserReponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};