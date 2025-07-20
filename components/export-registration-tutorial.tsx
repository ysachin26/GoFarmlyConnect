"use client"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from '@/contexts/LanguageContext'

export default function ExportRegistrationTutorial() {
  const { t } = useLanguage()

  // Sample progress data - this would normally come from a database or API
  const overallProgress = 83

  const tutorials = [
    {
      title: t('getting_started'),
      description: t('introduction_export_basics'),
      duration: "5",
      src: "/public1/haifam-video.mp4",
      poster: "/public1/modern-farming.png",
      category: "getting_started",
    },
    {
      title: t('complete_registration_guide'),
      description: t('step_by_step_registration'),
      duration: "12",
      src: "/public1/haifam-video.mp4",
      poster: "/public1/modern-farming.png",
      featured: true,
      category: "featured",
    },
    {
      title: t('document_preparation'),
      description: t('required_documents_preparation'),
      duration: "8",
      src: "/public1/haifam-video.mp4",
      poster: "/public1/modern-farming.png",
      category: "documents",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="container mx-auto px-4">
        {/* Progress Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {t('track_your_progress')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('overall_registration_progress')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t('journey_to_export_ready')}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">{t('overall_progress')}</span>
              <span className="text-sm font-bold text-emerald-600">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </Progress>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                {overallProgress < 100 
                  ? `${100 - overallProgress}% remaining to complete your export registration`
                  : "🎉 Registration complete! Ready to start exporting."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              📚 {t('learn_how_to_become_exporter')}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t('learn_how_to_become_exporter')}
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t('watch_step_by_step_tutorials')}
          </p>
        </div>

        {/* Video Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:scale-105 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <video 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
                  poster={tutorial.poster}
                  preload="metadata"
                >
                  <source src={tutorial.src} type="video/mp4" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-emerald-500 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl hover:bg-emerald-600">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>

                {/* Featured Badge */}
                {tutorial.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg">
                      {t('featured')}
                    </Badge>
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{tutorial.duration} {t('min_watch')}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <h4 className="font-bold text-lg text-slate-800 group-hover:text-emerald-600 transition-colors duration-300 mb-3 line-clamp-2">
                  {tutorial.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {tutorial.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>1.2K {t('views')}</span>
                  </div>
                  <div className="text-emerald-500 font-medium group-hover:text-emerald-600 transition-colors duration-300 flex items-center gap-1">
                    {t('watch_now')} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Tutorials Button */}
        <div className="text-center">
          <Link href="/dashboard/tutorials">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group">
              <span className="mr-2">{t('view_all_video_tutorials')}</span>
              <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
