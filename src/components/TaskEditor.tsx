import { useState } from 'react'
import { useStore } from '@/store/useStore'
import { Priority, Task, PRIORITY_COLORS, PROJECT_COLORS, Quadrant, GtdContext } from '@/types'
import {
  X, Flag, Calendar, FolderOpen, Tag, AlignLeft,
  ChevronDown, Check
} from 'lucide-react'

interface TaskEditorProps {
  task?: Task
  onClose: () => void
  defaultProjectId?: string | null
  defaultDueDate?: string | null
  defaultQuadrant?: Quadrant | null
  defaultGtdContext?: GtdContext | null
}

export function TaskEditor({ task, onClose, defaultProjectId, defaultDueDate, defaultQuadrant, defaultGtdContext }: TaskEditorProps) {
  const { addTask, updateTask, projects, labels } = useStore()

  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [priority, setPriority] = useState<Priority>(task?.priority || 4)
  const [projectId, setProjectId] = useState<string | null>(task?.projectId ?? defaultProjectId ?? null)
  const [labelIds, setLabelIds] = useState<string[]>(task?.labelIds || [])
  const [dueDate, setDueDate] = useState(task?.dueDate ?? defaultDueDate ?? '')
  const [showPriority, setShowPriority] = useState(false)
  const [showProject, setShowProject] = useState(false)
  const [showLabels, setShowLabels] = useState(false)

  const handleSave = () => {
    if (!title.trim()) return
    if (task) {
      updateTask(task.id, { title, description, priority, projectId, labelIds, dueDate: dueDate || null })
    } else {
      addTask({
        title, description, priority, projectId, labelIds,
        dueDate: dueDate || null,
        quadrant: defaultQuadrant || null,
        gtdContext: defaultGtdContext || null,
      })
    }
    onClose()
  }

  return (
    <div className="modal-backdrop flex items-end md:items-center justify-center" onClick={onClose}>
      <div
        className="w-full md:max-w-lg bg-surface-800 rounded-t-2xl md:rounded-2xl animate-slide-up p-4 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task name"
          className="w-full text-lg font-medium mb-2 placeholder:text-surface-300/50"
          autoFocus
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={2}
          className="w-full text-sm text-surface-300 mb-3 resize-none placeholder:text-surface-300/30"
        />

        {/* Quick options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Due date */}
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-700 text-sm cursor-pointer hover:bg-surface-600 transition-colors">
            <Calendar size={14} className="text-surface-300" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-transparent text-sm w-[110px]"
            />
          </label>

          {/* Priority */}
          <div className="relative">
            <button
              onClick={() => setShowPriority(!showPriority)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-700 text-sm hover:bg-surface-600 transition-colors"
            >
              <Flag size={14} style={{ color: PRIORITY_COLORS[priority] }} />
              <span>P{priority}</span>
            </button>
            {showPriority && (
              <div className="absolute top-full mt-1 left-0 bg-surface-700 rounded-lg shadow-xl py-1 z-10 animate-scale-in">
                {([1, 2, 3, 4] as Priority[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPriority(p); setShowPriority(false) }}
                    className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-surface-600 transition-colors"
                  >
                    <Flag size={14} style={{ color: PRIORITY_COLORS[p] }} />
                    <span>Priority {p}</span>
                    {priority === p && <Check size={14} className="ml-auto text-primary-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project */}
          <div className="relative">
            <button
              onClick={() => setShowProject(!showProject)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-700 text-sm hover:bg-surface-600 transition-colors"
            >
              <FolderOpen size={14} className="text-surface-300" />
              <span>{projects.find((p) => p.id === projectId)?.name || 'Project'}</span>
            </button>
            {showProject && (
              <div className="absolute top-full mt-1 left-0 bg-surface-700 rounded-lg shadow-xl py-1 z-10 animate-scale-in min-w-[160px]">
                <button
                  onClick={() => { setProjectId(null); setShowProject(false) }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-surface-600 transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-surface-400" />
                  <span>No Project</span>
                </button>
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setProjectId(p.id); setShowProject(false) }}
                    className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-surface-600 transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span>{p.name}</span>
                    {projectId === p.id && <Check size={14} className="ml-auto text-primary-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Labels */}
          <div className="relative">
            <button
              onClick={() => setShowLabels(!showLabels)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-700 text-sm hover:bg-surface-600 transition-colors"
            >
              <Tag size={14} className="text-surface-300" />
              <span>{labelIds.length > 0 ? `${labelIds.length} labels` : 'Labels'}</span>
            </button>
            {showLabels && (
              <div className="absolute top-full mt-1 right-0 bg-surface-700 rounded-lg shadow-xl py-1 z-10 animate-scale-in min-w-[160px]">
                {labels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLabelIds((prev) =>
                        prev.includes(l.id) ? prev.filter((id) => id !== l.id) : [...prev, l.id]
                      )
                    }}
                    className="flex items-center gap-2 px-3 py-2 w-full text-sm hover:bg-surface-600 transition-colors"
                  >
                    <Tag size={14} style={{ color: l.color }} />
                    <span>{l.name}</span>
                    {labelIds.includes(l.id) && <Check size={14} className="ml-auto text-primary-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-700">
          <button onClick={onClose} className="px-4 py-2 text-sm text-surface-300 hover:text-surface-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-6 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {task ? 'Save' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  )
}
