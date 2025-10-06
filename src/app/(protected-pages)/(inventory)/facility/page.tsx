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
import type { PageProps } from '@/@types/common'
import getFacilityList from '@/server/actions/getFacilityList'
import FacilityListProvider from './_components/FacilityListProvider'
import FacilityListTable from './_components/FacilityListTable'
import FacilityListActionTools from './_components/FacilityListActionTools'
import FacilityListTableTools from './_components/FacilityListTableTools'

const Page = async ({ searchParams }: PageProps) => {
	const params = await searchParams
    const data = await getFacilityList(params)
	return (
		<FacilityListProvider facilityList={data.list}>

		<Container>

			<div className="mb-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Inventaris</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Fasilitas</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="mb-1">Fasilitas</h3>
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
                            <h4>Total Fasilitas: {data.list.length}</h4>
                            <FacilityListActionTools />
                        </div>
                        <FacilityListTableTools />
                        <FacilityListTable
                            facilityListTotal={data.total}
                            pageIndex={
                                parseInt(params.pageIndex as string) || 1
                            }
                            pageSize={parseInt(params.pageSize as string) || 10}
                        />
                    </div>
                </AdaptiveCard>
			</div>
		</Container>
		</FacilityListProvider>

	)
}

export default Page
