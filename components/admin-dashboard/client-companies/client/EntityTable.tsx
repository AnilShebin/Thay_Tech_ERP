import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { ClientData } from './types'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

type EntityTableProps = {
  entities: ClientData[]
  onView: (entity: ClientData) => void
  onEdit: (entity: ClientData) => void
  onDelete: (id: number) => Promise<void>
  onReload: () => Promise<void>
}

export function EntityTable({ entities, onView, onEdit, onDelete, onReload }: EntityTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; entityId: number | null }>({ open: false, entityId: null })
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const itemsPerPage = 10
  const totalPages = Math.ceil(entities.length / itemsPerPage)

  const getEntityName = (entity: ClientData) => {
    if (entity.clientType === 'Individual') {
      const firstName = entity.individual?.firstName || ''
      const lastName = entity.individual?.lastName || ''
      return `${firstName} ${lastName}`.trim() || 'N/A'
    }
    return entity.name || 'N/A'
  }

  const paginatedEntities = entities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmation({ open: true, entityId: id })
  }

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation.entityId) {
      setIsDeleting(true)
      try {
        await onDelete(deleteConfirmation.entityId)
        toast({
          title: "Success",
          description: "Entity deleted successfully",
          variant: "default",
        })
        await onReload()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete entity",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
        setDeleteConfirmation({ open: false, entityId: null })
      }
    }
  }

  return (
    <>
      <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="h-[500px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>PAN</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEntities.map((entity) => (
                <TableRow key={entity.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {entity.clientType}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {getEntityName(entity)}
                  </TableCell>
                  <TableCell>{entity.panNumber || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => onView(entity)} className="mr-2 bg-blue-500 hover:bg-blue-600 text-white">
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onEdit(entity)} className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteClick(entity.id!)} className="bg-red-500 hover:bg-red-600 text-white">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <Dialog open={deleteConfirmation.open} onOpenChange={(open) => setDeleteConfirmation({ open, entityId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this entity? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmation({ open: false, entityId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}