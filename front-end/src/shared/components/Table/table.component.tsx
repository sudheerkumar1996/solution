import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { Person, PersonHelper } from "shared/models/person"
import Typography from "@material-ui/core/Typography/Typography"
import Avatar from "@material-ui/core/Avatar"
import Pagination from "@material-ui/lab/Pagination"

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  customPagination: {
    width: "fit-content",
    marginLeft: "auto",
    marginTop: "5px",
    "& .MuiPaginationItem-page.Mui-selected": {
      border: "0.5px solid #707070",
      margin: "0 10px",
      height: 35,
      width: 30,
      padding: "10px 13px",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 3px 10px #5757571a",
      lineHeight: 1,
      borderRadius: 5,
      opacity: 1,
    },
    "& .MuiPaginationItem-page": {
      font: "normal normal normal 14px/19px Nunito Sans",
      letterSpacing: 0,
      color: "#000000",
      opacity: 0.6,
    },
  },
}))

interface Props {
  students: Person[]
}

export const TableComponent: React.FC<Props> = ({ students }) => {
  const [masterdata, setMasterdata] = useState<Person[]>(students)
  const [page, setPage] = useState(1)
  const [data, setData] = useState(students.slice((page - 1) * 5, (page - 1) * 5 + 5) || [])
  useEffect(() => {
    setMasterdata([...students])
    let newdata = [...students].slice((page - 1) * 5, (page - 1) * 5 + 5)

    if (newdata.length === 0) {
      let firstPageData = [...students].slice(0, 5)
      setPage(1)
      setData(firstPageData)
    } else {
      setData(newdata)
    }
  }, [page, students])

  const onChange = (e: any, pageno: number) => {
    setPage(pageno)
  }

  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Roll</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left" style={{ display: "flex", alignItems: "center" }}>
                <Avatar className={classes.small}>{PersonHelper.getFullName(row)[0]}</Avatar>
                <span style={{ paddingLeft: 5 }}>{PersonHelper.getFullName(row)}</span>
              </TableCell>
              <TableCell align="left">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.customPagination}>
        <Pagination count={Math.ceil(masterdata.length / 5)} page={page} onChange={onChange} shape="rounded" showFirstButton showLastButton />
      </div>
    </TableContainer>
  )
}
