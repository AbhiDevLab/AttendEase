import { CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const classes = [
  {
    id: 1,
    course: "CS101",
    title: "Introduction to Programming",
    time: "09:00 - 10:30",
    location: "Room 101",
    status: "completed",
  },
  {
    id: 2,
    course: "CS201",
    title: "Data Structures",
    time: "11:00 - 12:30",
    location: "Room 203",
    status: "completed",
  },
  {
    id: 3,
    course: "CS301",
    title: "Algorithms",
    time: "14:00 - 15:30",
    location: "Room 305",
    status: "upcoming",
  },
  {
    id: 4,
    course: "CS401",
    title: "Artificial Intelligence",
    time: "16:00 - 17:30",
    location: "Room 405",
    status: "upcoming",
  },
]

export function RecentClasses() {
  return (
    <div className="space-y-4">
      {classes.map((cls) => (
        <div key={cls.id} className="flex items-start space-x-4 rounded-md border p-3">
          <div
            className={cn(
              "mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full",
              cls.status === "completed" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
            )}
          >
            {cls.status === "completed" ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {cls.course}: {cls.title}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{cls.time}</span>
              <span className="px-1">•</span>
              <span>{cls.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
