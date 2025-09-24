import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'

const Page = () => {
    return (<Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Dashboard</h3>
                            {/* <CustomerListActionTools /> */}
                        </div>
                        
                    </div>
                </AdaptiveCard>
            </Container>)
}

export default Page
