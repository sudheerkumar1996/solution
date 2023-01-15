import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { useApi } from "shared/hooks/use-api"
import { Activity, Info } from "shared/models/activity"
import { ControlledAccordion } from "staff-app/components/Accordion/accordion.component"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { modifyActivityData } from "shared/helpers/data-generation"

export const ActivityPage: React.FC = () => {
  const [activities, setActivities] = useState<Info[]>([])
  const [getActivities, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })
  useEffect(() => {
    getActivities()
  }, [])

  useEffect(() => {
    setActivities(modifyActivityData(data?.activity || []))
  }, [data])

  console.log(activities)
  const handleChange = (id: number) => {
    setActivities(activities.map((item) => (item.id === id ? { ...item, enable: !item.enable } : { ...item, enable: false })))
  }
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
          activities.map((activity) => <ControlledAccordion handleChange={handleChange} enabled={activity.enable} activity={activity} />)}
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
