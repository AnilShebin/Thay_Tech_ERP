'use server'

import { revalidatePath } from 'next/cache'

const API_BASE_URL = 'http://localhost:3001'

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
    console.error(`API request failed: ${response.statusText}`)
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}

export async function getCompanies() {
  try {
    const apiResponse = await fetchAPI('/companies', { cache: 'no-store' })

    if (Array.isArray(apiResponse)) {
      return apiResponse
    } else if (apiResponse && typeof apiResponse === 'object') {
      if (Array.isArray(apiResponse.data)) {
        return apiResponse.data
      } else if (apiResponse.companies && Array.isArray(apiResponse.companies)) {
        return apiResponse.companies
      }
    }

    console.error('Invalid API response structure:', apiResponse)
    return []
  } catch (error) {
    console.error('Error fetching companies:', error)
    return []
  }
}

export async function addCompany(companyData: any) {
  try {
    const apiResponse = await fetchAPI('/companies', {
      method: 'POST',
      body: JSON.stringify(companyData),
    })

    revalidatePath('/client-companies')
    return { success: true, data: apiResponse }
  } catch (error) {
    console.error('Error adding company:', error)
    return { success: false, error: 'Failed to add company' }
  }
}

export async function updateCompany(companyId: string, companyData: any) {
  try {
    const apiResponse = await fetchAPI(`/companies/${companyId}`, {
      method: 'PUT',
      body: JSON.stringify(companyData),
    })

    revalidatePath('/client-companies')
    return { success: true, data: apiResponse }
  } catch (error) {
    console.error('Error updating company:', error)
    return { success: false, error: 'Failed to update company' }
  }
}

export async function getCompanyById(companyId: string) {
  try {
    const apiResponse = await fetchAPI(`/companies/${companyId}`, { cache: 'no-store' })

    if (apiResponse && typeof apiResponse === 'object') {
      if (apiResponse.data) {
        return apiResponse.data
      } else if (apiResponse.company) {
        return apiResponse.company
      } else if (Object.keys(apiResponse).length > 0) {
        return apiResponse
      }
    }

    throw new Error('Invalid data structure received from API')
  } catch (error) {
    console.error('Error fetching company by ID:', error)
    throw error
  }
}

export async function deleteCompany(companyId: string) {
  try {
    const apiResponse = await fetchAPI(`/companies/${companyId}`, {
      method: 'DELETE',
    })

    revalidatePath('/client-companies')
    return { success: true, data: apiResponse }
  } catch (error) {
    console.error('Error deleting company:', error)
    return { success: false, error: 'Failed to delete company' }
  }
}