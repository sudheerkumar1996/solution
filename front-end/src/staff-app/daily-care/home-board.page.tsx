import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import InputBase from "@material-ui/core/InputBase"

import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person, PersonHelper, StudentName } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import { filterStudentByName, sortHelperFun } from "shared/helpers/data-generation"
export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [searchKey, setKey] = useState<string>("")
  const [name, setName] = useState<StudentName>("first_name")
  const [ascending, setAscending] = useState<boolean>(true)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [allStudents, setStudents] = useState<Person[]>([])
  useEffect(() => {
    void getStudents()
  }, [getStudents])
  useEffect(() => {
    let students_ = data?.students || []
    setStudents(students_.sort((a, b) => (a.first_name > b.first_name ? 1 : -1)))
  }, [data])

  const onToolbarAction = (action: ToolbarAction, value: StudentName) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
    if (action === "sort") {
      setStudents(sortHelperFun(!ascending, allStudents, name))
      setAscending(!ascending)
    }
    if (action === "toggle") {
      setStudents(sortHelperFun(ascending, allStudents, value))
      setName(value)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }
  const onSearchName = (key: string) => {
    setKey(key)
    let all_students: Person[] = [...(data?.students || [])]
    if (key.trim().length !== 0) {
      setStudents(sortHelperFun(ascending, filterStudentByName(all_students, key), name))
    } else {
      setStudents(sortHelperFun(ascending, all_students, name))
    }
  }
  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} ascending={ascending} name={name} searchKey={searchKey} onSearchName={onSearchName} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {allStudents.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort" | "toggle"
interface ToolbarProps {
  ascending: boolean
  name: StudentName
  onItemClick: (action: ToolbarAction, value: StudentName) => void
  searchKey: string
  onSearchName: (key: string) => void
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, ascending, name, searchKey, onSearchName } = props
  return (
    <S.ToolbarContainer>
      <div
        onClick={() => {
          onItemClick("sort", name)
        }}
      >
        {" "}
        {ascending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </div>
      <RadioGroup row aria-label="first-last-name" name="first-last-name" onChange={(e) => onItemClick("toggle", e.target.value)} value={name}>
        <FormControlLabel value="first_name" control={<Radio size="small" />} label="First Name" />
        <FormControlLabel value="last_name" control={<Radio size="small" />} label="Last Name" />
      </RadioGroup>

      <S.TextField
        value={searchKey}
        onChange={(e) => {
          onSearchName(e.target.value)
        }}
        placeholder="Search"
      />

      <S.Button onClick={() => onItemClick("roll", name)}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
  TextField: styled(InputBase)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.normal};
      border-radius: ${BorderRadius.default};
      background-color: white;
      height: 30px;
      width: 100px;
      margin: 0;
    }
  `,
}
