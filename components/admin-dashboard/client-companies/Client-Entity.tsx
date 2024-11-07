// "use client"

// import { useState, useMemo } from 'react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon, ChevronDown, Edit, FileText, Trash2, UserPlus, Search, Building, Users, CreditCard, MapPin, Phone, Mail, Briefcase, PlusCircle, BarChart2, DollarSign, UserCircle, Layers, Filter } from 'lucide-react'
// import { format } from "date-fns"
// import { motion, AnimatePresence } from "framer-motion"
// import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// type EntityType = 'Individual' | 'PrivateLimitedCompany' | 'LimitedCompany' | 'Trust' | 'LLP' | 'PartnershipFirm' | 'HUF' | 'AssociationOfPersons'

// type Entity = {
//   id: string
//   type: EntityType
//   details: Record<string, string | Date>
//   financials: Financial[]
//   relatedParties: RelatedParty[]
// }

// type Financial = {
//   id: string
//   year: string
//   revenue: number
//   profit: number
//   assets: number
//   liabilities: number
// }

// type RelatedParty = {
//   id: string
//   name: string
//   relationship: string
//   pan: string
//   stake: string
// }

// const initialEntities: Entity[] = [
//   {
//     id: '1',
//     type: 'Individual',
//     details: {
//       name: 'John Doe',
//       pan: 'ABCDE1234F',
//       dob: new Date(1980, 0, 1),
//       email: 'john.doe@example.com',
//       phone: '+91 9876543210',
//       address: '123 Main St, Mumbai, Maharashtra 400001',
//     },
//     financials: [
//       { id: '1', year: '2021', revenue: 800000, profit: 250000, assets: 1800000, liabilities: 400000 },
//       { id: '2', year: '2022', revenue: 1000000, profit: 300000, assets: 2000000, liabilities: 500000 },
//       { id: '3', year: '2023', revenue: 1200000, profit: 350000, assets: 2200000, liabilities: 600000 },
//     ],
//     relatedParties: [],
//   },
//   {
//     id: '2',
//     type: 'PrivateLimitedCompany',
//     details: {
//       name: 'Tech Innovations Pvt Ltd',
//       cin: 'U74999MH2023PTC123456',
//       pan: 'AAAAA0000A',
//       incorporationDate: new Date(2023, 0, 15),
//       email: 'info@techinnovations.com',
//       phone: '+91 2234567890',
//       address: '456 Tech Park, Bengaluru, Karnataka 560001',
//     },
//     financials: [
//       { id: '4', year: '2021', revenue: 8000000, profit: 1500000, assets: 12000000, liabilities: 4000000 },
//       { id: '5', year: '2022', revenue: 10000000, profit: 2000000, assets: 15000000, liabilities: 5000000 },
//       { id: '6', year: '2023', revenue: 12000000, profit: 2500000, assets: 18000000, liabilities: 6000000 },
//     ],
//     relatedParties: [
//       { id: '1', name: 'Jane Smith', relationship: 'Director', pan: 'FGHIJ5678K', stake: '60%' },
//     ],
//   },
// ]

// export default function ProfessionalEntityManagementERP() {
//   const [entities, setEntities] = useState<Entity[]>(initialEntities)
//   const [newEntity, setNewEntity] = useState<Partial<Entity>>({ type: 'Individual', details: {}, financials: [], relatedParties: [] })
//   const [activeTab, setActiveTab] = useState<EntityType>('Individual')
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)
//   const [date, setDate] = useState<Date>()
//   const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
//   const [isAddEntityDialogOpen, setIsAddEntityDialogOpen] = useState(false)
//   const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)

//   const addEntity = () => {
//     if (newEntity.type && Object.keys(newEntity.details).length > 0) {
//       setEntities([...entities, { id: Date.now().toString(), ...newEntity as Entity }])
//       setNewEntity({ type: 'Individual', details: {}, financials: [], relatedParties: [] })
//       setIsAddEntityDialogOpen(false)
//     }
//   }

//   const removeEntity = (id: string) => {
//     setEntities(entities.filter(e => e.id !== id))
//     if (selectedEntity?.id === id) {
//       setSelectedEntity(null)
//       setIsDetailsDialogOpen(false)
//     }
//   }

//   const addFinancial = () => {
//     setNewEntity({
//       ...newEntity,
//       financials: [...(newEntity.financials || []), { id: Date.now().toString(), year: '', revenue: 0, profit: 0, assets: 0, liabilities: 0 }]
//     })
//   }

//   const updateFinancial = (index: number, field: keyof Financial, value: string | number) => {
//     const updatedFinancials = [...(newEntity.financials || [])]
//     updatedFinancials[index] = { ...updatedFinancials[index], [field]: value }
//     setNewEntity({ ...newEntity, financials: updatedFinancials })
//   }

//   const removeFinancial = (index: number) => {
//     const updatedFinancials = [...(newEntity.financials || [])]
//     updatedFinancials.splice(index, 1)
//     setNewEntity({ ...newEntity, financials: updatedFinancials })
//   }

//   const addRelatedParty = () => {
//     setNewEntity({
//       ...newEntity,
//       relatedParties: [...(newEntity.relatedParties || []), { id: Date.now().toString(), name: '', relationship: '', pan: '', stake: '' }]
//     })
//   }

//   const updateRelatedParty = (index: number, field: keyof RelatedParty, value: string) => {
//     const updatedRelatedParties = [...(newEntity.relatedParties || [])]
//     updatedRelatedParties[index] = { ...updatedRelatedParties[index], [field]: value }
//     setNewEntity({ ...newEntity, relatedParties: updatedRelatedParties })
//   }

//   const removeRelatedParty = (index: number) => {
//     const updatedRelatedParties = [...(newEntity.relatedParties || [])]
//     updatedRelatedParties.splice(index, 1)
//     setNewEntity({ ...newEntity, relatedParties: updatedRelatedParties })
//   }

//   const entityFields: Record<EntityType, string[]> = {
//     Individual: ['Name', 'PAN', 'Date of Birth', 'Email', 'Phone', 'Address', 'Aadhaar'],
//     PrivateLimitedCompany: ['Company Name', 'CIN', 'PAN', 'Date of Incorporation', 'Registered Office', 'Email', 'Phone', 'Authorized Capital', 'Paid-up Capital'],
//     LimitedCompany: ['Company Name', 'CIN', 'PAN', 'Date of Incorporation', 'Registered Office', 'Email', 'Phone', 'Authorized Capital', 'Paid-up Capital'],
//     Trust: ['Trust Name', 'PAN', 'Date of Formation', 'Registered Office', 'Email', 'Phone', 'Trust Type'],
//     LLP: ['LLP Name', 'LLPIN', 'PAN', 'Date of Incorporation', 'Registered Office', 'Email', 'Phone', 'Total Contribution'],
//     PartnershipFirm: ['Firm Name', 'PAN', 'Date of Formation', 'Principal Place of Business', 'Email', 'Phone', 'Total Capital'],
//     HUF: ['HUF Name', 'PAN', 'Date of Formation', 'Address', 'Email', 'Phone', 'Karta Name'],
//     AssociationOfPersons: ['AOP Name', 'PAN', 'Date of Formation', 'Address', 'Email', 'Phone', 'Number of Members'],
//   }

//   const renderEntityForm = () => {
//     return (
//       <ScrollArea className="h-[60vh]">
//         <div className="space-y-4 p-4">
//           <Select onValueChange={(value: EntityType) => setNewEntity({ ...newEntity, type: value, details: {} })}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select entity type" />
//             </SelectTrigger>
//             <SelectContent>
//               {Object.keys(entityFields).map((type) => (
//                 <SelectItem key={type} value={type}>{type.replace(/([A-Z])/g, ' $1').trim()}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Accordion type="single" collapsible className="w-full">
//             <AccordionItem value="item-1">
//               <AccordionTrigger>Basic Information</AccordionTrigger>
//               <AccordionContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {newEntity.type && entityFields[newEntity.type].map((field) => (
//                     <div key={field}>
//                       <Label htmlFor={field}>{field}</Label>
//                       {field.toLowerCase().includes('date') ? (
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button
//                               variant={"outline"}
//                               className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
//                             >
//                               <CalendarIcon className="mr-2 h-4 w-4" />
//                               {date ? format(date, "PPP") : <span>Pick a date</span>}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0">
//                             <Calendar
//                               mode="single"
//                               selected={date}
//                               onSelect={(newDate) => {
//                                 setDate(newDate)
//                                 setNewEntity({
//                                   ...newEntity,
//                                   details: { ...newEntity.details, [field]: newDate }
//                                 })
//                               }}
//                               initialFocus
//                             />
//                           </PopoverContent>
//                         </Popover>
//                       ) : (
//                         <Input
//                           id={field}
//                           value={newEntity.details[field] || ''}
//                           onChange={(e) => setNewEntity({
//                             ...newEntity,
//                             details: { ...newEntity.details, [field]: e.target.value }
//                           })}
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-2">
//               <AccordionTrigger>Financial Information</AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-4">
//                   {newEntity.financials?.map((financial, index) => (
//                     <div key={financial.id} className="space-y-2 mb-4 p-4 border rounded">
//                       <Input
//                         placeholder="Financial Year"
//                         value={financial.year}
//                         onChange={(e) => updateFinancial(index, 'year', e.target.value)}
//                       />
//                       <Input
//                         type="number"
//                         placeholder="Revenue"
//                         value={financial.revenue}
//                         onChange={(e) => updateFinancial(index, 'revenue', parseFloat(e.target.value))}
//                       />
//                       <Input
//                         type="number"
//                         placeholder="Profit"
//                         value={financial.profit}
//                         onChange={(e) => updateFinancial(index, 'profit', parseFloat(e.target.value))}
//                       />
//                       <Input
//                         type="number"
//                         placeholder="Assets"
//                         value={financial.assets}
//                         onChange={(e) => updateFinancial(index, 'assets', parseFloat(e.target.value))}
//                       />
//                       <Input
//                         type="number"
//                         placeholder="Liabilities"
//                         value={financial.liabilities}
//                         onChange={(e) => updateFinancial(index, 'liabilities', parseFloat(e.target.value))}
//                       />
//                       <Button variant="destructive" onClick={() => removeFinancial(index)}>Remove Financial Year</Button>
//                     </div>
//                   ))}
//                   <Button onClick={addFinancial}>Add Financial Year</Button>
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-3">
//               <AccordionTrigger>Related Parties</AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-4">
//                   {newEntity.relatedParties?.map((party, index) => (
//                     <div key={party.id} className="space-y-2 mb-4  p-4 border rounded">
//                       <Input
//                         placeholder="Name"
//                         value={party.name}
//                         onChange={(e) => updateRelatedParty(index, 'name', e.target.value)}
//                       />
//                       <Input
//                         placeholder="Relationship"
//                         value={party.relationship}
//                         onChange={(e) => updateRelatedParty(index, 'relationship', e.target.value)}
//                       />
//                       <Input
//                         placeholder="PAN"
//                         value={party.pan}
//                         onChange={(e) => updateRelatedParty(index, 'pan', e.target.value)}
//                       />
//                       <Input
//                         placeholder="Stake"
//                         value={party.stake}
//                         onChange={(e) => updateRelatedParty(index, 'stake', e.target.value)}
//                       />
//                       <Button variant="destructive" onClick={() => removeRelatedParty(index)}>Remove Related Party</Button>
//                     </div>
//                   ))}
//                   <Button onClick={addRelatedParty}>Add Related Party</Button>
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//           <Button onClick={addEntity} className="w-full">Add Entity</Button>
//         </div>
//       </ScrollArea>
//     )
//   }

//   const filteredEntities = useMemo(() => {
//     return entities.filter(entity => 
//       entity.details['name']?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//       entity.details['pan']?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     ).filter(entity => entity.type === activeTab)
//   }, [entities, searchTerm, activeTab])

//   const sortedEntities = useMemo(() => {
//     if (!sortConfig) return filteredEntities
//     return [...filteredEntities].sort((a, b) => {
//       if (a.details[sortConfig.key] < b.details[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? -1 : 1
//       }
//       if (a.details[sortConfig.key] > b.details[sortConfig.key]) {
//         return sortConfig.direction === 'asc' ? 1 : -1
//       }
//       return 0
//     })
//   }, [filteredEntities, sortConfig])

//   const requestSort = (key: string) => {
//     let direction: 'asc' | 'desc' = 'asc'
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc'
//     }
//     setSortConfig({ key, direction })
//   }

//   return (
//     <div className="container mx-auto py-10">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold">Professional Entity Management ERP</CardTitle>
//           <CardDescription>Efficiently manage various business entities and their financial data</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-4 flex items-center space-x-2">
//             <div className="relative flex-grow">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="search"
//                 placeholder="Search by name or PAN..."
//                 className="pl-8"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Button onClick={() => setIsAddEntityDialogOpen(true)}>
//               <PlusCircle className="mr-2 h-4 w-4" /> Add New Entity
//             </Button>
//           </div>
//           <Tabs value={activeTab} onValueChange={(value: EntityType) => setActiveTab(value)}>
//             <TabsList className="flex justify-start overflow-x-auto">
//               <TabsTrigger value="Individual">Indv</TabsTrigger>
//               <TabsTrigger value="PrivateLimitedCompany">Pvt Ltd</TabsTrigger>
//               <TabsTrigger value="LimitedCompany">Ltd</TabsTrigger>
//               <TabsTrigger value="Trust">Trust</TabsTrigger>
//               <TabsTrigger value="LLP">LLP</TabsTrigger>
//               <TabsTrigger value="PartnershipFirm">Part Firm</TabsTrigger>
//               <TabsTrigger value="HUF">HUF</TabsTrigger>
//               <TabsTrigger value="AssociationOfPersons">AOP</TabsTrigger>
//             </TabsList>
//             <TabsContent value={activeTab}>
//               <Card>
//                 <CardContent>
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="w-[80px]">Type</TableHead>
//                         <TableHead className="cursor-pointer" onClick={() => requestSort('name')}>
//                           Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                         </TableHead>
//                         <TableHead className="cursor-pointer" onClick={() => requestSort('pan')}>
//                           PAN {sortConfig?.key === 'pan' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
//                         </TableHead>
//                         <TableHead>Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {sortedEntities.map((entity) => (
//                         <TableRow key={entity.id}>
//                           <TableCell>
//                             <Badge variant="outline">{entity.type}</Badge>
//                           </TableCell>
//                           <TableCell>{entity.details['name']}</TableCell>
//                           <TableCell>{entity.details['pan']}</TableCell>
//                           <TableCell>
//                             <Button variant="ghost" size="sm" onClick={() => {
//                               setSelectedEntity(entity)
//                               setIsDetailsDialogOpen(true)
//                             }}>
//                               <FileText className="h-4 w-4 mr-2" />
//                               View
//                             </Button>
//                             <Button variant="ghost" size="sm">
//                               <Edit className="h-4 w-4 mr-2" />
//                               Edit
//                             </Button>
//                             <Button variant="ghost" size="sm" onClick={() => removeEntity(entity.id)}>
//                               <Trash2 className="h-4 w-4 mr-2" />
//                               Delete
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//       <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
//         <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>{selectedEntity?.details['name']}</DialogTitle>
//             <DialogDescription>{selectedEntity?.type}</DialogDescription>
//           </DialogHeader>
//           {selectedEntity && (
//             <div className="space-y-6">
//               <Tabs defaultValue="basic">
//                 <TabsList>
//                   <TabsTrigger value="basic">Basic Info</TabsTrigger>
//                   <TabsTrigger value="financial">Financial Data</TabsTrigger>
//                   <TabsTrigger value="related">Related Parties</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="basic">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Basic Information</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {Object.entries(selectedEntity.details).map(([key, value]) => (
//                           <div key={key} className="flex flex-col">
//                             <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
//                             <dd className="text-lg">{value instanceof Date ? format(value, "PPP") : value?.toString()}</dd>
//                           </div>
//                         ))}
//                       </dl>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value="financial">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Financial Information</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       {selectedEntity.financials.length > 0 ? (
//                         <div>
//                           <ResponsiveContainer width="100%" height={300}>
//                             <LineChart data={selectedEntity.financials}>
//                               <CartesianGrid strokeDasharray="3 3" />
//                               <XAxis dataKey="year" />
//                               <YAxis />
//                               <Tooltip />
//                               <Legend />
//                               <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
//                               <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
//                             </LineChart>
//                           </ResponsiveContainer>
//                           <Table className="mt-4">
//                             <TableHeader>
//                               <TableRow>
//                                 <TableHead>Year</TableHead>
//                                 <TableHead>Revenue</TableHead>
//                                 <TableHead>Profit</TableHead>
//                                 <TableHead>Assets</TableHead>
//                                 <TableHead>Liabilities</TableHead>
//                               </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                               {selectedEntity.financials.map((financial) => (
//                                 <TableRow key={financial.id}>
//                                   <TableCell>{financial.year}</TableCell>
//                                   <TableCell>{financial.revenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
//                                   <TableCell>{financial.profit.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
//                                   <TableCell>{financial.assets.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
//                                   <TableCell>{financial.liabilities.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       ) : (
//                         <p>No financial information available.</p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//                 <TabsContent value="related">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="text-lg">Related Parties</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       {selectedEntity.relatedParties.length > 0 ? (
//                         <Table>
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead>Name</TableHead>
//                               <TableHead>Relationship</TableHead>
//                               <TableHead>PAN</TableHead>
//                               <TableHead>Stake</TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             {selectedEntity.relatedParties.map((party) => (
//                               <TableRow key={party.id}>
//                                 <TableCell>{party.name}</TableCell>
//                                 <TableCell>{party.relationship}</TableCell>
//                                 <TableCell>{party.pan}</TableCell>
//                                 <TableCell>{party.stake}</TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       ) : (
//                         <p>No related parties available.</p>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//       <Dialog open={isAddEntityDialogOpen} onOpenChange={setIsAddEntityDialogOpen}>
//         <DialogContent className="max-w-4xl max-h-[80vh]">
//           <DialogHeader>
//             <DialogTitle>Add New Entity</DialogTitle>
//             <DialogDescription>Enter the details for the new entity.</DialogDescription>
//           </DialogHeader>
//           {renderEntityForm()}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }