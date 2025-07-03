'use client'

import { ResponsiveContainer, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

type Props = {
  earnings : { month : string, earnings : number }[];
}

export default function ChartComponent( { earnings } : Props){

  return (
    <div className="w-[200%] md:w-[150%] lg:w-full h-[300px] md:h-[500px] overflow-x-auto">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={earnings}>
          <XAxis dataKey="month"         
            stroke="white"         
          />
          <YAxis 
            dataKey="earnings"
            stroke="white"
            label={{ value: 'Your Earnings', angle: -90, position: 'insideLeft', fill: 'white' }}
          />
          <Line dataKey="earnings" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }}/>
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: 5 }}
            labelStyle={{ color: 'white' }}
            formatter={(value: number) => [`$${value}`, 'Earnings']}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}