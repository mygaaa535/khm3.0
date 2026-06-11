import { gql } from "@apollo/client";

export interface IPostThumbnail {
  url: string;
}

export interface IPostCategory {
  _id: string;
  name: string;
}

export interface IPostImage {
  url: string;
  type?: string;
  name?: string;
}

export interface IPost {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  featured?: boolean;
  status?: string;
  createdAt: string;
  updatedAt: string;
  thumbnail?: IPostThumbnail;
  categories: IPostCategory[];
  images: IPostImage[];
}

export interface ICmsPostListResponse {
  cpPostList: {
    totalCount: number;
    posts: IPost[];
  };
}

export interface ICmsPostListVariables {
  type?: string;
  featured?: boolean;
  categoryIds?: string[];
  searchValue?: string;
  status?: string;
  tagIds?: string[];
  sortField?: string;
  sortDirection?: string;
}

export interface ICmsPostDetailResponse {
  cpPostDetail: IPost;
}

export interface ICmsPostDetailVariables {
  id: string;
}

export const cmsPostList = gql`
  query PostList(
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
  ) {
    cpPostList(
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      totalCount
      posts {
        _id
        title
        content
        excerpt
        featured
        status
        createdAt
        updatedAt
        thumbnail {
          url
        }
        categories {
          _id
          name
        }
        images {
          url
          type
          name
        }
      }
    }
  }
`;

export const cmsPostDetail = gql`
  query PostDetail($id: String!) {
    cpPostDetail(_id: $id) {
      _id
      title
      content
      excerpt
      featured
      status
      createdAt
      updatedAt
      thumbnail {
        url
      }
      categories {
        _id
        name
      }
      images {
        url
        type
        name
      }
    }
  }
`;
