export interface Roll {
  id: number
  name: string
  completed_at: Date
  student_roll_states: { student_id: number; roll_state: RolllStateType; first_name: string; last_name: string; photo_url?: string }[]
}

export interface RollInput {
  student_roll_states: { student_id: number; roll_state?: RolllStateType; first_name: string; last_name: string; photo_url?: string }[]
}

export type RolllStateType = "unmark" | "present" | "absent" | "late"
export type ItemType = RolllStateType | "all"
