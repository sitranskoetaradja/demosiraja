'use client'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import classNames from '@/utils/classNames'
import Link from 'next/link'
import { TbArmchair2, TbBusStop, TbBus } from 'react-icons/tb'
import { Dashboard } from '../types'
import type { ReactNode } from 'react'

type StatisticCardProps = {
    title: string
    icon: ReactNode
    className: string
    value: number
}

type ProjectOverview = {
    data: Dashboard
}

const StatisticCard = ({
    title,
    className,
    icon,
    value,
}: StatisticCardProps) => {
    return (
        <div
            className={classNames(
                'rounded-2xl p-4 flex flex-col justify-center',
                className,
            )}
        >
            <div className="flex justify-between items-center relative">
                <div>
                    <div className="mb-4 text-gray-900 font-bold">{title}</div>
                    <h1 className="mb-1 text-gray-900">{value}</h1>
                </div>
                <div
                    className={
                        'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 bg-gray-900 text-white rounded-full text-2xl'
                    }
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}

const ProjectOverview = ({ data }: ProjectOverview) => {
    
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Overview</h4>
                {/* <Link href="/concepts/projects/project-list">
                    <Button asElement="div" size="sm">
                        All projects
                    </Button>
                </Link> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="Jumlah Bus"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={data.totalBus}
                    icon={<TbBus />}
                />
                <StatisticCard
                    title="Jumlah Halte"
                    className="bg-purple-100 dark:bg-opacity-75"
                    value={data.totalHalte}
                    icon={<TbBusStop />}
                />
                <StatisticCard
                    title="Jumlah Fasilitas"
                    className="bg-purple-100 dark:bg-opacity-75"
                    value={data.totalFacility}
                    icon={<TbArmchair2 />}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="Fasilitas Baik"
                    className="bg-green-200 dark:bg-opacity-75"
                    value={data.totalFacilityGood}
                    icon={<TbArmchair2 />}
                />
                <StatisticCard
                    title="Fasilitas Rusak"
                    className="bg-red-200 dark:bg-opacity-75"
                    value={data.totalFacilityBroken}
                    icon={<TbArmchair2 />}
                />
                <StatisticCard
                    title="Fasilitas Tidak Ada"
                    className="bg-yellow-200 dark:bg-opacity-75"
                    value={data.totalFacilityNotAvailable}
                    icon={<TbArmchair2 />}
                />
            </div>
        </Card>
    )
}

export default ProjectOverview
