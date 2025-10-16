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
import CategoryListProvider from './_components/CategoryListProvider'
import type { PageProps } from '@/@types/common'
import getCategoryList from '@/server/actions/getCategoryList'
import CategoryListTable from './_components/CategoryListTable'
import CategoryListActionTools from './_components/CategoryListActionTools'
import CategoryListTableTools from './_components/CategoryListTableTools'

const Page = async ({ searchParams }: PageProps) => {
	const params = await searchParams
    const data = await getCategoryList(params)
	return (
		<CategoryListProvider categoryList={data.list}>

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
							<BreadcrumbPage>Kategori</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<h3 className="mb-1">Kategori</h3>
					<p>
						Data kategori untuk fasilitas, bus, dan juga halte.
					</p>
				</div>
			</div>
			<div className="mt-6">
				<AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            
                            <CategoryListActionTools />
                        </div>
                        <CategoryListTableTools />
                        <CategoryListTable
                            categoryListTotal={data.total}
                            pageIndex={
                                parseInt(params.pageIndex as string) || 1
                            }
                            pageSize={parseInt(params.pageSize as string) || 10}
                        />
                    </div>
                </AdaptiveCard>
			</div>
		</Container>
		</CategoryListProvider>

	)
}

export default Page
