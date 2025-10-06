import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb/breadcrumb"
import getTrackList from '@/server/actions/getTrackList'
import TrackListProvider from './_components/TrackListProvider'
import type { PageProps } from '@/@types/common'
import TrackListTable from './_components/TrackListTable'
import TrackListActionTools from './_components/TrackListActionTools'
import TrackListTableTools from './_components/TrackListTableTools'

const Page = async ({ searchParams }: PageProps) => {
	const params = await searchParams
    const data = await getTrackList(params)
	return (
		<TrackListProvider trackList={data.list}>
		<Container>

			<div className="mb-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Master Data</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Rute Trayek</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="mb-1">Rute Trayek</h3>
					<p>
						Create an image with Generative AI by describing what
						you&apos;d like to see. Please note, all images are shared
						publicly by default.
					</p>
				</div>
			</div>
			<div className="mt-6">
				<AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h4>Total Trayek Bus: {data.list.length}</h4>
                            <TrackListActionTools />
                        </div>
                        <TrackListTableTools />
                        <TrackListTable
                            trackListTotal={data.total}
                            pageIndex={
                                parseInt(params.pageIndex as string) || 1
                            }
                            pageSize={parseInt(params.pageSize as string) || 10}
                        />
                    </div>
                </AdaptiveCard>
			</div>
		</Container>
</TrackListProvider>
	)
}

export default Page
