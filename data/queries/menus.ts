import { gql } from "@apollo/client";

export interface IMenuItem {
  _id: string;
  title: string;
  url: string;
}

export interface IMenu {
  _id: string;
  title: string;
  items: IMenuItem[];
}

export const cmsMenuList = gql`
  query MenuList {
    cpMenuList {
      _id
      title
      items {
        _id
        title
        url
      }
    }
  }
`;
