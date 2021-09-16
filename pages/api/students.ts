import { NextApiRequest, NextApiResponse } from "next";

import mockStudents from "./mocks/students.json";

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ data: mockStudents });
};
