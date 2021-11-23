/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      name
      favouriteExercises {
        items {
          id
          name
          steps
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      notifications {
        items {
          id
          message
          time
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      name
      favouriteExercises {
        items {
          id
          name
          steps
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      notifications {
        items {
          id
          message
          time
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      name
      favouriteExercises {
        items {
          id
          name
          steps
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      notifications {
        items {
          id
          message
          time
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCategories = /* GraphQL */ `
  subscription OnCreateCategories {
    onCreateCategories {
      id
      name
      description
      exercises {
        items {
          id
          name
          steps
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCategories = /* GraphQL */ `
  subscription OnUpdateCategories {
    onUpdateCategories {
      id
      name
      description
      exercises {
        items {
          id
          name
          steps
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCategories = /* GraphQL */ `
  subscription OnDeleteCategories {
    onDeleteCategories {
      id
      name
      description
      exercises {
        items {
          id
          name
          steps
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise {
    onCreateExercise {
      id
      name
      steps
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise {
    onUpdateExercise {
      id
      name
      steps
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise {
    onDeleteExercise {
      id
      name
      steps
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      message
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      message
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      message
      time
      createdAt
      updatedAt
      owner
    }
  }
`;
