"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload, X } from "lucide-react"
import { updateStaff, getStaffById } from "@/app/actions/staffActions"

interface Document {
  documentName: string;
  isOriginal: boolean;
}

export default function EditStaffForm({ staffId }: { staffId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [staffData, setStaffData] = useState<any>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [newDocumentName, setNewDocumentName] = useState("")
  const [isOriginal, setIsOriginal] = useState(false)
  const [roleId, setRoleId] = useState<string>("")
  const [designation, setDesignation] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const data = await getStaffById(staffId)
        console.log('Fetched staff data:', data)
        setStaffData(data)
        
        // Parse documents_collected if it's a string
        let parsedDocuments: Document[] = []
        if (typeof data.documents_collected === 'string') {
          try {
            parsedDocuments = JSON.parse(data.documents_collected)
          } catch (e) {
            console.error('Error parsing documents_collected:', e)
          }
        } else if (Array.isArray(data.documents_collected)) {
          parsedDocuments = data.documents_collected
        }
        
        // Normalize document structure
        const normalizedDocuments = parsedDocuments.map(doc => ({
          documentName: doc.documentName,
          isOriginal: doc.isOriginal
        }))
        
        setDocuments(normalizedDocuments)
        
        setRoleId(data.roleId?.toString() || "")
        setDesignation(data.designation || "")
        setAvatarUrl(data.photo || '')
      } catch (error) {
        console.error('Failed to fetch staff data:', error)
        setError('Failed to load staff data. Please try again.')
      }
    }

    fetchStaffData()
  }, [staffId])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!roleId) {
      setError("Role is required")
      setIsLoading(false)
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    // Remove the documents_collected field from FormData
    formData.delete('documents_collected')

    // Create a plain object with form data and documents
    const updatedStaffData = {
      ...Object.fromEntries(formData),
      staff_id: staffId,
      roleId,
      designation,
      documents_collected: documents,
      photo: avatarUrl
    }

    try {
      const result = await updateStaff(staffId, updatedStaffData)
      if (result.success) {
        router.push('/staff')
      } else {
        setError(result.error || 'Failed to update staff member')
      }
    } catch (error) {
      console.error('Failed to update staff:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const addDocument = () => {
    if (newDocumentName.trim()) {
      setDocuments((prev) => [...prev, { documentName: newDocumentName, isOriginal }])
      setNewDocumentName("")
      setIsOriginal(false)
    }
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setAvatarUrl(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  if (!staffData) {
    return <div>Loading...</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Staff</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive text-destructive rounded">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" name="first_name" defaultValue={staffData.first_name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" name="last_name" defaultValue={staffData.last_name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="staff_id">Staff ID</Label>
              <Input id="staff_id" name="staff_id" defaultValue={staffData.staff_id} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" defaultValue={staffData.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input id="date_of_birth" name="date_of_birth" type="date" defaultValue={staffData.date_of_birth} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" defaultValue={staffData.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" defaultValue={staffData.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleId">Role</Label>
              <Select name="roleId" value={roleId} onValueChange={setRoleId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">SuperAdmin</SelectItem>
                  <SelectItem value="2">Admin</SelectItem>
                  <SelectItem value="3">SubAdmin</SelectItem>
                  <SelectItem value="4">Employee</SelectItem>
                  <SelectItem value="5">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                name="designation"
                placeholder="Enter designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" defaultValue={staffData.address} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" defaultValue={staffData.city} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" defaultValue={staffData.state} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" defaultValue={staffData.country} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input id="postal_code" name="postal_code" defaultValue={staffData.postal_code} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alternate_number">Alternate Phone</Label>
              <Input id="alternate_number" name="alternate_number" type="tel" defaultValue={staffData.alternate_number} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={avatarUrl} alt="Staff photo" />
                    <AvatarFallback>
                      <Upload className="w-12 h-12 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <Input
                      id="photo-upload"
                      name="photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button type="button" variant="outline">
                      {avatarUrl ? "Change Photo" : "Upload Photo"}
                    </Button>
                  </Label>
                  {avatarUrl && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setAvatarUrl("")}
                    >
                      Remove Photo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents Collected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <Input
                      className="flex-grow"
                      value={newDocumentName}
                      onChange={(e) => setNewDocumentName(e.target.value)}
                      placeholder="Document Name"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isOriginal"
                        checked={isOriginal}
                        onCheckedChange={(checked) => setIsOriginal(checked as boolean)}
                      />
                      <Label htmlFor="isOriginal">Original</Label>
                    </div>
                    <Button type="button" onClick={addDocument} variant="secondary">
                      Add Document
                    </Button>
                  </div>
                  {documents.length === 0 && (
                    <p className="text-center text-muted-foreground">No documents added yet.</p>
                  )}
                  <div className="space-y-3 max-h-60 overflow-y-auto p-4 bg-secondary rounded-md">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-background p-3 rounded-md shadow-sm">
                        <span className="font-medium">{doc.documentName} - {doc.isOriginal ? "Original" : "Copy"}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Staff...
              </>
            ) : (
              "Update Staff"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}