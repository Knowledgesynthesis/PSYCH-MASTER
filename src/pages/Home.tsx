import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { modules, toolsAndResources } from '@/data/modules'
import { ArrowRight } from 'lucide-react'

export function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Master Psychiatry Through Interactive Learning
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive platform for medical students and clinicians to master psychiatric diagnosis,
          treatment, and patient management through evidence-based content and interactive tools.
        </p>
      </div>

      {/* Core Modules */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Core Modules</h2>
          <p className="text-muted-foreground">
            Explore essential psychiatric topics with clinically rigorous, guideline-consistent content
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <Link key={module.id} to={module.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl mb-2`}>
                    {module.icon}
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Interactive Tools & Resources</h2>
          <p className="text-muted-foreground">
            Practice clinical reasoning with interactive diagnostic tools and assessments
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {toolsAndResources.map((tool) => (
            <Link key={tool.id} to={tool.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-2`}>
                    {tool.icon}
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="mt-12">
        <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription className="text-base">
              New to Psych Master? Here's how to make the most of this platform:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
              <p className="text-sm">Start with core modules to build foundational knowledge in psychiatric diagnosis and treatment</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
              <p className="text-sm">Use the Diagnostic Pattern Recognizer to practice symptom-based clinical reasoning</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
              <p className="text-sm">Test your knowledge with practice assessments featuring MCQs and case vignettes</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
              <p className="text-sm">Reference the glossary for quick lookups of psychiatric terms and concepts</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
