import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"
import { Activity, Info } from "shared/models/activity"
import { ControlledAccordion } from "staff-app/components/Accordion/accordion.component"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<Info[]>([])
  const [getActivities, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })
  useEffect(() => {
    getActivities()
  }, [])

  useEffect(() => {
    let data_ = [...(data?.activity || [])]
    let modifiedData: Info[] = data_.map((item) => {
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
    setActivities(modifiedData)
  }, [data])

  console.log(activities)
  const handleChange = () => {}
  return (
    <S.Container>
      <div>
        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}
        {loadState === "loaded" &&
          data?.activity &&
          activities.map((activity, index) =>
           <ControlledAccordion
            key={activity.id}
             handleChange={handleChange}
              enabled={activity.enable} 
              activity={activity} />)}
      </div>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
