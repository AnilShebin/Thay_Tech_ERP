"use server"

const API_BASE_URL = "https://erp-backend-v1.onrender.com" // Replace with your actual backend URL

interface CompanyData {
  [key: string]: any
}

interface ApiResponse {
  company_logo: string
  success: boolean
  data?: any
  error?: string
}

async function fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}

export async function getAllCompanies(): Promise<ApiResponse> {
  try {
    const apiResponse = await fetchAPI("/companies")
    return { success: true, company_logo: apiResponse.company_logo, data: apiResponse.data }
  } catch (error) {
    console.error("Error fetching companies:", error)
    return { success: false, company_logo: "", error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getCompanyById(companyId: number): Promise<ApiResponse> {
  try {
    const apiResponse = await fetchAPI(`/companies/${companyId}`)
    return { success: true, company_logo: apiResponse.company_logo, data: apiResponse.data }
  } catch (error) {
    console.error(`Error fetching company ${companyId}:`, error)
    return { success: false, company_logo: "", error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function addCompany(companyData: CompanyData): Promise<ApiResponse> {
  try {
    const apiResponse = await fetchAPI("/companies", {
      method: "POST",
      body: JSON.stringify(companyData),
    })
    return { success: true, company_logo: apiResponse.company_logo, data: apiResponse.data }
  } catch (error) {
    console.error("Error adding company:", error)
    return { success: false, company_logo: "", error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function updateCompany(companyId: number, companyData: CompanyData): Promise<ApiResponse> {
  try {
    const apiResponse = await fetchAPI(`/companies/${companyId}`, {
      method: "PUT",
      body: JSON.stringify(companyData),
    })
    return { success: true, company_logo: apiResponse.company_logo, data: apiResponse.data }
  } catch (error) {
    console.error(`Error updating company ${companyId}:`, error)
    return { success: false, company_logo: "", error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function deleteCompany(companyId: number): Promise<ApiResponse> {
  try {
    const apiResponse = await fetchAPI(`/companies/${companyId}`, {
      method: "DELETE",
    })
    return { success: true, company_logo: apiResponse.company_logo, data: apiResponse.data }
  } catch (error) {
    console.error(`Error deleting company ${companyId}:`, error)
    return { success: false, company_logo: "", error: error instanceof Error ? error.message : "Unknown error" }
  }
}