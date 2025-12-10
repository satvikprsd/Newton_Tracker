import { TokenForm } from "@/components/token-form"
import { Shield, Lock, Database } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">ADA Tracker</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Revision in one place.
          </p>
        </div>

        <div className="bg-accent/50 border border-border rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This project has <strong className="text-foreground">no backend</strong>. All data is fetched directly
                from the Newton School Portal using your local token. Your data is{" "}
                <strong className="text-foreground">never uploaded or saved anywhere</strong> — it stays on your device
                only.
              </p>
            </div>
          </div>
        </div>

        <TokenForm />
      </div>
    </div>
  )
}
