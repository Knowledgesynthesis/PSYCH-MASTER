import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/contexts/ThemeContext'
import { Moon, Sun, Info, AlertTriangle } from 'lucide-react'

export function Settings() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and learn more about Psych Master</p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            Appearance
          </CardTitle>
          <CardDescription>Customize how Psych Master looks on your device</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Dark Mode</div>
              <div className="text-sm text-muted-foreground">
                {theme === 'dark' ? 'Currently using dark theme' : 'Currently using light theme'}
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About Psych Master
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Mission</h3>
            <p className="text-sm text-muted-foreground">
              Psych Master is an interactive psychiatric reasoning platform designed to help medical students,
              residents, and early clinicians master the diagnosis, treatment, and management of psychiatric conditions.
              Our content is aligned with DSM-5-TR criteria, APA guidelines, and evidence-based best practices.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>7 comprehensive modules covering essential psychiatric topics</li>
              <li>Interactive diagnostic tools and clinical reasoning exercises</li>
              <li>Practice assessments with detailed explanations</li>
              <li>Mobile-first design for learning on the go</li>
              <li>Offline capability for uninterrupted access</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Version</h3>
            <p className="text-sm text-muted-foreground">Psych Master v1.0.0</p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimers */}
      <Card className="border-yellow-500/50 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
            <AlertTriangle className="h-5 w-5" />
            Important Disclaimers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Educational Use Only</h3>
            <p className="text-sm text-muted-foreground">
              Psych Master is designed exclusively for educational purposes. All clinical scenarios are synthetic
              and created for learning. This platform is NOT a substitute for professional medical judgment,
              clinical training, or individualized patient care.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Not Medical Advice</h3>
            <p className="text-sm text-muted-foreground">
              The information provided through Psych Master does not constitute medical advice, diagnosis, or treatment.
              Always consult with qualified healthcare professionals for clinical decisions and patient care.
              Never disregard professional medical advice or delay seeking it because of information from this platform.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Emergency Situations</h3>
            <p className="text-sm text-muted-foreground">
              If you or someone you know is experiencing a mental health emergency or having thoughts of suicide,
              contact emergency services immediately (call 911 in the US) or go to the nearest emergency room.
              You can also contact the National Suicide Prevention Lifeline at 988.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Clinical Guidelines</h3>
            <p className="text-sm text-muted-foreground">
              While Psych Master content is aligned with current clinical guidelines and best practices,
              medical knowledge evolves constantly. Always refer to the most current clinical guidelines,
              institutional protocols, and evidence-based resources when making clinical decisions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Privacy & Data</h3>
            <p className="text-sm text-muted-foreground">
              Psych Master does not collect, store, or transmit any personal health information or user data.
              All learning activities are performed locally on your device. No progress tracking or data export
              features are included to maintain complete privacy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
