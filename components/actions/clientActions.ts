'use server'

const API_BASE_URL = 'http://localhost:3001' // Replace with your actual backend URL

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}

export async function getAllClients() {
  const apiResponse = await fetchAPI('/clients')
  return apiResponse.data
}

export async function addClient(clientData: any) {
  const apiResponse = await fetchAPI('/clients', {
    method: 'POST',
    body: JSON.stringify(clientData),
  })
  return apiResponse.data
}

export async function updateClient(clientId: number, clientData: any) {
  const apiResponse = await fetchAPI(`/clients/${clientId}`, {
    method: 'PUT',
    body: JSON.stringify(clientData),
  })
  return apiResponse.data
}

export async function deleteClient(clientId: number) {
  const apiResponse = await fetchAPI(`/clients/${clientId}`, {
    method: 'DELETE',
  })
  return apiResponse.data
}