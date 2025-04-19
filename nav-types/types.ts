// src/navigation/types.ts
export type todoProps = {
    _id: string;
    title: string;
    description: string;
  };
  
  export type RootStackParamList = {
    Home: undefined;
    'Add Task': { todo?: todoProps };
  };
  