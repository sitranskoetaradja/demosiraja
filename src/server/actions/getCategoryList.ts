import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import { createClient } from '@/utils/supabase/server';
import { Categories } from '@/app/(protected-pages)/(master)/category/types';

const getCategoryList = async (_queryParams: {
	[key: string]: string | string[] | undefined
}) => {
	const queryParams = _queryParams

	const {
		pageIndex = '1',
		pageSize = '10',
		sortKey = '',
		order,
		query,
	} = queryParams

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// const orders = ordersData as any[]
	const supabase = await createClient();
	// const { data, error } = await supabase.from("categories").select('*');
	const { data, error, status } = await supabase
                .from('categories')
                .select('*')
	// console.log('supabase', supabase);
	console.log('data', { data, error, status });
	let datas = structuredClone(data ?? [])
	const total = data ? data.length : 0;

	// if (sortKey) {
	//     if (sortKey === 'paymentMehod') {
	//         data.sort(
	//             sortBy((sortKey || '') as string, order === 'desc', (a) =>
	//                 (a as string).toUpperCase(),
	//             ),
	//         )
	//     } else {
	//         data.sort(
	//             sortBy(sortKey as string, order === 'desc', parseInt as Primer),
	//         )
	//     }
	// }

	// if (query) {
	//     data = wildCardSearch(data, query as string, 'id')
	//     total = data.length
	// }

	datas = paginate(
		datas,
		parseInt(pageSize as string),
		parseInt(pageIndex as string),
	)

	return {
		list: datas,
		total: total,
	}
}

export default getCategoryList
