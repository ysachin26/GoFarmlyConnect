"use client"

import { useState, useEffect } from "react"
import { 
  Rocket, 
  Github, 
  ExternalLink, 
  AlertCircle, 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MoreVertical,
  Terminal,
  ShieldCheck,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function DeploymentsPage() {
  const [commitRef, setCommitRef] = useState("https://github.com/ysachin26/GoFarmlyConnect")
  const [isDeploying, setIsDeploying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDeploy = () => {
    setIsDeploying(true)
    setTimeout(() => {
      setIsDeploying(false)
      // We don't actually deploy, but we could show a simulated success if we wanted
    }, 3000)
  }

  const deployments = [
    {
      id: "dep-1",
      repo: "ysachin26/GoFarmlyConnect",
      branch: "main",
      status: "failed",
      time: "Connected 9m ago",
      error: 'Environment Variable "MONGODB_URI" references Secret "MONGODB_URI", which does not exist.',
      commit: "a7b2c4d",
    },
    {
      id: "dep-2",
      repo: "ysachin26/GoFarmlyConnect",
      branch: "develop",
      status: "success",
      time: "2 hours ago",
      commit: "f9e8d7c",
    },
    {
      id: "dep-3",
      repo: "ysachin26/GoFarmlyConnect",
      branch: "feature/auth",
      status: "building",
      time: "15 minutes ago",
      commit: "b1a2c3d",
    }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 p-6 md:p-10 font-sans selection:bg-amber-500/30">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <Rocket className="h-6 w-6 text-amber-500" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white">Create Deployment</h1>
            </div>
            <p className="text-slate-400 text-lg max-w-2xl">
              Configure and launch your application to the global edge network with state-of-the-art performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-800 bg-transparent hover:bg-slate-900 text-slate-300">
              Documentation
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]">
              Support
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Configuration Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Repository Card */}
            <Card className="bg-[#111111] border-slate-800/50 shadow-2xl backdrop-blur-xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                      <Github className="h-7 w-7 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        ysachin26/GoFarmlyConnect
                        <ExternalLink className="h-4 w-4 text-slate-500 cursor-pointer hover:text-white transition-colors" />
                      </h3>
                      <p className="text-slate-500 text-sm">Connected 9m ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1">
                    Healthy Connection
                  </Badge>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800/50">
                  <p className="text-slate-300 text-base leading-relaxed">
                    Paste a valid commit reference to create a new deployment in addition to those auto-generated from <span className="text-amber-500 font-mono">ysachin26/GoFarmlyConnect</span>.
                  </p>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Commit or Branch Reference</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                        <GitBranch className="h-5 w-5" />
                      </div>
                      <Input 
                        value={commitRef}
                        onChange={(e) => setCommitRef(e.target.value)}
                        className="bg-black/50 border-slate-800 pl-12 h-14 text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all rounded-xl text-lg"
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-red-500">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Critical Error Notification */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="mt-1 p-1 bg-red-500/10 rounded-md">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-red-400 font-medium leading-snug">
                      Environment Variable "MONGODB_URI" references Secret "MONGODB_URI", which does not exist.
                    </p>
                    <p className="text-red-500/60 text-sm">
                      Check your project settings and ensure all secrets are correctly defined.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                  <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 px-8">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 px-10 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.2)] disabled:opacity-50 transition-all active:scale-95"
                  >
                    {isDeploying ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Deploying...
                      </div>
                    ) : "Deploy to Production"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#111111] border border-slate-800/50 p-6 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Deployments</span>
                  <Zap className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-3xl font-bold">124</div>
                <div className="text-emerald-500 text-xs">+12% from last month</div>
              </div>
              <div className="bg-[#111111] border border-slate-800/50 p-6 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Avg. Build Time</span>
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-3xl font-bold">42s</div>
                <div className="text-blue-500 text-xs">Faster than 90% of apps</div>
              </div>
              <div className="bg-[#111111] border border-slate-800/50 p-6 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Success Rate</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold">98.4%</div>
                <div className="text-slate-500 text-xs">Standard Tier</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Recent Activity */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 px-1">
              <Terminal className="h-5 w-5 text-amber-500" />
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              {deployments.map((dep) => (
                <div 
                  key={dep.id} 
                  className={cn(
                    "group relative bg-[#111111] border border-slate-800/50 p-5 rounded-2xl transition-all hover:border-slate-700 hover:shadow-xl",
                    dep.status === "failed" && "border-red-500/20 hover:border-red-500/40"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        dep.status === "success" && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
                        dep.status === "failed" && "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
                        dep.status === "building" && "bg-amber-500 animate-pulse"
                      )} />
                      <span className="font-mono text-sm text-slate-300">{dep.commit}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{dep.time}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white group-hover:text-amber-500 transition-colors">
                      {dep.branch === "main" ? "Production Release" : `Preview: ${dep.branch}`}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{dep.repo}</p>
                  </div>

                  {dep.status === "failed" && (
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-red-500/80 bg-red-500/5 py-1 px-2 rounded-md">
                      <AlertCircle className="h-3 w-3" />
                      Configuration Error
                    </div>
                  )}

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full text-slate-500 hover:text-white border border-dashed border-slate-800 hover:border-slate-700 h-14 rounded-2xl">
              View Deployment Logs
            </Button>
          </div>

        </div>

        {/* Footer Info */}
        <div className="pt-10 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6 pb-20">
          <div className="flex items-center gap-8 text-slate-500 text-sm">
            <div className="flex items-center gap-2 hover:text-slate-300 cursor-pointer transition-colors">
              <ShieldCheck className="h-4 w-4" />
              SOC2 Compliant
            </div>
            <div className="flex items-center gap-2 hover:text-slate-300 cursor-pointer transition-colors">
              <Zap className="h-4 w-4" />
              Global Edge Ready
            </div>
          </div>
          <p className="text-slate-600 text-xs">
            © 2026 ExporterEase Inc. Built for global scale.
          </p>
        </div>
      </div>
    </div>
  )
}
