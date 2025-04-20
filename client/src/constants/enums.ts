export enum EUserRole {
    ADMIN = "ADMIN",
    USER = "USER",
  }
  
  export enum EAuthProvider {
    EMAIL = "EMAIL",
    GOOGLE = "GOOGLE",
  }
  
  export enum EBlogStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED",
  }
  
  export enum EHttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
  }
  
  export enum EApiStatus {
    IDLE = "IDLE",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
  }