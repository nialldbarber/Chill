/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  name: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  name: string,
  favouriteExercises?:  Array<Exercise | null > | null,
  notifications?:  Array<Notification | null > | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Exercise = {
  __typename: "Exercise",
  id: string,
  name: string,
  steps: Array< number | null >,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  message: string,
  time: Array< string >,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  name?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateCategoriesInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelCategoriesConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCategoriesConditionInput | null > | null,
  or?: Array< ModelCategoriesConditionInput | null > | null,
  not?: ModelCategoriesConditionInput | null,
};

export type Categories = {
  __typename: "Categories",
  id: string,
  name: string,
  description?: string | null,
  exercises?:  Array<Exercise | null > | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateCategoriesInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteCategoriesInput = {
  id: string,
};

export type CreateExerciseInput = {
  id?: string | null,
  name: string,
  steps: Array< number | null >,
};

export type ModelExerciseConditionInput = {
  name?: ModelStringInput | null,
  steps?: ModelIntInput | null,
  and?: Array< ModelExerciseConditionInput | null > | null,
  or?: Array< ModelExerciseConditionInput | null > | null,
  not?: ModelExerciseConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateExerciseInput = {
  id: string,
  name?: string | null,
  steps?: Array< number | null > | null,
};

export type DeleteExerciseInput = {
  id: string,
};

export type CreateNotificationInput = {
  id?: string | null,
  message: string,
  time: Array< string >,
};

export type ModelNotificationConditionInput = {
  message?: ModelStringInput | null,
  time?: ModelStringInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationInput = {
  id: string,
  message?: string | null,
  time?: Array< string > | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelCategoriesFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCategoriesFilterInput | null > | null,
  or?: Array< ModelCategoriesFilterInput | null > | null,
  not?: ModelCategoriesFilterInput | null,
};

export type ModelCategoriesConnection = {
  __typename: "ModelCategoriesConnection",
  items?:  Array<Categories | null > | null,
  nextToken?: string | null,
};

export type ModelExerciseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  steps?: ModelIntInput | null,
  and?: Array< ModelExerciseFilterInput | null > | null,
  or?: Array< ModelExerciseFilterInput | null > | null,
  not?: ModelExerciseFilterInput | null,
};

export type ModelExerciseConnection = {
  __typename: "ModelExerciseConnection",
  items?:  Array<Exercise | null > | null,
  nextToken?: string | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  time?: ModelStringInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items?:  Array<Notification | null > | null,
  nextToken?: string | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    name: string,
    favouriteExercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    notifications?:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      time: Array< string >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    name: string,
    favouriteExercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    notifications?:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      time: Array< string >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    name: string,
    favouriteExercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    notifications?:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      time: Array< string >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateCategoriesMutationVariables = {
  input: CreateCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type CreateCategoriesMutation = {
  createCategories?:  {
    __typename: "Categories",
    id: string,
    name: string,
    description?: string | null,
    exercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCategoriesMutationVariables = {
  input: UpdateCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type UpdateCategoriesMutation = {
  updateCategories?:  {
    __typename: "Categories",
    id: string,
    name: string,
    description?: string | null,
    exercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCategoriesMutationVariables = {
  input: DeleteCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type DeleteCategoriesMutation = {
  deleteCategories?:  {
    __typename: "Categories",
    id: string,
    name: string,
    description?: string | null,
    exercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateExerciseMutationVariables = {
  input: CreateExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type CreateExerciseMutation = {
  createExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    steps: Array< number | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateExerciseMutationVariables = {
  input: UpdateExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type UpdateExerciseMutation = {
  updateExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    steps: Array< number | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteExerciseMutationVariables = {
  input: DeleteExerciseInput,
  condition?: ModelExerciseConditionInput | null,
};

export type DeleteExerciseMutation = {
  deleteExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    steps: Array< number | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    time: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    time: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    time: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    name: string,
    favouriteExercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    notifications?:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      time: Array< string >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      username: string,
      name: string,
      favouriteExercises?:  Array< {
        __typename: "Exercise",
        id: string,
        name: string,
        steps: Array< number | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      notifications?:  Array< {
        __typename: "Notification",
        id: string,
        message: string,
        time: Array< string >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCategoriesQueryVariables = {
  id: string,
};

export type GetCategoriesQuery = {
  getCategories?:  {
    __typename: "Categories",
    id: string,
    name: string,
    description?: string | null,
    exercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCategoriessQueryVariables = {
  filter?: ModelCategoriesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriessQuery = {
  listCategoriess?:  {
    __typename: "ModelCategoriesConnection",
    items?:  Array< {
      __typename: "Categories",
      id: string,
      name: string,
      description?: string | null,
      exercises?:  Array< {
        __typename: "Exercise",
        id: string,
        name: string,
        steps: Array< number | null >,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetExerciseQueryVariables = {
  id: string,
};

export type GetExerciseQuery = {
  getExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    steps: Array< number | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListExercisesQueryVariables = {
  filter?: ModelExerciseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExercisesQuery = {
  listExercises?:  {
    __typename: "ModelExerciseConnection",
    items?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    time: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items?:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      time: Array< string >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    name: string,
    favouriteExercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    notifications?:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      time: Array< string >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    name: string,
    favouriteExercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    notifications?:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      time: Array< string >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    name: string,
    favouriteExercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    notifications?:  Array< {
      __typename: "Notification",
      id: string,
      message: string,
      time: Array< string >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateCategoriesSubscription = {
  onCreateCategories?:  {
    __typename: "Categories",
    id: string,
    name: string,
    description?: string | null,
    exercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCategoriesSubscription = {
  onUpdateCategories?:  {
    __typename: "Categories",
    id: string,
    name: string,
    description?: string | null,
    exercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCategoriesSubscription = {
  onDeleteCategories?:  {
    __typename: "Categories",
    id: string,
    name: string,
    description?: string | null,
    exercises?:  Array< {
      __typename: "Exercise",
      id: string,
      name: string,
      steps: Array< number | null >,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateExerciseSubscription = {
  onCreateExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    steps: Array< number | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateExerciseSubscription = {
  onUpdateExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    steps: Array< number | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteExerciseSubscription = {
  onDeleteExercise?:  {
    __typename: "Exercise",
    id: string,
    name: string,
    steps: Array< number | null >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    time: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    time: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    message: string,
    time: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
