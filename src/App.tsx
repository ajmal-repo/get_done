import { useStore } from '@/store/useStore'
import { Layout } from '@/components/Layout'
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

  const renderView = () => {
    switch (currentView) {
      case 'today': return <TodayView />
      case 'inbox': return <InboxView />
      case 'upcoming': return <UpcomingView />
      case 'project': return <ProjectView />
      case 'habits': return <HabitsView />
      case 'pomodoro': return <PomodoroView />
      case 'matrix': return <MatrixView />
      case 'gtd': return <GtdView />
      case 'search': return <SearchView />
      default: return <TodayView />
    }
  }

  return (
    <Layout>
      {renderView()}
    </Layout>
  )
}
