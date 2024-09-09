import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const BarChartCard = ({ budgetList }: any) => {

    return (
        <div className='border rounded-lg p-5'>
            <h2 className='font-bold text-lg mb-3'>Activity</h2>
            <ResponsiveContainer width={'80%'} height={300}>
                <BarChart
                    data={budgetList}
                    margin={{
                        top: 7,
                    }}
                >
                    <XAxis dataKey={"name"} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={"totalSpend"} stackId={"a"} fill='#4845d2' />
                    <Bar dataKey={"amount"} stackId={"a"} fill='#C3C2FF' />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
};


export const BarChartCardSkeleton = () => {
    return (
        <div className='border rounded-lg p-5 items-center justify-center '>
            <h2 className='font-bold text-lg'>Activity</h2>
            <div className='h-[200px] bg-gray-200 animate-pulse items-center justify-center '>

            </div>
        </div>
    )
};