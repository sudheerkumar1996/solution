import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { Person } from "shared/models/person"
import moment from "moment"
import { Info } from "shared/models/activity"
import { TableComponent } from "shared/components/Table/table.component"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}))

interface Props {
  enabled: boolean
  handleChange: (id:number) => void
  activity: Info
}
export const ControlledAccordion: React.FC<Props> = (props) => {
  const { activity, handleChange, enabled } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion expanded={enabled} onChange={() => handleChange(activity.id)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography className={classes.heading}>{activity.name}</Typography>
          <Typography className={classes.secondaryHeading}>{moment(activity.completed_at).format("d MMMM YYYY, hh:mm:ss")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableComponent students={activity.students} />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
