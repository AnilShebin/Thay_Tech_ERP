import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClientData } from './types'

type EntityDetailsProps = {
  entity: ClientData
}

export function EntityDetails({ entity }: EntityDetailsProps) {
  const parseBankDetails = (bankDetailsString: string) => {
    try {
      return JSON.parse(bankDetailsString);
    } catch (error) {
      console.error("Error parsing bank details:", error);
      return [];
    }
  }

  const bankDetails = parseBankDetails(entity.bankDetails);

  const renderEntitySpecificFields = () => {
    switch (entity.clientType) {
      case 'Individual':
        return (
          <>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.individual?.firstName}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Middle Name</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.individual?.middleName}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.individual?.lastName}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Name</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.individual?.businessName}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Business Starting</dt>
              <dd className="text-lg text-gray-900 dark:text-white">
                {entity.individual?.dateOfBusinessStarting ? format(new Date(entity.individual.dateOfBusinessStarting), "PPP") : ''}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Group Name</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.individual?.groupName}</dd>
            </div>
          </>
        );
      case 'PrivateLimitedCompany':
      case 'LimitedCompany':
        return (
          <>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Incorporation</dt>
              <dd className="text-lg text-gray-900 dark:text-white">
                {entity.company?.dateOfIncorporation ? format(new Date(entity.company.dateOfIncorporation), "PPP") : ''}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">CIN Number</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.company?.cinNumber}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">TAN Number</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.company?.tanNumber}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Authorized Capital</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.company?.authorizedCapital}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Issued Capital</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.company?.issuedCapital}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Paid Up Capital</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.company?.paidUpCapital}</dd>
            </div>
          </>
        );
      case 'Trust':
        return (
          <>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Incorporation</dt>
              <dd className="text-lg text-gray-900 dark:text-white">
                {entity.trust?.dateOfIncorporation ? format(new Date(entity.trust.dateOfIncorporation), "PPP") : ''}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Trustees</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.trust?.trustees}</dd>
            </div>
          </>
        );
      case 'LLP':
      case 'PartnershipFirm':
        return (
          <>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Incorporation</dt>
              <dd className="text-lg text-gray-900 dark:text-white">
                {entity.partnership?.dateOfIncorporation ? format(new Date(entity.partnership.dateOfIncorporation), "PPP") : ''}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">FRN</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.partnership?.frn}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Partners</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.partnership?.partners}</dd>
            </div>
          </>
        );
      case 'HUF':
        return (
          <>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Incorporation</dt>
              <dd className="text-lg text-gray-900 dark:text-white">
                {entity.huf?.dateOfIncorporation ? format(new Date(entity.huf.dateOfIncorporation), "PPP") : ''}
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Members</dt>
              <dd className="text-lg text-gray-900 dark:text-white">{entity.huf?.members}</dd>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <ScrollArea className="h-[600px]">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <TabsTrigger value="basic" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Basic Info</TabsTrigger>
            <TabsTrigger value="specific" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Specific Info</TabsTrigger>
            <TabsTrigger value="bank" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Bank Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Client Type</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.clientType}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.name}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">PAN Number</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.panNumber}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">GSTIN</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.gstin}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered Office Address</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.registeredOfficeAddress}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Communication Address</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.communicationAddress}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">City</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.city}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">State</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.state}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Pincode</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.pincode}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile Number</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.mobileNo}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Alternate Mobile Number</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.alternateMobileNo}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                    <dd className="text-lg text-gray-900 dark:text-white">{entity.email}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specific">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Specific Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderEntitySpecificFields()}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Bank Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-700">
                      <TableHead className="text-gray-900 dark:text-white">Bank Name</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Account Number</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">IFSC Code</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankDetails.map((bank, index) => (
                      <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <TableCell className="text-gray-900 dark:text-white">{bank.bankName}</TableCell>
                        <TableCell className="text-gray-900 dark:text-white">{bank.accountNumber}</TableCell>
                        <TableCell className="text-gray-900 dark:text-white">{bank.ifscCode}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  
  )
}