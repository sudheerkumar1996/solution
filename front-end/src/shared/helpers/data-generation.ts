import { getRandomInt, generateRange } from "shared/helpers/math-utils"
import { Person, StudentName, PersonHelper } from "shared/models/person"
const nameTokens = ["Alan", "John", "Brandon", "Key", "Branda", "Morris", "Carlos", "Lee"]

export function generateStudent(id: number) {
  return {
    id,
    first_name: nameTokens[getRandomInt(0, nameTokens.length - 1)],
    last_name: nameTokens[getRandomInt(0, nameTokens.length - 1)],
  }
}

export function generateStudents(number: number) {
  return generateRange(number).map((_, id) => generateStudent(id + 1))
}
export const sortHelperFun = (ascending: boolean, students: Person[], name: StudentName) => {
  return ascending ? students.sort((a, b) => (a[name] > b[name] ? 1 : -1)) : students.sort((a, b) => (a[name] < b[name] ? 1 : -1))
}

export const filterStudentByName = (students: Person[], key: string) => {
  return students.filter((student) => PersonHelper.getFullName(student).toLowerCase().includes(key.toLowerCase()))
}
