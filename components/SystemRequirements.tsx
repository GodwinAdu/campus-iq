import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const SystemRequirements = () => {
  const requirements = [
    {
      platform: "Windows",
      os: "Windows 10 or later",
      processor: "2 GHz dual-core",
      memory: "4 GB RAM",
      storage: "500 MB",
    },
    {
      platform: "macOS",
      os: "macOS 10.14 or later",
      processor: "2 GHz dual-core Intel",
      memory: "4 GB RAM",
      storage: "500 MB",
    },
    {
      platform: "Android",
      os: "Android 8.0 or later",
      processor: "1.8 GHz quad-core",
      memory: "3 GB RAM",
      storage: "100 MB",
    },
    { platform: "iOS", os: "iOS 13.0 or later", processor: "A10 chip or later", memory: "2 GB RAM", storage: "100 MB" },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-4">System Requirements</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>Operating System</TableHead>
            <TableHead>Processor</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Storage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requirements.map((req) => (
            <TableRow key={req.platform}>
              <TableCell className="font-medium">{req.platform}</TableCell>
              <TableCell>{req.os}</TableCell>
              <TableCell>{req.processor}</TableCell>
              <TableCell>{req.memory}</TableCell>
              <TableCell>{req.storage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SystemRequirements

