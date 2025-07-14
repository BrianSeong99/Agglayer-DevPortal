import DevPortalHero from "@/app/components/DevPortalHero";
import EcosystemOverview from "@/app/components/EcosystemOverview";
import NavigationGuidance from "@/app/components/NavigationGuidance";
import DashboardLayout from "@/shared/components/dashboard/DashboardLayout";

export default function HomePage() {
    return (
        <DashboardLayout>
            <DevPortalHero />
            <EcosystemOverview />
            <NavigationGuidance />
        </DashboardLayout>
    )
}
