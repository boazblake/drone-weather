import m from 'mithril'
import Task from 'data.task'
import { makeQuery } from './index.js'

const baseUrl = 'http://localhost:4466/'
const onlineUrl =
  'https://eu1.prisma.sh/boaz-blake-8951e1/mithril-presenter/dev'

export const postQl = query =>
  new Task((rej, res) =>
    m
      .request({
        method: 'POST',
        url: `${onlineUrl}`,
        withCredentials: false,
        data: makeQuery(query),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res, rej)
  )

const postTask = url => ({ dto }) =>
  new Task((rej, res) =>
    m
      .request({
        method: 'POST',
        url: `${onlineUrl}/${url}`,
        data: dto,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res, rej)
  )

const putTask = url => ({ dto }) =>
  new Task((rej, res) =>
    m
      .request({
        method: 'PUT',
        url: `${onlineUrl}/${url}`,
        data: dto,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res, rej)
  )

const getTask = url =>
  new Task((rej, res) =>
    m
      .request({
        method: 'GET',
        url: `${onlineUrl}/${url}`,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res, rej)
  )

const deleteTask = url => id =>
  new Task((rej, res) =>
    m
      .request({
        method: 'DELETE',
        url: `${onlineUrl}/${url}/${id}`,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res, rej)
  )

export default { postTask, putTask, getTask, deleteTask, postQl }
