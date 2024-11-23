'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { Task } from '@/types'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

type Props = {
  tasks: Task[]
}

const chartConfig = {
  created: {
    label: 'Created',
    color: '#2563eb',
  },
  done: {
    label: 'Done',
    color: '#60a5fa',
  },
}

export default function CreatedVsDoneTasksChart({ tasks }: Props) {
  const data = tasks.reduce(
    (acc, task) => {
      const date = new Date(task.created_at).toLocaleDateString()
      const existing = acc.find((item) => item.date === date)

      if (existing) {
        existing.created += 1
        if (task.status === 'done') existing.done += 1
      } else {
        acc.push({
          date,
          created: 1,
          done: task.status === '6f4760c3-d8af-479f-a776-243400013b79' ? 1 : 0,
        })
      }

      return acc
    },
    [] as Array<{ date: string; created: number; done: number }>,
  )

  return (
    <Card className='max-w-md'>
      <CardHeader>
        <CardTitle>Created vs Done Tasks</CardTitle>
        <CardDescription>
          Number of tasks created and done per day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
          <ResponsiveContainer width='100%' height={200}>
            <BarChart data={data}>
              <XAxis dataKey='date' />
              <YAxis />
              <Bar
                dataKey='created'
                fill={chartConfig.created.color}
                radius={4}
              />
              <Bar dataKey='done' fill={chartConfig.done.color} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
