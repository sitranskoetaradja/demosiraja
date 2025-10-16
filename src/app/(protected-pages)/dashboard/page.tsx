import getDashboard from '@/server/actions/getDashboard'
import ProjectOverview from './_components/ProjectOverview'
import UpcomingSchedule from './_components/UpcomingSchedule'

export const projectData = {
    projectOverview: {
        ongoingProject: 12,
        projectCompleted: 68,
        upcomingProject: 7,
    },
}
export default async function Page() {
    const data = await getDashboard()
    return (
    <div className="flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1 xl:max-w-[calc(100%-350px)]">
                    <ProjectOverview data={data} />
                    {/* <Schedule data={data.schedule} /> */}
                </div>
                <div>
                    <UpcomingSchedule />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="md:col-span-1 xl:col-span-1 order-1">
                    {/* <CurrentTasks data={data.currentTasks} /> */}
                </div>
                <div className="md:col-span-1 xl:col-span-1 order-2 xl:order-3">
                    {/* <RecentActivity data={data.recentActivity} /> */}
                </div>
                <div className="md:col-span-2 xl:col-span-1 order-3 xl:order-2">
                    {/* <TaskOverview data={data.taskOverview} /> */}
                </div>
            </div>
        </div>
            )

}