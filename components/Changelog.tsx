import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Changelog = () => {
  const changes = [
    {
      version: "2.1.0",
      date: "2025-02-01",
      changes: [
        { type: "feature", description: "Added AI-powered attendance tracking" },
        { type: "improvement", description: "Enhanced grade calculation system" },
        { type: "fix", description: "Resolved sync issues with cloud storage" },
      ],
    },
    {
      version: "2.0.5",
      date: "2025-01-15",
      changes: [
        { type: "feature", description: "Introduced dark mode for all platforms" },
        { type: "improvement", description: "Optimized app performance on low-end devices" },
        { type: "fix", description: "Fixed crash on certain Android devices" },
      ],
    },
    // Add more version histories as needed
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-4">Changelog</h2>
      <div className="space-y-4">
        {changes.map((release) => (
          <Card key={release.version}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Version {release.version}</span>
                <Badge variant="outline">{release.date}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {release.changes.map((change, index) => (
                  <li key={index} className="flex items-start">
                    <Badge
                      className="mr-2 mt-1"
                      variant={
                        change.type === "feature"
                          ? "default"
                          : change.type === "improvement"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {change.type}
                    </Badge>
                    <span>{change.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Changelog

