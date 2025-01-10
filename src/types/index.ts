export type Instrument = {
  id: number;
  name: string;
  students: {
    id: number;
    students_id?: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  }[];
  teachers: {
    id: number;
    students_id?: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  }[];
};
