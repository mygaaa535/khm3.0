import { gql } from "@apollo/client";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  parentId?: string;
  code?: string;
  order?: number;
  attachment?: {
    url: string;
  };
}

export interface ICmsCategoryListResponse {
  cpCategoryList: ICategory[];
}

export const cmsCategoryList = gql`
  query CategoryList {
    cpCategoryList {
      _id
      name
      description
      parentId
      code
      order
      attachment {
        url
      }
    }
  }
`;
