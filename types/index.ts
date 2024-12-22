export type Task = {
  client: string | null
  created_at: string
  created_by: string | null
  description: string | null
  due_date: string | null
  id: string
  name: string
  project: {
    id: string
    name: string
  } | null
  status: {
    id: string
    name: string
    color: string
  }
  workspace: {
    id: string
    domain: string
  }
}

export type TaskStatus = {
  id: string
  name: string
  color: string
  workspace: {
    id: string
    domain: string
  }
}

export type TaskComment = {
  created_at: string
  id: string
  message: string
  task: string
  user: {
    name: string | null
    email: string
    avatar: string | null
  }
  workspace: {
    domain: string
  }
}

export type TaskFile = {
  created_at: string
  file: {
    path: string
    image_width: number | null
    image_height: number | null
  }
  id: string
  task: string
  version: number
  workspace: {
    domain: string
  }
}

export type TaskFileVersion = {
  id: string
  version: number
  workspace: {
    domain: string
  }
}
