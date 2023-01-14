import { RolllStateType } from "./roll"

export interface Person {
  id: number
  first_name: string
  last_name: string
  photo_url?: string
  status?: RolllStateType
}

export const PersonHelper = {
  getFullName: (p: Person) => `${p.first_name} ${p.last_name}`,
}
export type StudentName = "first_name" | "last_name"
