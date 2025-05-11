const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const taskService = {
  create: (data: { columnId: string; title: string }) =>
    fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  update: (taskId: string, data: { title?: string; columnId?: string }) =>
    fetch(`${baseUrl}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),

  delete: (taskId: string) =>
    fetch(`${baseUrl}/tasks/${taskId}`, {
      method: 'DELETE'
    }).then(res => res.json())
}
