import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { SiteHeader } from "./components/site-header";
import { SectionCards } from "./components/section-cards";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { DataTable } from "./components/data-table";
//import { useQuery, gql} from "@apollo/client"
import {
  GET_PRODUCTS,
  GET_TRENDS,
  GET_KPIS,
  GET_WAREHOUSES,
} from "./graphql/query";
import { useQuery } from "@apollo/client/react";

const App = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const {
    data: trendsData,
    loading: trendsLoading,
    error: trendsError,
  } = useQuery(GET_TRENDS, {
    variables: { range: "30d" },
  });
  const {
    data: kpiData,
    loading: kpiLoading,
    error: kpiError,
  } = useQuery(GET_KPIS, { variables: { range: "30d" } });

  if (loading || trendsLoading) return <p>Product loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (trendsError) return <p>Error: {trendsError.message}</p>;

  const chartData =
    trendsData?.trends?.map((trend) => ({
      date: trend.date,
      desktop: trend.stock,
      mobile: trend.demand,
    })) || [];

  if (loading || trendsLoading || kpiLoading)
    return <p>Kpi cards loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (kpiError) return <p>Error: {kpiError.message}</p>;

  return (
    <>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards data={kpiData?.kpis?.[0]} />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive data={chartData} />
                </div>
                <DataTable data={data?.products || []} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default App;
