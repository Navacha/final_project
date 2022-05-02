const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "final",
  password: "guyzawhataluck",
  port: 5432,
});

const insertNewStudent = async (id, firstName, lastName, sex, studyYear) => {
  try {
    await pool.query(
      `INSERT INTO student VALUES ('${id}', '${firstName}', '${lastName}', '${sex}', ${studyYear})`
    );
  } catch (err) {
    console.log(err);
  }
};

const queryStudents = async () => {
  try {
    const result = await pool.query(`SELECT * FROM student`);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const insertNewTeacher = async (id, firstName, lastName, sex, major, age) => {
  try {
    await pool.query(
      `INSERT INTO teacher VALUES ('${id}', '${firstName}', '${lastName}', '${major}', '${sex}', ${age})`
    );
  } catch (err) {
    console.log(err);
  }
};

const queryTeachers = async () => {
  try {
    const result = await pool.query(`SELECT * FROM teacher`);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const deleteTeacher = async (id) => {
  try {
    const result = await pool.query(`DELETE FROM teacher WHERE "id" = '${id}'`);
  } catch (err) {
    console.log(err);
  }
};

const deleteStudent = async (id) => {
  try {
    const result = await pool.query(`DELETE FROM student WHERE "id" = '${id}'`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  insertNewStudent,
  queryStudents,
  insertNewTeacher,
  queryTeachers,
  deleteTeacher,
  deleteStudent,
};
