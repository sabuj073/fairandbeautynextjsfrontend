import { API_BASE_URL } from "@/app/config/api";
import Container from "@/app/ui/Container/Container";
import SkinAnalyzerWizard from "@/app/ui/SkinAnalyzer/SkinAnalyzerWizard";

async function getSkinAnalyzerData() {
  try {
    const res = await fetch(`${API_BASE_URL}/skin-analyzer`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export default async function SkinAnalyzerPage() {
  const data = await getSkinAnalyzerData();
  return (
    <section className="min-h-screen bg-[#f5f0f5]">
      <Container>
        <SkinAnalyzerWizard initialData={data} />
      </Container>
    </section>
  );
}
