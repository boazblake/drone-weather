import m from 'mithril'
import Task from 'data.task'
import { makeQuery } from './index.js'

const baseUrl = 'http://localhost:3000/'
const online = 'https://jsonplaceholder.typicode.com'

export const postQl = query =>
  new Task((rej, res) =>
    m
      .request({
        method: 'POST',
        url: `${baseUrl}`,
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
        url: `${baseUrl}/${url}`,
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
        url: `${baseUrl}/${url}`,
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
        url: `${baseUrl}/${url}`,
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
        url: `${baseUrl}/${url}/${id}`,
        withCredentials: false,
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res, rej)
  )

export default { postTask, putTask, getTask, deleteTask, postQl }
