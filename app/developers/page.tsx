"use client";
import DashboardLayout from "@/shared/components/dashboard/DashboardLayout";
import DashboardHeader from "@/shared/components/dashboard/DashboardHeader";
import DevelopmentDashboard from "@/app/developers/components/DevelopmentDashboard";

export default function DevelopersPage() {
    return (
        <DashboardLayout>
            <DashboardHeader 
                title="Development Dashboard"
                subtitle="Interactive tools and resources for building on Agglayer"
            />
            <DevelopmentDashboard />
        </DashboardLayout>
    )
}
  