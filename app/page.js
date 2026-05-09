import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function Home() {
  return (
    <Card className="w-64 m-8">
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Shadcn is working!</p>
      </CardContent>
      <Button>Click me</Button>
    </Card>

  )
}