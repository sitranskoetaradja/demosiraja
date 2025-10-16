import { Facilities } from '@/app/(protected-pages)/(inventory)/facility/types';
import { createClient } from '@/utils/supabase/server';

const getDashboard = async () => {
    const supabase = await createClient();
    const { data: buses } = await supabase.from('buses').select('*')
    const { data: haltes } = await supabase.from('bus_stops').select('*')
    const { data: facilities } = await supabase.from('facilities').select('*')

    const countFacilities = (datas: Facilities, status: string) => {
        return datas.filter((data) => data.status === status).length
    }

    const totalBus = buses ? buses.length : 0
    const totalHalte = haltes ? haltes.length : 0
    const totalFacility = facilities ? facilities.length : 0
    const totalFacilityGood = facilities ? countFacilities(facilities, 'BAIK') : 0
    const totalFacilityBroken = facilities ? countFacilities(facilities, 'RUSAK') : 0
    const totalFacilityNotAvailable = facilities ? countFacilities(facilities, 'TIDAK_ADA') : 0

    return {
        totalBus, totalHalte, totalFacility, totalFacilityGood, totalFacilityBroken, totalFacilityNotAvailable
    }
}

export default getDashboard
