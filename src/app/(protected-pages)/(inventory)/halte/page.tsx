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
import HalteListProvider from './_components/HalteListProvider'
import getHalteList from '@/server/actions/getHalteList'
import type { PageProps } from '@/@types/common'
import HalteListTable from './_components/HalteListTable'
import HalteListActionTools from './_components/HalteListActionTools'
import HalteListTableTools from './_components/HalteListTableTools'

const Page = async ({ searchParams }: PageProps) => {
	const params = await searchParams
	const data = await getHalteList(params)



	return (
		<HalteListProvider halteList={data.list}>
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
								<BreadcrumbPage>Halte</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="flex items-center justify-between">
					<div>
						<h3 className="mb-1">Halte</h3>
						<p>
							Data seluruh halte UPTD Trans Koetaradja berserta dengan jenis halte nya
						</p>
					</div>
				</div>
				<div className="mt-6">
					<AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h4>Jumlah Seluruh Halte: {data.list.length}</h4>
                            <HalteListActionTools />
                        </div>
                        <HalteListTableTools />
                        <HalteListTable
                            halteListTotal={data.total}
                            pageIndex={
                                parseInt(params.pageIndex as string) || 1
                            }
                            pageSize={parseInt(params.pageSize as string) || 10}
                        />
                    </div>
                </AdaptiveCard>
				</div>
			</Container>
		</HalteListProvider>
	)
}

export default Page
