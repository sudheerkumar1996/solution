import { Roll } from "shared/models/roll"
import { Person } from "./person"
import { RolllStateType } from "./roll"

export interface Activity {
  type: "roll"
  date: Date
  entity: Roll
}

export interface Info {
  id: number
  name?: string
  completed_at: Date
  students: Person[]
  enable: boolean
}
