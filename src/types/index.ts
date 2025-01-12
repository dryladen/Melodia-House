export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type Payment = {
  id: number;
  payment_id: string;
  currency: string;
  rate: number;
  payment_date: string;
};

export type Student = {
  id: number;
  students_id: User;
};

export type Teacher = {
  id: number;
  teachers_id: User;
};

export type Instrument = {
  id: number;
  name: string;
  students: Student[];
  teachers: Teacher[];
};

// id: 11458,
// status: 'draft',
// user_created: '12cb980d-7e07-4bfb-b30e-7a083aea6b48',
// date_created: '2024-12-22T08:48:16.199Z',
// user_updated: null,
// date_updated: null,
// name: 'Standard',
// start_datetime: '2024-05-20T04:11:11.103Z',
// end_datetime: '2024-10-18T09:50:51.305Z',
// student: '2ec086e7-7587-491c-bd13-9e30f9f7baa6',
// duration: 90,
// remarks: null,
// instrument: 9,
// lessons_quota: 18,
// lessons: [
//   432791, 432792, 432793,
//   432794, 432795, 432796,
//   432797, 432798, 432799,
//   432800, 432801, 432802,
//   432803, 432804, 432805,
//   432806, 432807, 432808
// ],
// payments: [ 11055 ]

export type Lesson = {
  id: number;
  status: "attended" | "absent";
  remarks: string;
  start_datetime: string;
  teacher: User;
  package: number;
};
export type Package = {
  id: number;
  status: "draft" | "archived" | "published";
  name: string;
  duration: number;
  start_datetime: string;
  end_datetime: string;
  lessons_quota: number;
  remarks: string;
  instrument: {
    id: number;
    name: string;
  };
  student: User;
  lessons: Lesson[];
  payments: Payment[];
};
