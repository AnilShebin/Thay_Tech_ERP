'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Upload, Building, Phone, CreditCard, User, FileText } from "lucide-react"
import { addCompany } from "@/app/actions/companyActions"

export default function AddClientCompanyForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [logoUrl, setLogoUrl] = useState("")

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const companyData = {
      ...Object.fromEntries(formData),
      company_logo: logoUrl
    }

    try {
      const result = await addCompany(companyData)
      if (result.success) {
        router.push('/client-companies')
        router.refresh()
      } else {
        setError(result.error || 'Failed to add company')
      }
    } catch (error) {
      console.error('Failed to add company:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setLogoUrl(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <Avatar className="w-32 h-32 border-4 border-blue-200">
              <AvatarImage src={logoUrl} alt="Company logo" />
              <AvatarFallback>
                <Upload className="w-12 h-12 text-blue-500" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <h2 className="text-xl font-semibold">Company Logo</h2>
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <Input
                  id="logo-upload"
                  name="company_logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button type="button" variant="outline">
                  {logoUrl ? "Change Logo" : "Upload Logo"}
                </Button>
              </Label>
              {logoUrl && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setLogoUrl("")}
                >
                  Remove Logo
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="company-info" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {['company-info', 'contact-info', 'financial-info', 'manager-info', 'additional-info'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
                >
                  {tab === 'company-info' && <Building className="h-5 w-5" />}
                  {tab === 'contact-info' && <Phone className="h-5 w-5" />}
                  {tab === 'financial-info' && <CreditCard className="h-5 w-5" />}
                  {tab === 'manager-info' && <User className="h-5 w-5" />}
                  {tab === 'additional-info' && <FileText className="h-5 w-5" />}
                  <span>{tab.split('-')[0].charAt(0).toUpperCase() + tab.split('-')[0].slice(1)}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-6">
              <TabsContent value="company-info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input id="company_name" name="company_name" placeholder="Enter company name" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="short_name">Short Name</Label>
                    <Input id="short_name" name="short_name" placeholder="Enter short name" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_type">Company Type</Label>
                    <Input id="company_type" name="company_type" placeholder="Enter company type" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch_office">Branch Office</Label>
                    <Input id="branch_office" name="branch_office" placeholder="Enter branch office" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="head_office">Head Office</Label>
                    <Input id="head_office" name="head_office" placeholder="Enter head office" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" name="pincode" placeholder="Enter pincode" className="w-full" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" placeholder="Enter address" className="min-h-[100px] w-full" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contact-info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mobile_no">Mobile Number</Label>
                    <Input id="mobile_no" name="mobile_no" type="tel" placeholder="Enter mobile number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternate_no">Alternate Number</Label>
                    <Input id="alternate_no" name="alternate_no" type="tel" placeholder="Enter alternate number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landline_no">Landline Number</Label>
                    <Input id="landline_no" name="landline_no" type="tel" placeholder="Enter landline number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email_id">Email ID</Label>
                    <Input id="email_id" name="email_id" type="email" placeholder="Enter email ID" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="web_address">Web Address</Label>
                    <Input id="web_address" name="web_address" type="url" placeholder="Enter web address" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" name="facebook" type="url" placeholder="Enter Facebook URL" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input id="twitter" name="twitter" type="url" placeholder="Enter Twitter URL" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" name="linkedin" type="url" placeholder="Enter LinkedIn URL" className="w-full" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="financial-info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="frn_no">FRN Number</Label>
                    <Input id="frn_no" name="frn_no" placeholder="Enter FRN number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frn_date">FRN Date</Label>
                    <Input id="frn_date" name="frn_date" type="date" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_code_prefix">Client Code Prefix</Label>
                    <Input id="client_code_prefix" name="client_code_prefix" placeholder="Enter client code prefix" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoice_prefix">Invoice Prefix</Label>
                    <Input id="invoice_prefix" name="invoice_prefix" placeholder="Enter invoice prefix" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" name="currency" placeholder="Enter currency" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sms_balance">SMS Balance</Label>
                    <Input id="sms_balance" name="sms_balance" type="number" placeholder="Enter SMS balance" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label  htmlFor="pan_no">PAN Number</Label>
                    <Input id="pan_no" name="pan_no" placeholder="Enter PAN number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gstin">GSTIN</Label>
                    <Input id="gstin" name="gstin" placeholder="Enter GSTIN" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank_name">Bank Name</Label>
                    <Input id="bank_name" name="bank_name" placeholder="Enter bank name" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Bank Branch</Label>
                    <Input id="branch" name="branch" placeholder="Enter bank branch" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account_holder_name">Account Holder Name</Label>
                    <Input id="account_holder_name" name="account_holder_name" placeholder="Enter account holder name" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account_no">Account Number</Label>
                    <Input id="account_no" name="account_no" placeholder="Enter account number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifsc_code">IFSC Code</Label>
                    <Input id="ifsc_code" name="ifsc_code" placeholder="Enter IFSC code" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank_pan_no">Bank PAN Number</Label>
                    <Input id="bank_pan_no" name="bank_pan_no" placeholder="Enter bank PAN number" className="w-full" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manager-info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="manager_name">Manager Name</Label>
                    <Input id="manager_name" name="manager_name" placeholder="Enter manager name" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager_designation">Manager Designation</Label>
                    <Input id="manager_designation" name="manager_designation" placeholder="Enter manager designation" className="w-full" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="manager_address">Manager Address</Label>
                    <Textarea id="manager_address" name="manager_address" placeholder="Enter manager address" className="min-h-[100px] w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager_dob">Manager Date of Birth</Label>
                    <Input id="manager_dob" name="manager_dob" type="date" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager_contact_no">Manager Contact Number</Label>
                    <Input id="manager_contact_no" name="manager_contact_no" type="tel" placeholder="Enter manager contact number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager_email_id">Manager Email ID</Label>
                    <Input id="manager_email_id" name="manager_email_id" type="email" placeholder="Enter manager email ID" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incharge_for">In Charge For</Label>
                    <Input id="incharge_for" name="incharge_for" placeholder="Enter in charge for" className="w-full" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="additional-info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="membership_no">Membership Number</Label>
                    <Input id="membership_no" name="membership_no" placeholder="Enter membership number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_of_admission">Date of Admission</Label>
                    <Input id="date_of_admission" name="date_of_admission" type="date" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_of_retirement">Date of Retirement</Label>
                    <Input id="date_of_retirement" name="date_of_retirement" type="date" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="family_person_name">Family Person Name</Label>
                    <Input id="family_person_name" name="family_person_name" placeholder="Enter family person name" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="family_relationship">Family Relationship</Label>
                    <Input id="family_relationship" name="family_relationship" placeholder="Enter family relationship" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="family_contact_no">Family Contact Number</Label>
                    <Input id="family_contact_no" name="family_contact_no" type="tel" placeholder="Enter family contact number" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="family_anniversary_date">Family Anniversary Date</Label>
                    <Input id="family_anniversary_date" name="family_anniversary_date" type="date" className="w-full" />
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Company...
              </>
            ) : (
              "Add Company"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}