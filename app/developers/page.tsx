// "use client";
import DashboardHeader from "@/shared/components/dashboard/DashboardHeader";
import DashboardLayout from "@/shared/components/dashboard/DashboardLayout";

export default function DevelopersPage() {
    return (
        <DashboardLayout>
            <DashboardHeader 
                title="Developers"
                subtitle="Tools to help you build, launch, and grow your app on Agglayer."
            />
        </DashboardLayout>
    )
  }
  