import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { supabase } from '@/lib/supabase'
import { Layout } from '@/components/Layout'
import { AuthView } from '@/components/AuthView'
import { TodayView } from '@/views/TodayView'
import { InboxView } from '@/views/InboxView'
import { UpcomingView } from '@/views/UpcomingView'
import { ProjectView } from '@/views/ProjectView'
import { HabitsView } from '@/views/HabitsView'
import { PomodoroView } from '@/views/PomodoroView'
import { MatrixView } from '@/views/MatrixView'
import { GtdView } from '@/views/GtdView'
import { SearchView } from '@/views/SearchView'

export default function App() {
  const currentView = useStore((s) => s.currentView)
  const userId = useStore((s) => s.userId)
  const isAuthLoading = useStore((s) => s.isAuthLoading)
  const setUserId = useStore((s) => s.setUserId)
  const setAuthLoading = useStore((s) => s.setAuthLoading)
  const loadFromSupabase = useStore((s) => s.loadFromSupabase)

  useEffect(() => {
    // Check for an existing Supabase session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadFromSupabase(session.user.id)
      } else {
        setUserId(null)
        setAuthLoading(false)
      }
    })

    // Keep userId in sync when auth state changes (e.g. token refresh, sign-out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUserId(null)
        setAuthLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-surface-400 text-sm">Loading…</p>
        </div>
      </div>
    )
  }

  if (!userId) {
    return <AuthView />
  }

  const renderView = () => {
    switch (currentView) {
      case 'today':    return <TodayView />
      case 'inbox':    return <InboxView />
      case 'upcoming': return <UpcomingView />
      case 'project':  return <ProjectView />
      case 'habits':   return <HabitsView />
      case 'pomodoro': return <PomodoroView />
      case 'matrix':   return <MatrixView />
      case 'gtd':      return <GtdView />
      case 'search':   return <SearchView />
      default:         return <TodayView />
    }
  }

  return (
    <Layout>
      {renderView()}
    </Layout>
  )
}
