import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "./ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface KPIData {
  totalStock: number
  totalDemand: number
  fillRate: number
}

interface SectionCardsProps {
  data?: KPIData
}

export function SectionCards({ data }: SectionCardsProps) {
  const totalStock = data?.totalStock || 0
  const totalDemand = data?.totalDemand || 0
  const fillRate = data?.fillRate || 0

  const stockUtilization = totalDemand > 0 ? (totalDemand / totalStock) * 100 : 0
  const stockTrend = fillRate >= 80 ? "up" : "down"
  const demandTrend = totalDemand > totalStock * 0.7 ? "up" : "down"

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Stock</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalStock.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stockTrend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
              {stockTrend === "up" ? "+" : "-"}
              {Math.abs(fillRate - 75).toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stockTrend === "up" ? "Healthy stock levels" : "Stock attention needed"}
            {stockTrend === "up" ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">Current inventory across all warehouses</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Demand</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalDemand.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {demandTrend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
              {demandTrend === "up" ? "+" : "-"}
              {Math.abs(stockUtilization - 70).toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {demandTrend === "up" ? "High demand period" : "Stable demand"}
            {demandTrend === "up" ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">Current demand across all products</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Fill Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {fillRate.toFixed(1)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {fillRate >= 80 ? <IconTrendingUp /> : <IconTrendingDown />}
              {fillRate >= 80 ? "+" : "-"}
              {Math.abs(fillRate - 85).toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {fillRate >= 80 ? "Excellent fulfillment" : "Fulfillment needs attention"}
            {fillRate >= 80 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">Percentage of demand that can be fulfilled</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Stock Utilization</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stockUtilization.toFixed(1)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stockUtilization >= 60 && stockUtilization <= 80 ? <IconTrendingUp /> : <IconTrendingDown />}
              {stockUtilization >= 70 ? "+" : "-"}
              {Math.abs(stockUtilization - 70).toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stockUtilization >= 60 && stockUtilization <= 80 ? "Optimal utilization" : "Utilization review needed"}
            {stockUtilization >= 60 && stockUtilization <= 80 ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">Demand as percentage of available stock</div>
        </CardFooter>
      </Card>
    </div>
  )
}
