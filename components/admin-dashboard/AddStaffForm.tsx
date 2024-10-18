"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload, X } from "lucide-react"
import { addStaff } from "@/app/actions/staffActions"

export default function AddStaffForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [staffId, setStaffId] = useState("")
  const [documents, setDocuments] = useState<{ documentName: string; isOriginal: boolean }[]>([])
  const [newDocumentName, setNewDocumentName] = useState("")
  const [isOriginal, setIsOriginal] = useState(false)
  const [roleId, setRoleId] = useState<string>("")
  const [designation, setDesignation] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

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
    const staffData = {
      ...Object.fromEntries(formData),
      staff_id: staffId,
      roleId,
      designation,
      documents_collected: documents,
      photo: avatarUrl
    }

    try {
      const result = await addStaff(staffData)
      if (result.success) {
        router.push('/staff')
      } else {
        setError(result.error || 'Failed to add staff member')
      }
    } catch (error) {
      console.error('Failed to add staff:', error)
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Staff</CardTitle>
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
              <Input id="first_name" name="first_name" placeholder="Enter first name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" name="last_name" placeholder="Enter last name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="staff_id">Staff ID</Label>
              <Input
                id="staff_id"
                name="staff_id"
                placeholder="Enter staff ID"
                value={staffId} 
                onChange={(e) => setStaffId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" required>
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
              <Input id="date_of_birth" name="date_of_birth" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="Enter email address" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="Enter phone number" required />
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" placeholder="Enter address" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="Enter city" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" placeholder="Enter state" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" placeholder="Enter country" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input id="postal_code" name="postal_code" placeholder="Enter postal code" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alternate_number">Alternate Phone</Label>
              <Input id="alternate_number" name="alternate_number" type="tel" placeholder="Alternate phone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" required />
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
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
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
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded">
                        <span>{doc.documentName} - {doc.isOriginal ? "Original" : "Copy"}</span>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Staff...
              </>
            ) : (
              "Add Staff"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}