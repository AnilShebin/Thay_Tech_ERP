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
import { ClientData } from './types'

export default function AddEntityForm({ onSubmit }: { onSubmit: (entity: ClientData) => void }) {
  const [newEntity, setNewEntity] = useState<ClientData>({
    clientType: 'Individual',
    name: '',
    panNumber: '',
    gstin: '',
    registeredOfficeAddress: '',
    communicationAddress: '',
    city: '',
    state: '',
    pincode: '',
    mobileNo: '',
    alternateMobileNo: '',
    email: '',
    bankDetails: '[]',
    individual: {
      firstName: '',
      middleName: '',
      lastName: '',
      businessName: '',
      dateOfBusinessStarting: '',
      groupName: '',
    },
    company: {
      companyType: 'PrivateLimitedCompany',
      dateOfIncorporation: '',
      cinNumber: '',
      tanNumber: '',
      authorizedCapital: '',
      issuedCapital: '',
      paidUpCapital: '',
    },
    trust: {
      dateOfIncorporation: '',
      trustees: '',
    },
    partnership: {
      partnershipType: 'LLP',
      dateOfIncorporation: '',
      frn: '',
      partners: '',
    },
    huf: {
      dateOfIncorporation: '',
      members: '',
    },
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
    setNewEntity(prev => {
      const updated = { ...prev }
      if (entityFields[prev.clientType].includes(field)) {
        (updated as any)[field] = value
      } else {
        switch (prev.clientType) {
          case 'Individual':
            updated.individual = { ...updated.individual, [field]: value || '' } as typeof updated.individual
            break
          case 'PrivateLimitedCompany':
          case 'LimitedCompany':
            updated.company = { ...updated.company, [field]: value } as typeof updated.company
            break
          case 'Trust':
            updated.trust = { ...updated.trust, [field]: value || '' } as typeof updated.trust
            break
          case 'LLP':
          case 'PartnershipFirm':
            updated.partnership = { ...updated.partnership ?? {}, [field]: value || updated.partnership?.partnershipType } as typeof updated.partnership
            break
          case 'HUF':
            updated.huf = { ...updated.huf, [field]: value || '' } as typeof updated.huf
            break
        }
      }
      return updated
    })
  }

  const addBankDetail = () => {
    const currentBankDetails = JSON.parse(newEntity.bankDetails || '[]')
    const updatedBankDetails = [...currentBankDetails, { bankName: '', accountNumber: '', ifscCode: '' }]
    setNewEntity(prev => ({ ...prev, bankDetails: JSON.stringify(updatedBankDetails) }))
  }

  const updateBankDetail = (index: number, field: string, value: string) => {
    const currentBankDetails = JSON.parse(newEntity.bankDetails || '[]')
    currentBankDetails[index][field] = value
    setNewEntity(prev => ({ ...prev, bankDetails: JSON.stringify(currentBankDetails) }))
  }

  const removeBankDetail = (index: number) => {
    const currentBankDetails = JSON.parse(newEntity.bankDetails || '[]')
    currentBankDetails.splice(index, 1)
    setNewEntity(prev => ({ ...prev, bankDetails: JSON.stringify(currentBankDetails) }))
  }

  const handleSubmit = () => {
    onSubmit(newEntity)
  }

  const getSpecificFieldValue = (field: string) => {
    switch (newEntity.clientType) {
      case 'Individual':
        return newEntity.individual?.[field as keyof typeof newEntity.individual] || ''
      case 'PrivateLimitedCompany':
      case 'LimitedCompany':
        return newEntity.company?.[field as keyof typeof newEntity.company] || ''
      case 'Trust':
        return newEntity.trust ? newEntity.trust[field as keyof typeof newEntity.trust] || '' : ''
      case 'LLP':
      case 'PartnershipFirm':
        return newEntity.partnership?.[field as keyof typeof newEntity.partnership] || ''
      case 'HUF':
        return newEntity.huf?.[field as keyof typeof newEntity.huf] || ''
      default:
        return ''
    }
  }

  return (
    <ScrollArea className="h-[60vh] bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="space-y-4">
        <Select
          onValueChange={(value: ClientData['clientType']) => setNewEntity(prev => ({ ...prev, clientType: value }))}
          value={newEntity.clientType}
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
                {entityFields[newEntity.clientType].map((field) => (
                  <div key={field}>
                    <Label htmlFor={field} className="text-gray-700 dark:text-gray-300">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <Input
                      id={field}
                      value={typeof newEntity[field as keyof typeof newEntity] === 'string' || typeof newEntity[field as keyof typeof newEntity] === 'number' ? newEntity[field as keyof typeof newEntity]?.toString() : ''}
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
                {specificFields[newEntity.clientType].map((field) => (
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
                {JSON.parse(newEntity.bankDetails || '[]').map((bank: any, index: number) => (
                  <div key={index} className="space-y-2 mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded">
                    <Input
                      placeholder="Bank Name"
                      value={bank.bankName}
                      onChange={(e) => updateBankDetail(index, 'bankName', e.target.value)}
                      className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    />
                    <Input
                      placeholder="Account Number"
                      value={bank.accountNumber}
                      onChange={(e) => updateBankDetail(index, 'accountNumber', e.target.value)}
                      className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    />
                    <Input
                      placeholder="IFSC Code"
                      value={bank.ifscCode}
                      onChange={(e) => updateBankDetail(index, 'ifscCode', e.target.value)}
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
        <Button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white">Add Entity</Button>
      </div>
    </ScrollArea>
  )
}