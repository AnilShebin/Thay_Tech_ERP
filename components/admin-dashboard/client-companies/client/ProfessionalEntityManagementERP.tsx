'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PlusCircle, Search } from 'lucide-react'
import { EntityTable } from './EntityTable'
import { EntityDetails } from './EntityDetails'
import AddEntityForm from './AddEntityForm'  // Make sure this import is correct
import { EditEntityForm } from './EditEntityForm'
import { ClientData, EntityType } from './types'
import { getAllClients, addClient, updateClient, deleteClient } from '@/components/actions/clientActions'

export default function ProfessionalEntityManagementERP() {
  const [entities, setEntities] = useState<ClientData[]>([])
  const [activeTab, setActiveTab] = useState<EntityType | 'All'>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEntity, setSelectedEntity] = useState<ClientData | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isAddEntityDialogOpen, setIsAddEntityDialogOpen] = useState(false)
  const [isEditEntityDialogOpen, setIsEditEntityDialogOpen] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await getAllClients()
        setEntities(clients)
      } catch (error) {
        console.error("Failed to fetch clients:", error)
      }
    }
    fetchClients()
  }, [])

  const handleAddEntity = async (newEntity: ClientData) => {
    try {
      const addedEntity = await addClient(newEntity)
      setEntities([...entities, addedEntity])
      setIsAddEntityDialogOpen(false)
    } catch (error) {
      console.error("Failed to add entity:", error)
    }
  }

  const handleEditEntity = async (updatedEntity: ClientData) => {
    try {
      const savedEntity = await updateClient(updatedEntity.id!, updatedEntity)
      setEntities(entities.map(e => e.id === savedEntity.id ? savedEntity : e))
      setIsEditEntityDialogOpen(false)
    } catch (error) {
      console.error("Failed to update entity:", error)
    }
  }

  const handleRemoveEntity = async (id: number) => {
    try {
      await deleteClient(id)
      setEntities(entities.filter(e => e.id !== id))
      if (selectedEntity?.id === id) {
        setSelectedEntity(null)
        setIsDetailsDialogOpen(false)
      }
    } catch (error) {
      console.error("Failed to delete entity:", error)
    }
  }

  const filteredEntities = useMemo(() => {
    return entities.filter(entity =>
      (entity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.panNumber?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === 'All' || entity.clientType === activeTab)
    )
  }, [entities, searchTerm, activeTab])

  return (
    <div className="w-full min-h-screen">
      <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-6 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by name or PAN..."
                className="pl-10 w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsAddEntityDialogOpen(true)} className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Entity
            </Button>
          </div>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as EntityType | 'All')} className="w-full">
            <TabsList className="flex justify-start overflow-x-auto w-full bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <TabsTrigger value="All" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-primary">All Clients</TabsTrigger>
              <TabsTrigger value="Individual" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-primary">Individual</TabsTrigger>
              <TabsTrigger value="PrivateLimitedCompany" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-primary">Pvt Ltd</TabsTrigger>
              <TabsTrigger value="LimitedCompany" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-primary">Ltd</TabsTrigger>
              <TabsTrigger value="Trust" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-primary">Trust</TabsTrigger>
              <TabsTrigger value="LLP" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-primary">LLP</TabsTrigger>
              <TabsTrigger value="PartnershipFirm" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-primary">Part Firm</TabsTrigger>
              <TabsTrigger value="HUF" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-primary">HUF</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-4">
              <EntityTable
                entities={filteredEntities}
                onView={(entity) => {
                  setSelectedEntity(entity)
                  setIsDetailsDialogOpen(true)
                }}
                onEdit={(entity) => {
                  setSelectedEntity(entity)
                  setIsEditEntityDialogOpen(true)
                }}
                onDelete={handleRemoveEntity}
                onReload={async () => {
                  const clients = await getAllClients()
                  setEntities(clients)
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl bg-white max-h-[80vh] overflow-y-auto">
          {selectedEntity && <EntityDetails entity={selectedEntity} />}
        </DialogContent>
      </Dialog>
      <Dialog open={isAddEntityDialogOpen} onOpenChange={setIsAddEntityDialogOpen}>
        <DialogContent className="max-w-4xl bg-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Entity</DialogTitle>
            <DialogDescription>Fill in the details to add a new entity to the system.</DialogDescription>
          </DialogHeader>
          <AddEntityForm onSubmit={handleAddEntity} />
        </DialogContent>
      </Dialog>
      <Dialog open={isEditEntityDialogOpen} onOpenChange={setIsEditEntityDialogOpen}>
        <DialogContent className="max-w-4xl bg-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Entity</DialogTitle>
            <DialogDescription>Update the details of the selected entity.</DialogDescription>
          </DialogHeader>
          {selectedEntity && <EditEntityForm entity={selectedEntity} onSubmit={handleEditEntity} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}