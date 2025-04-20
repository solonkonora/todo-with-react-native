export type todoProps = {
  _id: string;
  title: string;
  description: string;
};

export type RootStackParamList = {
  Landing: undefined;
  Home: undefined;
  'Add Task': { todo?: todoProps };
};
