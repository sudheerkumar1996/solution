import { Person } from "shared/models/person"
type StudentsState = {
  students: Person[]
}
type ArticleAction = {
    type: string
    article: IArticle
  }