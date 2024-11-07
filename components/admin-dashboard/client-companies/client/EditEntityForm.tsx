'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react'
import { format } from "date-fns"
import { ClientData, BankDetail } from './types'

type EditEntityFormProps = {
  entity: ClientData
  onSubmit: (updatedEntity: ClientData) => void
}

export function EditEntityForm({ entity, onSubmit }: EditEntityFormProps) {
  const [editedEntity, setEditedEntity] = useState<ClientData>(entity)
  const [bankDetails, setBankDetails] = useState<BankDetail[]>(() => {
    try {
      return JSON.parse(entity.bankDetails);
    } catch (error) {
      console.error("Error parsing bank details:", error);
      return [];
    }
  })

  const entityFields: Record<ClientData['clientType'], string[]> = {
    Individual: ['name', 'panNumber', 'gstin', 'registeredOfficeAddress', 'communicationAddress', 'city', 'state', 'pincode', 'mobileNo', 'alternateMobileNo', 'email'],
    PrivateLimitedCompany: ['name', 'panNumber', 'gstin', 'registeredOfficeAddress', 'communicationAddress', 'city', 'state', 'pincode', 'mobileNo', 'alternateMobileNo', 'email'],
    LimitedCompany: ['name', 'panNumber', 'gstin', 'registeredOfficeAddress', 'communicationAddress', 'city', 'state', 'pincode', 'mobileNo', 'alternateMobileNo', 'email'],
    Trust: ['name', 'panNumber', 'gstin', 'registeredOfficeAddress', 'communicationAddress', 'city', 'state', 'pincode', 'mobileNo', 'alternateMobileNo', 'email'],
    LLP: ['name', 'panNumber', 'gstin', 'registeredOfficeAddress', 'communicationAddress', 'city', 'state', 'pincode', 'mobileNo', 'alternateMobileNo', 'email'],
    PartnershipFirm: ['name', 'panNumber', 'gstin', 'registeredOfficeAddress', 'communicationAddress', 'city', 'state', 'pincode', 'mobileNo', 'alternateMobileNo', 'email'],
    HUF: ['name', 'panNumber', 'gstin', 'registeredOfficeAddress', 'communicationAddress', 'city', 'state', 'pincode', 'mobileNo', 'alternateMobileNo', 'email'],
  }

  const specificFields: Record<ClientData['clientType'], string[]> = {
    Individual: ['firstName', 'middleName', 'lastName', 'businessName', 'dateOfBusinessStarting', 'groupName'],
    PrivateLimitedCompany: ['dateOfIncorporation', 'cinNumber', 'tanNumber', 'authorizedCapital', 'issuedCapital', 'paidUpCapital'],
    LimitedCompany: ['dateOfIncorporation', 'cinNumber', 'tanNumber', 'authorizedCapital', 'issuedCapital', 'paidUpCapital'],
    Trust: ['dateOfIncorporation', 'trustees'],
    LLP: ['dateOfIncorporation', 'frn', 'partners'],
    PartnershipFirm: ['dateOfIncorporation', 'partners'],
    HUF: ['dateOfIncorporation', 'members'],
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedEntity(prev => {
      const updated = { ...prev }
      if (entityFields[prev.clientType].includes(field)) {
        updated[field] = value
      } else {
        switch (prev.clientType) {
          case 'Individual':
            updated.individual = { ...updated.individual, [field]: value }
            break
          case 'PrivateLimitedCompany':
          case 'LimitedCompany':
            updated.company = { ...updated.company, [field]: value }
            break
          case 'Trust':
            updated.trust = { ...updated.trust, [field]: value }
            break
          case 'LLP':
          case 'PartnershipFirm':
            updated.partnership = { ...updated.partnership, [field]: value }
            break
          case 'HUF':
            updated.huf = { ...updated.huf, [field]: value }
            break
        }
      }
      return updated
    })
  }

  const handleBankDetailChange = (index: number, field: keyof BankDetail, value: string) => {
    const updatedBankDetails = [...bankDetails]
    updatedBankDetails[index] = { ...updatedBankDetails[index], [field]: value }
    setBankDetails(updatedBankDetails)
  }

  const addBankDetail = () => {
    setBankDetails([...bankDetails, { bankName: '', accountNumber: '', ifscCode: '' }])
  }

  const removeBankDetail = (index: number) => {
    const updatedBankDetails = [...bankDetails]
    updatedBankDetails.splice(index, 1)
    setBankDetails(updatedBankDetails)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedEntity = {
      ...editedEntity,
      bankDetails: JSON.stringify(bankDetails)
    }
    onSubmit(updatedEntity)
  }

  const getSpecificFieldValue = (field: string) => {
    switch (editedEntity.clientType) {
      case 'Individual':
        return editedEntity.individual[field as keyof typeof editedEntity.individual] || ''
      case 'PrivateLimitedCompany':
      case 'LimitedCompany':
        return editedEntity.company[field as keyof typeof editedEntity.company] || ''
      case 'Trust':
        return editedEntity.trust[field as keyof typeof editedEntity.trust] || ''
      case 'LLP':
      case 'PartnershipFirm':
        return editedEntity.partnership[field as keyof typeof editedEntity.partnership] || ''
      case 'HUF':
        return editedEntity.huf[field as keyof typeof editedEntity.huf] || ''
      default:
        return ''
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg">
      <ScrollArea className="h-[60vh]">
        <div className="space-y-4">
          <Select
            onValueChange={(value: ClientData['clientType']) => setEditedEntity(prev => ({ ...prev, clientType: value }))}
            value={editedEntity.clientType}
          >
            <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
              <SelectValue placeholder="Select entity type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(entityFields).map((type) => (
                <SelectItem key={type} value={type}>{type.replace(/([A-Z])/g, ' $1').trim()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-gray-900 dark:text-white">Basic Information</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {entityFields[editedEntity.clientType].map((field) => (
                    <div key={field}>
                      <Label htmlFor={field} className="text-gray-700 dark:text-gray-300">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      <Input
                        id={field}
                        value={editedEntity[field as keyof typeof editedEntity] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-gray-900 dark:text-white">Specific Information</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specificFields[editedEntity.clientType].map((field) => (
                    <div key={field}>
                      <Label htmlFor={field} className="text-gray-700 dark:text-gray-300">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      {field.toLowerCase().includes('date') ? (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={`w-full justify-start text-left font-normal bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {getSpecificFieldValue(field) ? format(new Date(getSpecificFieldValue(field)), "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800">
                            <Calendar
                              mode="single"
                              selected={getSpecificFieldValue(field) ? new Date(getSpecificFieldValue(field)) : undefined}
                              onSelect={(newDate) => handleInputChange(field, newDate ? newDate.toISOString() : '')}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Input
                          id={field}
                          value={getSpecificFieldValue(field)}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-gray-900 dark:text-white">Bank Details</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {bankDetails.map((bank, index) => (
                    <div key={index} className="space-y-2 mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded">
                      <Input
                        placeholder="Bank Name"
                        value={bank.bankName}
                        onChange={(e) => handleBankDetailChange(index, 'bankName', e.target.value)}
                        className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                      <Input
                        placeholder="Account Number"
                        value={bank.accountNumber}
                        onChange={(e) => handleBankDetailChange(index, 'accountNumber', e.target.value)}
                        className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                      <Input
                        placeholder="IFSC Code"
                        value={bank.ifscCode}
                        onChange={(e) => handleBankDetailChange(index, 'ifscCode', e.target.value)}
                        className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      />
                      <Button variant="destructive" onClick={() => removeBankDetail(index)} className="bg-red-500 hover:bg-red-600 text-white">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Bank Detail
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addBankDetail} className="bg-green-500 hover:bg-green-600 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Bank Detail
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">Update Entity</Button>
    </form>
  )
}