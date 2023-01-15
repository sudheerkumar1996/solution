import { getRandomInt, generateRange } from "shared/helpers/math-utils"
import { Info, Activity } from "shared/models/activity"
import { Person, StudentName, PersonHelper } from "shared/models/person"
import { RollInput } from "shared/models/roll"
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

export const completedRoll = (allStudents: Person[]) => {
  let payload: RollInput = { student_roll_states: [] }
  payload["student_roll_states"] = allStudents
    .filter((f) => f.status === "late" || f.status === "absent" || f.status === "present")
    .map((std) => {
      return {
        student_id: std.id,
        roll_state: std.status,
        first_name: std.first_name,
        last_name: std.last_name,
        photo_url: std.photo_url,
      }
    })
  return payload
}

export const modifyActivityData = (activity: Activity[]) => {
  let data: Info[] = activity.map((item) => {
    return {
      completed_at: item.entity.completed_at,
      name: item.entity.name,
      id: item.entity.id,
      enable: false,
      students: item.entity.student_roll_states.map((std) => ({
        id: std.student_id,
        first_name: std.first_name,
        last_name: std.last_name,
        photo_url: std.photo_url,
        status: std.roll_state,
      })),
    }
  })
  return data
}
