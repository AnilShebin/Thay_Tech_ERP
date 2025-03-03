'use server'

import { revalidatePath } from 'next/cache'

const API_BASE_URL = 'https://erp-backend-v1.onrender.com'

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

export async function getStaff() {
  const apiResponse = await fetchAPI('/staff', { cache: 'no-store' })
  
  if (!apiResponse.success || !Array.isArray(apiResponse.data)) {
    throw new Error('Invalid data structure received from API')
  }

  return apiResponse.data
}

export async function addStaff(staffData: any) {
  const apiResponse = await fetchAPI('/staff', {
    method: 'POST',
    body: JSON.stringify(staffData),
  })

  revalidatePath('/staff')
  return apiResponse
}

export async function updateStaff(staffId: string, staffData: any) {
  const apiResponse = await fetchAPI(`/staff/${staffId}`, {
    method: 'PUT',
    body: JSON.stringify(staffData),
  })

  revalidatePath('/staff')
  return apiResponse
}

export async function getStaffById(staffId: string) {
  const apiResponse = await fetchAPI(`/staff/${staffId}`, { cache: 'no-store' })

  if (!apiResponse.success || !apiResponse.data) {
    throw new Error('Invalid data structure received from API')
  }

  return apiResponse.data
}

export async function deleteStaff(staffId: string) {
  const apiResponse = await fetchAPI(`/staff/${staffId}`, {
    method: 'DELETE',
  })

  revalidatePath('/staff')
  return apiResponse
}

export async function getTotalStaffCount() {
  const staffData = await getStaff()
  return staffData.length
}

export async function getPreviousTotalStaffCount() {
  // This is a placeholder. In a real-world scenario, you'd fetch this from your API
  // For now, we'll return a mock value
  return 5
}