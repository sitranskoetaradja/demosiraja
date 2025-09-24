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

const Page = () => {
	return (
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
							<h3>Setting</h3>
							{/* <CustomerListActionTools /> */}
						</div>
					</div>
				</AdaptiveCard>
			</div>
		</Container>

	)
}

export default Page
