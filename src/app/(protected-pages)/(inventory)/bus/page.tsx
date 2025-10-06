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
import BusListTable from './_components/BusListTable'
import BusListProvider from './_components/BusListProvider'
import type { PageProps } from '@/@types/common'
import getBusList from '@/server/actions/getBusList'
import BusListActionTools from './_components/BusListActionTools'
import BusListTableTools from './_components/BusListTableTools'

const Page = async ({ searchParams }: PageProps) => {
	const params = await searchParams
    const data = await getBusList(params)
	return (
		<BusListProvider busList={data.list}>

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
							<BreadcrumbPage>Bus</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="mb-1">Bus</h3>
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
                            <h4>Total Bus: {data.list.length}</h4>
                            <BusListActionTools />
                        </div>
                        <BusListTableTools />
                        <BusListTable
                            busListTotal={data.total}
                            pageIndex={
                                parseInt(params.pageIndex as string) || 1
                            }
                            pageSize={parseInt(params.pageSize as string) || 10}
                        />
                    </div>
                </AdaptiveCard>
			</div>
		</Container>
		</BusListProvider>

	)
}

export default Page
